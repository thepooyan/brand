import { useNavigate } from "@solidjs/router";
import { callModal } from "~/components/layout/Modal";
import { useBounce } from "./hooks/useBounce";

type func = () => void
class CallbackStore {
  private yes: func | null = null
  private no: func | null = null
  setYes(callback: ()=>void) {
    this.yes = callback
  }
  setNo(callback: ()=>void) {
    this.no = callback
  }
  callYes() {
    this.yes && this.yes()
    this.clear()
  }
  callNo() {
    this.no && this.no()
    this.clear()
  }
  private clear() {
    this.yes = null
    this.no = null
  }
}
const callbackStore = new CallbackStore()

export type ErrorResponse = { ok: false; msg: string }
export type SuccessResponse<T> = T extends void ? { ok: true } : { ok: true; data: T }
export type EitherResponse<T> = SuccessResponse<T> | ErrorResponse
export type ActionResponse<T = void> = Promise<EitherResponse<T>>

export type ApiErrorResponse = { ok: false; msg: string, status: number }
export type ApiResponse<T = void> = SuccessResponse<T> | ApiErrorResponse

type FetchErrorResponse = { ok: false; msg: string, data: undefined }
type FetchSuccessResponse<T> =  { ok: true; data: T, msg: undefined }
type FetchResponse<T> = FetchSuccessResponse<T> | FetchErrorResponse
export type Fetch<T> = Promise<FetchResponse<T>>

export const fetchSuccess = <T>(data: T):FetchSuccessResponse<T> => ({ok: true, data: data, msg: undefined})
export const fetchFail = (msg: string):FetchErrorResponse => ({ok: false, data: undefined, msg: msg})

const transactionBase = {msg: undefined, data: undefined, redirect: undefined}

type TransactionRedirect = { ok: false, msg: undefined, redirect: {to: string, bouncy?: boolean}, data: undefined }
type TransactionErrorResponse = { ok: false; msg: string, redirect: undefined }
type TransactionSuccessResponse = { ok: true, msg: undefined, redirect: undefined }
type TransactionResponse = TransactionErrorResponse | TransactionSuccessResponse | TransactionRedirect
export type Transaction = Promise<TransactionResponse>

export const transactionSuccess = ():TransactionSuccessResponse => ({...transactionBase, ok: true})
export const transactionFail = (msg: string):TransactionErrorResponse => ({...transactionBase, ok: false, msg: msg})
export const transactionRedirect = (to: string, bouncy?: boolean):TransactionRedirect => ({...transactionBase, ok: false, redirect: {to, bouncy}})

export const useTransaction = () => {

  const nv = useNavigate()
  const bnv = useBounce()

  const callTransaction = async (tr: Transaction, options?:{successMessage?: string}):Transaction => {
    try {
      let res = await tr
      if (res.redirect) {
        if (res.redirect.bouncy) bnv(res.redirect.to)
        else nv(res.redirect.to)
        return res
      }
      if (res.ok) {
        callModal.success(options?.successMessage)
      }
      else {
        callModal.fail(res.msg)
      }
      return (res)
    } catch(e) {
      console.log(e)
      callModal.fail()
      return transactionFail(e instanceof Error ? e.message : String(e))
    }
  }
  return {callTransaction}
}
