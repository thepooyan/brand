
export type ErrorResponse = { ok: false; msg: string }
export type SuccessResponse<T> = T extends void ? { ok: true } : { ok: true; data: T }
export type EitherResponse<T> = SuccessResponse<T> | ErrorResponse
export type ActionResponse<T = void> = Promise<EitherResponse<T>>

export type ApiErrorResponse = { ok: false; msg: string, status: number }
export type ApiResponse<T = void> = SuccessResponse<T> | ApiErrorResponse


export type ErrorResponse2 = { ok: false; msg: string, data: undefined }
export type SuccessResponse2<T> = T extends void ? { ok: true, data: undefined, msg: undefined } : { ok: true; data: T, msg: undefined }
export type EitherResponse2<T> = SuccessResponse2<T> | ErrorResponse2
export type ActionResponse2<T = void> = Promise<EitherResponse2<T>>
