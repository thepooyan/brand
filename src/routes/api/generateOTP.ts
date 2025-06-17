import type { APIEvent } from "@solidjs/start/server";

export async function POST(event: APIEvent) {
  let data: {phoneNumber: string} = await event.request.json()

  console.log(`otp for ${data.phoneNumber}...`)

  return "ok"
}
