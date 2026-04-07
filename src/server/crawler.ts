import axios from "axios"
import { Fetch, fetchFail, fetchSuccess, Transaction, transactionFail, transactionSuccess } from "~/lib/actionAbstraction"
import { safe } from "~/lib/utils"

export type crawlTree = {link: string, status: "ok" | "unreachable" | "unchecked"}[]
export const buildLinkTree = async (address: string):Fetch<crawlTree> => {
  const brokenUrls = new Set<string>()
  const okUrls = new Set<string>()
  const allUrls = new Set<string>()
  const parser = new DOMParser()

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

    const dom = parser.parseFromString(res.data.data, "text/html")

    const links = extractLinks(dom, mainUrl.host)
    for (const l of links) {
      await sendRequest(l)
    }
  }

  await sendRequest(address)

  return fetchSuccess([
    ...[...allUrls].map(o => ({link: o, status: okUrls.has(o) ? "ok" as const : brokenUrls.has(o) ? "unreachable" as const : "unchecked" as const})),
  ])
}

export const crawl = async (address: string):Transaction => {
  const parser = new DOMParser()
  const checkedUrls = new Set<string>()
  const brokenUrls = new Set<string>()
  const registerUrls = new Set<string>()
  const pageTexts = new Map<string, string[]>()

  let mainUrl = isUrlValid(address)
  if (!mainUrl) return transactionFail("آدرس معتبر نیست")

  const addToPageTexts = (key: string, value: string) => {
    let alredy = pageTexts.get(key)
    pageTexts.set(key, [...alredy || [], value])
  }

  const sendRequest = async (subAddress: string) => {

    if (registerUrls.has(subAddress)) return
    registerUrls.add(subAddress)
    if (checkedUrls.size === 20) return
    if (!isUrlValid(subAddress)) {
      brokenUrls.add(subAddress)
      return
    }

    const res = await safe( axios.get<string>(subAddress) )
    if (!res.ok) {
      brokenUrls.add(subAddress)
      return
    } 
    checkedUrls.add(subAddress)

    const dom = parser.parseFromString(res.data.data, "text/html")

    const uniqueTexts = extractUniqeTexts(dom)
    for (const u of uniqueTexts) {
      addToPageTexts(subAddress, u)
    }

    const links = extractLinks(dom, mainUrl.host)
    for (const l of links) {
      await sendRequest(l)
    }

    return transactionSuccess()
  }

  // debugger
  await sendRequest(address)
  const allText = removeDuplicateSentences([...pageTexts.values()].flat())
  console.log("ckecked", checkedUrls)
  console.log("broken", brokenUrls)
  console.log(pageTexts)
  console.log(allText)
  return transactionSuccess()
}

const extractLinks = (dom: Document, host: string) => {
  const query = dom.querySelectorAll("a")
  const uniquePathname = new Set<string>()
  const uniqueURL = new Set<string>()

  for (const i of query) {
    let href = i.href
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

  const la = (childNodes: Node["childNodes"]) => {
    for (const c of childNodes) {
      if (c.nodeName === "SCRIPT") continue
      if (c.nodeName === "CODE") continue
      if (c.nodeName === "PRE") continue
      if (c.nodeType === c.TEXT_NODE && c.textContent) {
        result.push(c.textContent)
      }
      la(c.childNodes)
    }
  }
  la(dom.body.childNodes)
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
