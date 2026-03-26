const getBearerHeader = (token: string) => ({ "authorization": `Bearer ${token}` })

interface props {
  method: string,
  url: string
  data?: object
  returnResponse?: boolean
  getToken?: () => string
  baseUrl?: string
}
type result<T> = {
  data: T | null,
  status: number,
  ok: boolean,
  response: Response
}
const fetcher = async <T>({url, method, data, ...others}:props):Promise<result<T>> => {

  let options:RequestInit = {method}

  let headers:Record<string,string> = {}

  const token = others.getToken ? others.getToken() : null
  if (token) headers = {...getBearerHeader(token)}

  if (data) {
    options["body"] = JSON.stringify(data)
    headers["Content-Type"] = "application/json"
  }
  options["headers"] = headers

  const apiUrl = others.baseUrl ? new URL(url, others.baseUrl) : url
  const res = await fetch(apiUrl, options)
  if (others.returnResponse) {
    return {
      response: res,
      ok: true,
      status: res.status,
      data: null
    }
  }
  if (res.status !== 200) return {
    data: null,
    status: res.status,
    ok: false,
    response: res
  }
  const resData = await res.json() as T
  return {
    data: resData,
    status: 200,
    response: res,
    ok: true
  }
}

interface settings {
  getToken?: () => string
  baseUrl?: string
}
export const getApi = ({baseUrl, getToken}:settings) => ({
  get: <T>(url: string) => fetcher<T>({method: "GET", url, baseUrl, getToken}),
  post: <T>(url: string, data:object) => fetcher<T>({method: "POST", url, data, baseUrl, getToken}),
  stream: <T>(url: string, data: object) => fetcher<T>({url, data, method: "POST", returnResponse: true, baseUrl, getToken})
})

export type Api = ReturnType<typeof getApi>
