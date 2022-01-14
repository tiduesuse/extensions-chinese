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

import { parseMangaDetails, parseChapters, parseChapterDetails, parseSearch, parseHomeSections, parseTags, tagDict } from "./BaoziMangaParser"

// const MG_DOMAIN = 'https://www.webmota.com'
const MG_DOMAIN = 'https://www.baozimh.com'
const MG_NAME = 'BaoziManga'
const method = 'GET'
const mid_addr = 'comic'
const headers = {
  'Host': 'www.baozimh.com'
}
const headers1 = {
  'Host': 'www.webmota.com'
}

export const BaoziMangaInfo: SourceInfo = {
	version: '0.5.0',
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

export class BaoziManga extends Source {
  requestManager: RequestManager = createRequestManager({
    requestsPerSecond: 3 
  });

  // manga shared url
  getMangaShareUrl(mangaId: string): string {
    return `${MG_DOMAIN}/${mid_addr}/${mangaId}`
  }

  // manga details
	async getMangaDetails(mangaId: string): Promise<Manga> {
    console.log(`${MG_DOMAIN}/${mid_addr}/${mangaId}`)
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
      url: `${chapterId}`,
      method,
      headers: headers1
    })
    const response = await this.requestManager.schedule(request, 1);
    const $ = this.cheerio.load(response.data);
    return parseChapterDetails($, mangaId, chapterId);
	}

  async getSearchResults(query: SearchRequest, metadata: any): Promise<PagedResults> {
    const search = query.title?.replace(/ /g, '+').replace(/[’'´]/g, '%27') ?? ""
    let manga: MangaTile[] = []

    if (query.includedTags && query.includedTags?.length != 0) {
      const label = query.includedTags[0].label
      const id = query.includedTags[0].id
      const cond = tagDict[label][1]
      const request = createRequestObject({
          url: `${MG_DOMAIN}/classify?${cond}=${id}`,
          method,
          headers
      })
      const response = await this.requestManager.schedule(request, 1)
      const $ = this.cheerio.load(response.data)
      manga = parseSearch($)
    } else {
      const request = createRequestObject({
          url: `${MG_DOMAIN}/search?q=${search}`,
          method,
          headers
      })
      const response = await this.requestManager.schedule(request, 1)
      const $ = this.cheerio.load(response.data)
      manga = parseSearch($)
    }

    return createPagedResults({
        results: manga,
        metadata: undefined
    })    
  }

	async getHomePageSections(sectionCallback: (section: HomeSection) => void): Promise<void> {
		const section1 = createHomeSection({ id: 'popular', title: '熱門漫畫'})
		const section2 = createHomeSection({ id: 'recommended', title: '推薦漫畫'})
		const section3 = createHomeSection({ id: 'korean', title: '韓漫漫畫'})
		const section4 = createHomeSection({ id: 'kanji', title: '大女主漫畫'})
		const section5 = createHomeSection({ id: 'shonen', title: '少年漫畫'})
		const section6 = createHomeSection({ id: 'love', title: '戀愛漫畫'})
		const section7 = createHomeSection({ id: 'xuanhuan', title: '玄幻漫畫'})
		const section8 = createHomeSection({ id: 'new', title: '最新上架'})
		const section9 = createHomeSection({ id: 'latest_updated', title: '最近更新'})
		const sections = [
      section1, 
      section2, 
      section3, 
      section4,
      section5, 
      section6, 
      section7, 
      section8,
      section9
    ]
		const request = createRequestObject({url: `${MG_DOMAIN}`, method})
		const response = await this.requestManager.schedule(request, 1)
		const $ = this.cheerio.load(response.data)
		parseHomeSections($, sections, sectionCallback)
	}

  async getSearchTags(): Promise<TagSection[]> {
    const request = createRequestObject({
      url: `${MG_DOMAIN}/classify`,
      method,
      headers
    })

    const response = await this.requestManager.schedule(request, 1)
    const $ = this.cheerio.load(response.data)
    
    return parseTags($)
  }

}
