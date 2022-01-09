import axios from 'axios'
import * as cheerio from 'cheerio'
import { readFileSync } from 'fs'
import { RequestManager }from "paperback-extensions-common"


const MG_DOMAIN = 'https://www.frscan.cc'
const mid_addr = 'manga'
const mangaId = 'one-piece'
const chapterId = '1036'
const method = 'GET'
const headers = {
  'Host': 'www.frscan.cc'
}

const url = MG_DOMAIN + '/' + mid_addr + '/' + mangaId
const urlChpt = MG_DOMAIN + '/' + mid_addr + '/' + mangaId + '/' + chapterId
const AxiosInst = axios.create()

AxiosInst.get(urlChpt).then(
  response => {
    const html = response.data
    const $ = cheerio.load(html)
    const pages: string[] = []
    const allItems = $('img', '.viewer-cnt #all').toArray()
    console.log($(allItems[0]).attr('data-src'))
    // for(let item of allItems) {
    //   let page = $(item).attr('data-src')?.trim().split("/")[0] == "" ? 'https:' + $(item).attr('data-src')?.trim() : $(item).attr('data-src')?.trim()
    //   if (typeof page === 'undefined')
    //     continue;
    //   pages.push(page);
    // }
  }
).catch(console.error)

function decodeHTMLEntity(str: string) {
  return str.replace(/&#(\d+);/g, function (match, dec) {
      return String.fromCharCode(dec);
  })
}
// const response = await requestManager.schedule(request, 1);
// const $ = cheerio.load(response.data)
// 
// console.log($('img').text())
