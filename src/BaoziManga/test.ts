import axios from 'axios'
import * as cheerio from 'cheerio'

const MG_DOMAIN1 = 'https://www.webmota.com'
const MG_DOMAIN = 'https://www.baozimh.com'
const mid_addr = 'comic'
const mangaId = 'hanghaiwang-weitianrongyilang'
const chapterId = 'https://www.webmota.com/comic/chapter/hanghaiwang-weitianrongyilang/0_0.html'
// const chapterId = '605795'
// const qtitle = 'one piece'
// const qtitle = '海贼王'

const url = MG_DOMAIN + '/' + mid_addr + '/' + mangaId
const urltag = MG_DOMAIN + '/classify'
// const urlChpt = MG_DOMAIN + '/' + mid_addr + '/' + mangaId + '/' + chapterId
// const search = qtitle?.replace(/ /g, '%20') + '.html' ?? ""
// console.log(search)
// const url_query = MG_DOMAIN + '/s/' + search 

// const dict = {
//   0: ['地区', 'area'],
//   1: ['剧情', 'genre'],
//   2: ['受众', 'age'],
//   3: ['年份', 'year'],
//   4: ['字母', 'letter'],
//   5: ['进度', 'status']
// }

// for (let key in dict){
//   console.log(key)
// }

const title = ' \t  '
const search = title?.replace(/ /g, '+').replace(/[’'´]/g, '%27') ?? ""
const request = `${MG_DOMAIN1}/search?q=${search}`
const AxiosInst = axios.create()
const homepageSectionId = '玄幻漫畫'
//const homepageSectionId = '韓漫漫畫'
AxiosInst.get(MG_DOMAIN).then(
  response => {
    const html = response.data
    const $ = cheerio.load(html)
    // const env = $('.pure-g')
    const env = $('.index-recommend-items:contains(' + homepageSectionId + ')')
    const sec = $(env)
    // console.log(sec.text())
    for (const item of $('.comics-card', env).toArray()){
      let id: string = $('.comics-card__poster', item).attr('href') ?? ""
      id = id.split('/').pop() ?? ""
      const image = $('amp-img', item).attr('src')
      const title = $('.comics-card__title', item).text()
      console.log(id)
      console.log(image)
      console.log(title)
    }
  }
).catch(console.error)

    // console.log(request)
    // const parseMangaItem = ($: CheerioStatic, item: CheerioElement): string[] => {
    // let id: string = $('a.bcover', item).attr('href') ?? ""
    // id = id.split('/').filter((a) => a != '').pop() ?? ""
    // let image: string = $('img', item).attr('src') ?? $('img', item).attr('data-src') ?? ""
    // image = "https:" + image
    // const title: string = $('a.bcover', item).attr('title') ?? ""
    // const subtitle: string = $('a[href*="author"]', item).attr('title') ?? ""

    // const res = []
    // res.push(id)
    // res.push(image)
    // res.push(title)
    // res.push(subtitle)

    // return res
// }

// async function mgDetails(urlstr: string) {
//   const puppeteer = require('puppeteer')
//   const browser = await puppeteer.launch()
// 
//   const page = await browser.newPage()
//   const url0 = urlstr + '.html'
//   await page.goto(url0, {waitUntil: 'load'})
//   const html0 = await page.evaluate(() => document.body.innerHTML)
//   let $ = cheerio.load(html0)
//   const pagenum = Number($('span#page').parent().text().slice(0, -1).split('/').pop())
//   
//   let outputHTML = '<html><head><title>all pages</title></head><body>'
//   for (let i = 1; i <= pagenum; i++) {
//     const urltmp = url0 + '#p=' + String(i)
//     // const pagetmp = await browser.newPage()
//     await page.goto(tmpurl, {waitUntil: 'load'})
//     await page.goto(urltmp, {waitUntil: 'load'})
//     const htmltmp = await page.evaluate(() => document.body.innerHTML)
//     $ = cheerio.load(htmltmp)
//     outputHTML += $('img#mangaFile').parent().html()
//     // console.log(outputHTML)
//   }
//   outputHTML += '</body></html>'
//   const $res = cheerio.load(outputHTML)
//   const pages = $res('img#mangaFile').map(
//     function(this: Text) {
//       return $(this).attr('src')
//     }
//   ).get()
//   console.log(pages)
// }

// mgDetails(urlChpt)


