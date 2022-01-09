import axios from 'axios'
import * as cheerio from 'cheerio'
import { readFileSync } from 'fs'
import { RequestManager }from "paperback-extensions-common"

const MG_DOMAIN = 'https://www.manhuagui.com' 
const mid_addr = 'comic'
const mangaId = '1128'
const chapterId = '605795'
const method = 'GET'
const headers = {
  'Host': 'www.manhuagui.com'
}

const url = MG_DOMAIN + '/' + mid_addr + '/' + mangaId
const urlChpt = MG_DOMAIN + '/' + mid_addr + '/' + mangaId + '/' + chapterId + '.html#1'
// const AxiosInst = axios.create()

const puppeteer = require('puppeteer');

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

async function myf(urlstr: string) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(urlstr);
  const bodyHTML = await page.evaluate(() => document.body.innerHTML);
  return bodyHTML;
}

myf(urlChpt).then((res) => {console.log(urlChpt)});
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


