import axios from 'axios'
import * as cheerio from 'cheerio'
import { readFileSync } from 'fs'
import { RequestManager }from "paperback-extensions-common"

const MG_DOMAIN = 'https://v2.mangapark.net'
const mid_addr = 'manga'
const mangaId = 'himekishi-ga-classmate-ekz'
const chapterId = 'i2708350/c042'
const method = 'GET'
const headers = {
  'Host': 'v2.mangapark.net'
}

const url = MG_DOMAIN + '/' + mid_addr + '/' + mangaId
const urlChpt = MG_DOMAIN + '/' + mid_addr + '/' + mangaId + '/' + chapterId
console.log(urlChpt)
const AxiosInst = axios.create()

AxiosInst.get(urlChpt).then(
  response => {
    const html = response.data
    // const $ = cheerio.load(html)
    // console.log(html)
    // const script = JSON.parse(/var _load_pages = (.*);/.exec(html)?.[1] ?? '')
    // const pages: string[] = []
    // for (const page of script)
    //     pages.push(page.u)
  
    // console.log(pages[0])
  } 
).catch(console.error)
