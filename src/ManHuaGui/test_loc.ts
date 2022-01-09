import axios from 'axios'
import * as cheerio from 'cheerio'
import { readFileSync } from 'fs'
import { RequestManager }from "paperback-extensions-common"

// const html = readFileSync('./manga.html', 'utf-8')
const html = readFileSync('./chapter.html', 'utf-8')
const $ = cheerio.load(html)
console.log(addr)

// const MG_DOMAIN = 'https://www.manhuagui.com'
// const allChapters = $('a.status0')

// for (let chapter of $(allChapters).toArray()) {
//   const id: string = MG_DOMAIN + $(chapter).attr('href') ?? ''
//   const name: string = $(chapter).attr('title') ?? ''
//   let chapstr: string = id.split('/').pop() ?? ''
//   chapstr = chapstr.split('.')[0] ?? ''
//   const chapNum: number = Number( id.split('/').pop() )
//   const time: Date = new Date('')
//   console.log(id)
//   console.log(name)
//   console.log(chapstr)
//   console.log(time)
//   break
// } 
// const chpt0 = $('a.status0')[0]
// const res = $(chpt0).text() ?? ""
// console.log(res)

