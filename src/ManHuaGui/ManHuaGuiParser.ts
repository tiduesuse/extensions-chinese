import {
  Chapter, 
  ChapterDetails, 
  HomeSection, 
  LanguageCode, 
  Manga, 
  MangaStatus, 
  MangaTile, 
  SearchRequest, 
  Tag,
  TagSection } from "paperback-extensions-common";

const MG_DOMAIN = 'https://www.manhuagui.com'

export const parseMangaDetails = ($: CheerioStatic, mangaId: string): Manga => {
  const titles = $('div.book-title').contents().map(
    function(this: Text) {
      return $(this).text().trim()
    }
  ).get().filter(x => x !== '')
  const image = "https:" + $('img', 'p.hcover').attr('src') ?? ""
  const panel = $('ul.detail-list')
  let status = MangaStatus.UNKNOWN
  const stext = $('span.red:first', panel).text()
  if (stext == "连载中") {
    status = MangaStatus.ONGOING
  } else if (stext == '已完结') {
    status = MangaStatus.COMPLETED
  }     
  const author = $('a[href*="author"]', panel).text() ?? ""
  const panel1 = $('ul.detail-list li:eq(1)')
  const genres = $('a[href*="list"]', panel1).contents().map(
    function(this: Text) {
      return $(this).text()
    }
  ).get()
  const arrayTags: Tag[] = []

  if (genres.length > 0) {
    for (const item of genres) {
      const label = item.trim()
      const id = label
      arrayTags.push({ id: id, label: label })
    }
  }

  const tagSections: TagSection[] = [createTagSection({
    id: '0',
    label: 'genres',
    tags: arrayTags.length > 0 ? arrayTags.map(x => createTag(x)) : []
  })]

  const desc = $('#intro-cut').text() ?? ""

  // const desc = $('.summary').html() ?? ""
  return createManga({
      id: mangaId,
      titles,
      image,
      rating: Number(''),
      status,
      artist: '',
      author,
      tags: tagSections,
      views: Number(''),
      desc,
      hentai: false
  })
}

export const parseChapters = ($: CheerioStatic, mangaId: string): Chapter[] => {
  const allChapters = $('a.status0')
  const chapters: Chapter[] = []

  for (let chapter of $(allChapters).toArray()) {
    let id: string = MG_DOMAIN + $(chapter).attr('href') ?? ''
    id = id.slice(0, -5)
    const name: string = $(chapter).attr('title') ?? ''
    let chapStr: string = id.split('/').pop() ?? ''
    chapStr = chapStr.split('.')[0] ?? ''
    const chapNum: number = Number(chapStr) / 100
    const time: Date = new Date('12 Apr. 2020')

    chapters.push(createChapter({
      id,
      mangaId,
      name,
      langCode: LanguageCode.CHINEESE,
      chapNum,
      time
    }))
  }

  return chapters
}

export const parseChapterDetails = ($: CheerioStatic, mangaId: string, chapterId: string): ChapterDetails => {
  const pages = $('img#mangaFile').map(
    function(this: Text) {
      return $(this).attr('src')
    }
  ).get()
  return createChapterDetails({
      id: chapterId,
      mangaId: mangaId,
      pages: pages,
      longStrip: false
  })
}

// export const parseChapterDetails = ($: CheerioStatic, mangaId: string, chapterId: string): ChapterDetails => {
//   const pages = $('img#mangaFile').map(
//     function(this: Text) {
//       return $(this).attr('src')
//     }
//   ).get()
//   return createChapterDetails({
//       id: chapterId,
//       mangaId: mangaId,
//       pages: pages,
//       longStrip: false
//   })
// }

export const parseSearch = ($: CheerioStatic): MangaTile[] => {
  const mangaList = $('li.cf')
  const manga: MangaTile[] = []
  for (const item of $(mangaList).toArray()) {
    manga.push(parseMangaItem($, item))
  }

  return manga
}

// parse each mange item
const parseMangaItem = ($: CheerioStatic, item: CheerioElement): MangaTile => {
  let id: string = $('a.bcover', item).attr('href') ?? ""
  id = id.split('/').filter((a) => a != '').pop() ?? ""
  let image: string = $('img', item).attr('src') ?? $('img', item).attr('data-src') ?? ""
  image = "https:" + image
  const title: string = $('a.bcover', item).attr('title') ?? ""
  const subtitle: string = $('a[href*="author"]', item).attr('title') ?? ""

  return createMangaTile({
    id: id,
    image: image,
    title: createIconText({ text: title }),
    subtitleText: createIconText({ text: subtitle }),
  })
}

// parse a section of manga items
const parseSection = ($: CheerioStatic, sec: CheerioElement): MangaTile[] => {
  const res: MangaTile[] = []
  for (const item of $('li', sec).toArray()) {
    const manga = parseMangaItem($, item)
    res.push(manga)
  }
  return res
}

export const parseHomeSections = ($: CheerioStatic, sections: HomeSection[], sectionCallback: (section: HomeSection) => void): void => {
  for (const section of sections) sectionCallback(section)

  const env = 'ul.cover-list'
  for (let i=0; i<4; i++) {
    const sec = $(env)[i]
    sections[i].items = parseSection($, sec)
  }

  for (const section of sections) sectionCallback(section)
}

export const parseTags = ($: CheerioStatic): TagSection[] => {
  const dict: { [key: string]: string[] } = {
    0: ['地区', 'area'],
    1: ['剧情', 'genre'],
    2: ['受众', 'age'],
    3: ['年份', 'year'],
    4: ['字母', 'letter'],
    5: ['进度', 'status']
  }
  // create tag sections
  const tagSections: TagSection[] = [] 
  for (let key in dict) {
    tagSections.push(createTagSection({id: key, label: dict[key][0], tags: []}))
    const main = $('div.filter-nav')
    const cat = $('div.' + dict[key][1], main)
    for (let item of $('li', cat).toArray()) {
      let id: string = $('a', item).attr('href') ?? ""
      id = id.split('/').filter((x) => x != '' && x != 'list').pop() ?? ""
      const label: string = $('a', item).text() ?? ""
      tagSections[Number(key)].tags.push(createTag({id: id, label: label}))
    }
  }
  return tagSections
}


