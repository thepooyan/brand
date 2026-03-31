
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

type TransactionRedirect = { ok: false, msg: undefined, redirect: string }
type TransactionErrorResponse = { ok: false; msg: string, redirect: undefined }
type TransactionSuccessResponse = { ok: true, msg: undefined, redirect: undefined }
type TransactionResponse = TransactionErrorResponse | TransactionSuccessResponse | TransactionRedirect
export type Transaction = Promise<TransactionResponse>

export const transactionSuccess = ():TransactionSuccessResponse => ({ok: true, msg: undefined, redirect: undefined})
export const transactionFail = (msg: string):TransactionErrorResponse => ({ok: false, msg: msg, redirect: undefined})
export const transactionRedirect = (to: string):TransactionRedirect => ({ok: false, msg: undefined, redirect: to})
