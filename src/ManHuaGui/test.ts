import axios from 'axios'
import * as cheerio from 'cheerio'

const MG_DOMAIN = 'https://www.manhuagui.com' 
const mid_addr = 'comic'
const mangaId = '1128'
const chapterId = '605795'
const method = 'GET'
const headers = {
  'Host': 'www.manhuagui.com'
}
const tmpurl = 'https://www.bing.com'
const qtitle = 'one piece'
// const qtitle = '海贼王'

const url = MG_DOMAIN + '/' + mid_addr + '/' + mangaId
const urlChpt = MG_DOMAIN + '/' + mid_addr + '/' + mangaId + '/' + chapterId
const search = qtitle?.replace(/ /g, '%20') + '.html' ?? ""
// console.log(search)
const url_query = MG_DOMAIN + '/s/' + search 

const AxiosInst = axios.create()
AxiosInst.get(url_query).then(
  response => {
    const html = response.data
    // console.log(html)
    const $ = cheerio.load(html)
    const mangaList = $('li.cf')
    for (const item of $(mangaList).toArray()) {
      let id: string = $('a.bcover', item).attr('href') ?? ""
      id = id.split('/').filter((a) => a != '').pop() ?? ""
      let image: string = $('img', item).attr('src') ?? ""
      image = "https:" + image
      const title = $('a.bcover', item).attr('title')
      const subtitle = $('a[href*="author"]', item).attr('title')
      console.log(id)
      console.log(image)
      console.log(title)
      console.log(subtitle)
    }
  }
).catch(console.error)


async function mgDetails(urlstr: string) {
  const puppeteer = require('puppeteer')
  const browser = await puppeteer.launch()

  const page = await browser.newPage()
  const url0 = urlstr + '.html'
  await page.goto(url0, {waitUntil: 'load'})
  const html0 = await page.evaluate(() => document.body.innerHTML)
  let $ = cheerio.load(html0)
  const pagenum = Number($('span#page').parent().text().slice(0, -1).split('/').pop())
  
  let outputHTML = '<html><head><title>all pages</title></head><body>'
  for (let i = 1; i <= pagenum; i++) {
    const urltmp = url0 + '#p=' + String(i)
    // const pagetmp = await browser.newPage()
    await page.goto(tmpurl, {waitUntil: 'load'})
    await page.goto(urltmp, {waitUntil: 'load'})
    const htmltmp = await page.evaluate(() => document.body.innerHTML)
    $ = cheerio.load(htmltmp)
    outputHTML += $('img#mangaFile').parent().html()
    // console.log(outputHTML)
  }
  outputHTML += '</body></html>'
  const $res = cheerio.load(outputHTML)
  const pages = $res('img#mangaFile').map(
    function(this: Text) {
      return $(this).attr('src')
    }
  ).get()
  console.log(pages)
}

// mgDetails(urlChpt)


