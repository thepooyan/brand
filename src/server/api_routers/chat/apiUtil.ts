export const getIp = (request: Request) => {
  return request.headers.get('x-forwarded-for') ??
  request.headers.get('x-real-ip') ??
  request.headers.get('cf-connecting-ip') ?? 
  ""
}
