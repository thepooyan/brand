import { revalidate, useNavigate } from "@solidjs/router";
import { callModal } from "~/components/layout/Modal";
import { useBounce } from "./hooks/useBounce";
import { Setter } from "solid-js";

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

type successCallback = (tr: TransactionSuccessResponse) => void
type failCallback = (tr: TransactionErrorResponse) => void

export const useTransaction = () => {

  const nv = useNavigate()
  const bnv = useBounce()

  const callTransaction = (() => {
    let _outcome: TransactionResponse | null = null;

    const api = {
      success: (cb:successCallback) => {
        if (_outcome?.ok) {
          cb(_outcome);
        }
        return api;
      },
      fail: (cb: failCallback) => {
        if (_outcome?.ok === false && _outcome.msg) {
          cb(_outcome);
        }
        return api;
      }
    };

    interface options {
      successMessage?: string,
      revalidate?: string,
      navigate?: string,
      loadingSignal?: Setter<boolean>
    }
    const apply = async (tr: Transaction, options?:options) => {
      try {
        options?.loadingSignal && options.loadingSignal(true)
        let res = await tr
        options?.loadingSignal && options.loadingSignal(false)
        if (res.redirect) {
          if (res.redirect.bouncy) bnv(res.redirect.to)
          else nv(res.redirect.to)
        } else if (res.ok) {
          callModal.success(options?.successMessage)
          options?.revalidate && revalidate(options.revalidate)
          options?.navigate && nv(options.navigate)
        } else {
          callModal.fail(res.msg)
        }
        _outcome = res
      } catch(e) {
        callModal.fail()
        _outcome = transactionFail(e instanceof Error ? e.message : String(e))
      }
      return api
    }

    return apply;
  })()

  return {callTransaction}
}
