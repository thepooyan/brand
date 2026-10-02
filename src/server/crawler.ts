"use server"
import axios from "axios"
import trainer_prompt from "../data/bot_trainer_prompt.md?raw"
import { TrainingData, TrainingDataZod } from "~/db/schema"
import { Fetch, fetchFail, fetchSuccess } from "~/lib/actionAbstraction"
import { safe } from "~/lib/utils"
import { parseHTML } from "linkedom";
import { chatSync } from "./llmUtil"
import { clearDelegatedEvents } from "solid-js/web"
import { LanguageOptions, ResponseLengthOptions, ToneOptions } from "./llmConst"

export type crawlTree = {link: string, status: "ok" | "unreachable" | "unchecked"}[]
export const buildLinkTree = async (address: string):Fetch<crawlTree> => {
  debugger
  const brokenUrls = new Set<string>()
  const okUrls = new Set<string>()
  const allUrls = new Set<string>()

  const mainUrl = isUrlValid(address)
  if (!mainUrl) return fetchFail("آدرس معتبر نیست")

  const sendRequest = async (subAddress: string) => {
    if (allUrls.has(subAddress)) return
    allUrls.add(subAddress)
    if (okUrls.size === 20) return
    if (allUrls.size === 60) return

    if (!isUrlValid(subAddress)) {
      brokenUrls.add(subAddress)
      return
    }

    const res = await safe(axios.get<string>(subAddress))
    if (!res.ok) {
      brokenUrls.add(subAddress)
      return
    }
    okUrls.add(subAddress)

    const dom = parseHTML(res.data.data).document

    const links = extractLinks(dom, mainUrl.host, mainUrl.protocol)
    for (const l of links) {
      await sendRequest(l)
    }
  }

  await sendRequest(address)

  return fetchSuccess([
    ...[...allUrls].map(o => ({link: o, status: okUrls.has(o) ? "ok" as const : brokenUrls.has(o) ? "unreachable" as const : "unchecked" as const})),
  ])
}


const textJSon = `
{
  "id": 1,
  "address": "123 Example Street, Baku, Azerbaijan",
  "contactNumber": [
    "+994501234567",
    "+994551234567"
  ],
  "social": [
    {
      "type": "instagram",
      "link": "https://instagram.com/example"
    },
    {
      "type": "telegram",
      "link": "https://t.me/example"
    }
  ],
  "useEmojies": true,
  "tone": "formal",
  "language": "english",
  "maxResponseLength": "short",
  "trainingText": "You are a helpful assistant. Answer clearly and politely, provide accurate information, and keep responses concise."
}
`

export const generateTrainingDataFromPages = async (pages: string[]):Fetch<TrainingData> => {
  let allText = await extractTextFromPages(pages)
  if (allText.ok === false) return allText
  return train_bot_using_text(allText.data)
}

const train_bot_using_text = async (text: string[]):Fetch<TrainingData> => {

  const websiteContentString = text.join("\n")
  console.log(text)
  console.log(text.join("\n"))


  const testWebsite = "hshshs, address: 5th street";
  let resp = await chatSync([
    {content: websiteContentString, role: "user"}
  ], trainer_prompt)

  console.log("resp: ", resp)
  console.log("llm: ", resp.text)
  const cleanText = resp.text.replaceAll("```json", "").replaceAll("```", "");
  console.log("clean llm: ", resp.text)

  let parse1;
  try {
    parse1 = JSON.parse(cleanText)
  } catch {
    return fetchFail("error: llm did not respond with json")
  }

  console.log("parse1:", parse1)

  const makeful = {
    id: 0,
    useEmojies: false,
    tone: ToneOptions.professional.label,
    language: LanguageOptions.persian.label,
    maxResponseLength: ResponseLengthOptions.short.label,
    address: parse1.address,
    contactNumber: [...parse1.contactNumber],
    social: [...parse1.social],
    trainingText: parse1.trainingText
  }
  console.log("makeful", makeful)

  const parse2 = TrainingDataZod.safeParse(makeful)
  if (parse2.error) return fetchFail("error: llm response did not comply with standard")

  console.log("makeful", parse2)

  return fetchSuccess(parse2.data)
}

const extractTextFromPages = async (pages: string[]):Fetch<string[]> => {
  let result:string[] = []
  for (const page of pages) {
    const resp = await extractTextFromPage(page)
    if (resp.ok) {
      resp.data.forEach(item => result.push(item))
    }
  }
  const dedup = removeDuplicateSentences(result)
  return fetchSuccess(dedup)
}

const extractTextFromPage = async (pageAddress: string):Fetch<string[]> => {

  let mainUrl = isUrlValid(pageAddress)
  if (!mainUrl) return fetchFail("آدرس معتبر نیست")

  const res = await safe( axios.get<string>(pageAddress) )
  if (!res.ok) return fetchFail("خطا در خواندن صفحه")

  const dom = parseHTML(res.data.data).document

  const uniqueTexts = extractUniqeTexts(dom)
  const clean = cleanupWebsiteTexts(uniqueTexts)
  
  return fetchSuccess(clean)
}

const cleanupWebsiteTexts = (text:string[]):string[] => {
  return text.map(t => 
    t.replaceAll(/\n|\r/g, "")
    .replaceAll(/ +/g, " ")
    .trim()
  )
}

const extractLinks = (dom: Document, host: string, protocol: string) => {
  const query = dom.querySelectorAll("a")
  const uniquePathname = new Set<string>()
  const uniqueURL = new Set<string>()

  for (const i of query) {
    let href = i.href
    if (href.startsWith("/")) href = `${protocol}${host}${href}`
    try {
      let url =  new URL(href)
      if (url.host === host && !uniquePathname.has(url.pathname)) {
        uniquePathname.add(url.pathname)
        uniqueURL.add(url.toString())
      }
    } catch {}
  }

  return [...uniqueURL]
}


const extractUniqeTexts = (dom: Document) => {
  const result:string[] = []

  //TODO: add a bunch for each social here
  // if these keywords are spotted in href, the link will be included in text extraction
  const listOfSocialKeywords = ["wa.me", "t.me", "linkedin"]

  const loopOverNodes = (childNodes: Node["childNodes"]) => {
    for (const c of childNodes) {
      if (c.nodeName === "SCRIPT") continue
      if (c.nodeName === "CODE") continue
      if (c.nodeName === "PRE") continue
      if (c.nodeName === "A") {
        const href = (c as any).getAttribute?.("href")
        if (typeof href === "string") {
          listOfSocialKeywords.forEach(key => {
            if (href.includes(key)) {
              result.push(href)
              return
            }
          })
        }
      }
      if (c.nodeType === c.TEXT_NODE && c.textContent) {
        result.push(c.textContent)
      }
      loopOverNodes(c.childNodes)
    }
  }
  loopOverNodes(dom.body.childNodes)
  return removeDuplicateSentences(result)
}

const isUrlValid = (url: string) => {
  try {
    return new URL(url)
  } catch {
    return false
  }
}

const removeDuplicateSentences = (sentences: string[]): string[] => {
  const sortedSentences = [...sentences].sort((a, b) => b.length - a.length);
  const result: string[] = [];

  for (const sentence of sortedSentences) {
    let isSubstring = false;
    for (const keptSentence of result) {
      if (keptSentence.includes(sentence)) {
        isSubstring = true;
        break;
      }
    }

    if (!isSubstring) {
      result.push(sentence);
    }
  }

  return result;
}
