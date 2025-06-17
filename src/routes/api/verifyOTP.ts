import type { APIEvent } from "@solidjs/start/server";

export async function POST(event: APIEvent) {
  let data: {phoneNumber: string, otp: string} = await event.request.json()
  
  return "ok"
}
