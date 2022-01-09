import { 
	Source, 
	Manga, 
	Chapter, 
	ChapterDetails, 
	HomeSection, 
	SearchRequest, 
	TagSection, 
	MangaUpdates, 
	PagedResults, 
	SourceInfo, 
  ContentRating,
  RequestManager,
	TagType,
  MangaTile} 
from "paperback-extensions-common"

import { generateSearch, parseChapterDetails, parseChapters, parseHomeSections, parseMangaDetails, parseSearch, parseTags, parseUpdatedManga, parseViewMore } from "./ManHuaGuiParser"

const MG_DOMAIN = 'https://www.manhuagui.com'
const MG_NAME = 'ManHuaGui'
const method = 'GET'
const mid_addr = 'comic'
const headers = {
  'Host': 'www.manhuagui.com'
}

export const MMangaInfo: SourceInfo = {
	version: '1.0.0',
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

export class MManga extends Source {
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
		const request = createRequestObject({
			url: `${MG_DOMAIN}/${mid_addr}/${mangaId}/${chapterId}`,
			method,
      headers
		})
    // need to use puppeteer to grab all the pages and their html, then combine them into 
    // a big html data

		const response = await this.requestManager.schedule(request, 1)
    const $ = this.cheerio.load(response.data)
		return parseChapterDetails($, mangaId, chapterId)
	}

  ////// Need to work on
  async getSearchResults(query: SearchRequest, metadata: any): Promise<PagedResults> {
        const search = query.title?.replace(/ /g, '+').replace(/[’'´]/g, '%27') ?? ""
        let manga: MangaTile[] = []

        const request = createRequestObject({
            url: `${FURYOSQUAD_DOMAIN}/search`,
            method: 'POST',
            headers,
            data: `search=${search}`
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
		const sections = [section1, section2, section3]

		const request = createRequestObject({url: `${MP_DOMAIN}`, method})
		const response = await this.requestManager.schedule(request, 1)
		const $ = this.cheerio.load(response.data)
		parseHomeSections($, sections, sectionCallback)
	}

  ///////// need to change
	async filterUpdatedManga(mangaUpdatesFoundCallback: (updates: MangaUpdates) => void, time: Date, ids: string[]): Promise<void>{
    const request = createRequestObject({
            url: `${MG_DOMAIN}`,
            method,
            headers
        })

        const response = await this.requestManager.schedule(request, 1)
        const $ = this.cheerio.load(response.data)

        const updatedManga: string[] = []
        for (const manga of $('table tr').toArray()) {
            let id = $('.fs-comic-title a', manga).attr('href')
            let mangaDate = parseDate($('.fs-table-chap-date .fs-chap-date', manga).text().trim() ?? '')

            if (!id) continue
            if (mangaDate > time) {
                if (ids.includes(id)) {
                    updatedManga.push(id)
                }
            }
        }

        mangaUpdatesFoundCallback(createMangaUpdates({ids: updatedManga}))
    }
}
