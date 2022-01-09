import axios from 'axios'
import * as cheerio from 'cheerio'
import { readFileSync } from 'fs'
import { RequestManager } from "paperback-extensions-common"

const MG_DOMAIN = 'https://www.manhuagui.com' 
const mid_addr = 'comic'
const mangaId = '1128'
const chapterId = '605795'
const method = 'GET'
const headers = {
  'Host': 'www.manhuagui.com'
}

const url = MG_DOMAIN + '/' + mid_addr + '/' + mangaId
const urlChpt = MG_DOMAIN + '/' + mid_addr + '/' + mangaId + '/' + chapterId
// const AxiosInst = axios.create()


// let bodyHTML = '';
// (async () => {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
//   await page.goto(urlChpt);
//   const bodyHTML = await page.evaluate(() => document.body.innerHTML);
//   console.log(bodyHTML);
// })()

// (async () => {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
//   await page.goto(urlChpt);
//   const bodyHTML = await page.evaluate(() => document.body.innerHTML);
//   console.log(bodyHTML);
// })

async function get_info(urlstr: string) {
  const puppeteer = require('puppeteer')
  const browser = await puppeteer.launch()

  const page = await browser.newPage()
  const url0 = urlstr + '.html'
  await page.goto(url0, {waitUntil: 'load'})
  const html0 = await page.evaluate(() => document.body.innerHTML)
  let $ = cheerio.load(html0)
  const pagenum = Number($('span#page').parent().text().slice(0, -1).split('/').pop())
  
  let outputHTML = '<html><head><title>all pages</title></head><body>'
  for (let i = 3; i <= pagenum; i++) {
    const urltmp = url0 + '#p=' + String(i)
    const pagetmp = await browser.newPage()
    await pagetmp.goto(urltmp, {waitUntil: 'load'})
    const htmltmp = await pagetmp.evaluate(() => document.body.innerHTML)
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

get_info(urlChpt)
// console.log(res)

// AxiosInst.get(urlChpt).then(
//   response => {
//     const html = response.data
//     console.log(html)
//     const $ = cheerio.load(html)
//     const addr = $('img#mangaFile').text()
//     console.log(addr)
//   }
// ).catch(console.error)


