type ErrorResponse = { ok: false; msg: string }
type SuccessResponse<T> = T extends void ? { ok: true } : { ok: true; data: T }
export type Response<T = void> = Promise<SuccessResponse<T> | ErrorResponse>

export const validatePhone = (phone: string) => {
  if (phone.length !== 11) return false
  return true
}

export function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

export const warpResponse = async <T>(fn: ()=>Promise<Response<T>>):Response<T> => {
  try {
    let a = await fn()
    return a
  } catch(e) {
    console.log(e)
    return {ok:false, msg: "مشکلی پیش آمده، لطفا مجددا تلاش کنید"}
  }
}
