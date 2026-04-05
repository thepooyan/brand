import axios from "axios"
import { Transaction, transactionFail, transactionSuccess } from "~/lib/actionAbstraction"
import { safe } from "~/lib/utils"


export const crawl = async (address: string):Transaction => {
  const parser = new DOMParser()
  const checkedUrls = new Set<string>()
  const brokenUrls = new Set<string>()
  const registerUrls = new Set<string>()
  const allUniqueText = new Set<string>()

  let mainUrl = isUrlValid(address)
  if (!mainUrl) return transactionFail("آدرس معتبر نیست")

  const sendRequest = async (subAddress: string) => {

    if (registerUrls.has(subAddress)) return
    registerUrls.add(subAddress)
    if (checkedUrls.size === 50) return
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
    uniqueTexts.forEach(u => allUniqueText.add(u))

    const links = extractLinks(dom, mainUrl.host)
    links.forEach(l => sendRequest(l))

    return transactionSuccess()
  }

  // debugger
  await sendRequest(address)
  console.log("ckecked", checkedUrls)
  console.log("broken", brokenUrls)
  console.log(
    [...allUniqueText].filter(u => {
      if (u.split(" ").length > 2) return u
    })
  )
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
  const query = dom.querySelectorAll("body *:not(script)") as unknown as HTMLDivElement[]
  const pureText = [...query].map(i => i.innerText).filter(f => f !== undefined && f !== "")
  const unique = new Set(pureText)
  return [...unique]
}

const isUrlValid = (url: string) => {
  try {
    return new URL(url)
  } catch {
    return false
  }
}
