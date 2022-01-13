import { 
	Source, 
	Manga, 
	Chapter, 
	ChapterDetails, 
	HomeSection, 
	SearchRequest, 
	TagSection, 
	PagedResults, 
	SourceInfo, 
  ContentRating,
  RequestManager,
	TagType,
  MangaTile} 
from "paperback-extensions-common"

import { parseMangaDetails, parseChapters, parseChapterDetails, parseSearch, parseHomeSections, parseTags } from "./ManHuaGuiParser"

const MG_DOMAIN = 'https://www.manhuagui.com'
const MG_NAME = 'ManHuaGui'
const method = 'GET'
const mid_addr = 'comic'
const headers = {
  'Host': 'www.manhuagui.com'
}

export const ManHuaGuiInfo: SourceInfo = {
	version: '1.0.2',
	name: MG_NAME,
	icon: 'icon.png',
	author: 'Tiduesuse',
	authorWebsite: 'https://github.com/Tiduesuse',
	description: 'Extension that pulls manga from ' + MG_NAME + ' (Chinese)',
  contentRating: ContentRating.MATURE,
  websiteBaseURL: MG_DOMAIN,
	sourceTags: [
    {
      text: "Chinese",
      type: TagType.GREY
    },
		{
			text: "Notifications",
			type: TagType.GREEN
		}
	]
}

export class ManHuaGui extends Source {
  requestManager: RequestManager = createRequestManager({
    requestsPerSecond: 3 
  });

  // manga shared url
  getMangaShareUrl(mangaId: string): string {
    return `${MG_DOMAIN}/${mid_addr}/${mangaId}`
  }

  // manga details
	async getMangaDetails(mangaId: string): Promise<Manga> {
    const request = createRequestObject({
      url: `${MG_DOMAIN}/${mid_addr}/${mangaId}`,
      method,
      headers
    })

		const response = await this.requestManager.schedule(request, 1);
		const $ = this.cheerio.load(response.data);
		return parseMangaDetails($, mangaId);
	}

	async getChapters(mangaId: string): Promise<Chapter[]> {
		const request = createRequestObject({
			url: `${MG_DOMAIN}/${mid_addr}/${mangaId}`,
			method,
      headers
		})

		const response = await this.requestManager.schedule(request, 1)
		const $ = this.cheerio.load(response.data)
		return parseChapters($, mangaId)
	}

	async getChapterDetails(mangaId: string, chapterId: string): Promise<ChapterDetails> {
    const tmpurl = 'https://www.bing.com'
    const puppeteer = require('puppeteer')
    const browser = await puppeteer.launch()
    const url0 = chapterId
    const page = await browser.newPage()
    await page.goto(url0, {waitUntil: 'load'})
    const html0 = await page.evaluate(() => document.body.innerHTML)
    let $ = this.cheerio.load(html0)
    // console.log(pagenum)
    const pagenum = Number($('span#page').parent().text().slice(0, -1).split('/').pop())
    let outputHTML = '<html><head><title>all pages</title></head><body>'
    for (let i = 1; i <= pagenum; i++) {
      const urltmp = url0 + '#p=' + String(i)
      await page.goto(tmpurl, {waitUntil: 'load'})
      await page.goto(urltmp, {waitUntil: 'load'})
      const htmltmp = await page.evaluate(() => document.body.innerHTML)
      $ = this.cheerio.load(htmltmp)
      outputHTML += $('img#mangaFile').parent().html()
      // console.log(outputHTML)
    }
    outputHTML += '</body></html>'
    const $res = this.cheerio.load(outputHTML)
		return parseChapterDetails($res, mangaId, chapterId)
	}

  async getSearchResults(query: SearchRequest, metadata: any): Promise<PagedResults> {
        const search = query.title?.replace(/ /g, '%20') + '.html' ?? ""
        let manga: MangaTile[] = []

        const request = createRequestObject({
            url: `${MG_DOMAIN}/s/${search}`,
            method,
            headers
        })
    
        const response = await this.requestManager.schedule(request, 1)
        const $ = this.cheerio.load(response.data)
        
        manga = parseSearch($)

        return createPagedResults({
            results: manga,
            metadata: undefined
        })    
    }

	async getHomePageSections(sectionCallback: (section: HomeSection) => void): Promise<void> {
		const section1 = createHomeSection({ id: 'latest_updated', title: '最新更新'})
		const section2 = createHomeSection({ id: 'on_going', title: '连载漫画'})
		const section3 = createHomeSection({ id: 'fishied', title: '完结漫画'})
		const section4 = createHomeSection({ id: 'new', title: '新番漫画'})
		const sections = [section1, section2, section3, section4]

		const request = createRequestObject({url: `${MG_DOMAIN}`, method})
		const response = await this.requestManager.schedule(request, 1)
		const $ = this.cheerio.load(response.data)
		parseHomeSections($, sections, sectionCallback)
	}

  async getSearchTags(): Promise<TagSection[]> {
    const request = createRequestObject({
      url: `${MG_DOMAIN}/list`,
      method,
      headers
    })

    const response = await this.requestManager.schedule(request, 1)
    const $ = this.cheerio.load(response.data)
    
    return parseTags($)
  }

}
