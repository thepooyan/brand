
type ErrorResponse = { ok: false; msg: string, status: number }
type SuccessResponse<T> = T extends void ? { ok: true } : { ok: true; data: T }
export type ActionResponse<T = void> = Promise<SuccessResponse<T> | ErrorResponse>
