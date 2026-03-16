import axios from "axios"
import { ActionResponse } from "~/lib/actionAbstraction"
import { safe } from "~/lib/utils"


export const crawl = async (address: string):ActionResponse<string> => {
  "use server"

  if (!isUrlValid(address)) return {ok: false, msg: "آدرس داده شده معتبر نمیباشد"}

  const res = await safe( axios.get(address) )
  if (!res.ok) return {ok: false, msg: "آدرس مورد نظر یافت نشد. لطفا درستی آن را بررسی کنید."}

  res.data

  return {ok: true, data: ""}
}

const isUrlValid = (url: string) => {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}
