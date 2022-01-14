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

import { 
  parseMangaDetails, 
  parseChapters, 
  parseChapterDetails, 
  parseSearch, 
  parseHomeSections, 
  parseTags, 
  parseMultiTags,
  parseViewMore
} from "./BaoziMangaParser"

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
	version: '0.5.1',
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
    if (!metadata) {
      const ori = query.title?.trim() ?? ""
      const search = ori.replace(/ /g, '+').replace(/[’'´]/g, '%27') ?? ""
      let addr = ''
      if (search.length > 0) {
        addr = `${MG_DOMAIN}/search?q=${search}`
      } else if (query.includedTags && query.includedTags?.length != 0) {
        const tagStr = parseMultiTags(query.includedTags)
        addr = `${MG_DOMAIN}/classify?${tagStr}`
      } else {
        addr = `${MG_DOMAIN}/classify`
      }
      const addr1 = encodeURI(addr)
      const request = createRequestObject({
          url: addr1,
          method,
          headers
      })
      const response = await this.requestManager.schedule(request, 1)
      const $ = this.cheerio.load(response.data)
      metadata = {
        manga: parseSearch($),
        offset: 0
      }
    }
    return createPagedResults({
        results: metadata.manga.slice(metadata.offset, metadata.offset + 100),
        metadata: {
          manga: metadata.manga,
          offset: metadata.offset + 100
        }
    })    
  }

	async getHomePageSections(sectionCallback: (section: HomeSection) => void): Promise<void> {
		const section1 = createHomeSection({ id: '熱門漫畫', title: '熱門漫畫'})
		const section2 = createHomeSection({ id: '推薦漫畫', title: '推薦漫畫'})
		const section3 = createHomeSection({ id: '韓漫漫畫', title: '韓漫漫畫'})
		const section4 = createHomeSection({ id: '大女主漫畫', title: '大女主漫畫'})
		const section5 = createHomeSection({ id: '少年漫畫', title: '少年漫畫'})
		const section6 = createHomeSection({ id: '戀愛漫畫', title: '戀愛漫畫'})
		const section7 = createHomeSection({ id: '玄幻漫畫', title: '玄幻漫畫'})
		const section8 = createHomeSection({ id: '最新上架', title: '最新上架'})
		const section9 = createHomeSection({ id: '最近更新', title: '最近更新'})
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

  async getViewMoreItems(homepageSectionId: string, metadata: any): Promise<PagedResults> {
    if (!metadata) {
      const request = createRequestObject({
        url: `${MG_DOMAIN}`,
        method,
        headers
      })
      const response = await this.requestManager.schedule(request, 1)
      const $ = this.cheerio.load(response.data)
      metadata = {
        manga: parseViewMore($, homepageSectionId),
        offset: 0
      }
    }

    return createPagedResults({
      results: metadata.manga.slice(metadata.offset, metadata.offset + 100),
      metadata: {
        manga: metadata.manga,
        offset: metadata.offset + 100
      }
    })
  }
}
