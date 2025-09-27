"use server"
import prompt from "~/data/llm-prompt.json"
import { db } from "~/db/db"
import yaml from "js-yaml"
import { compareEpochTime, generateOTP, Response, validatePhone, warpResponse } from "./util"
import { blogsTable, chatbot, chatbot_status, INewBlog, otpTable, usersTable, websiteOrders } from "~/db/schema"
import { and, eq } from "drizzle-orm"
import { getAuthSession, updateAuthSession } from "~/lib/session"
import { websiteOrder } from "~/lib/interface"
import { telegram } from "./telegram"
import { generateText } from "ai"
import { google } from "@ai-sdk/google"
import { s3 } from "~/s3"
import { PutObjectCommand } from "@aws-sdk/client-s3"

export const sendOTP = async (number: string):Response<string> => {
  return warpResponse(async ():Promise<Response<string>> => {
    if (!validatePhone(number)) return {ok: false, msg: "شماره تلفن وارد شده صحیح نمیباشد"}

    let newOtp = generateOTP()
    console.log(newOtp)
    //send otp to phone number

    const value: typeof otpTable.$inferInsert = {
      number: number,
      otp: newOtp
    } 

    await db.delete(otpTable).where(eq(otpTable.number, number))
    await db.insert(otpTable).values(value)
    
    //REMOVE THIS
    return {ok: true, data: newOtp}
  })
}

export const verifyOTP = async (number: string, otp: string):Response => {
  return warpResponse(async ():Promise<Response> => {
    let selection = await db.select().from(otpTable).where(eq(otpTable.number, number))

    if (selection.length === 0) return {ok: false, msg: "کدی برای شماره مورد نظر یافت نشد"}

    if (selection[0].otp !== otp) return {ok: false, msg: "کد ارسالی اشتباه میباشد"}

    // code was sent correctly, either expired or ok to log in 
    db.delete(otpTable).where(eq(otpTable.number, number))

    if (!compareEpochTime(selection[0].timestamp.getTime())) return {ok: false, msg: "کد ارسالی منقضی میباشد"}

    let user = (await db.select().from(usersTable).where(eq(usersTable.number, number))).at(0)

    if (!user) {
      const newUser: typeof usersTable.$inferInsert = {
        number: number
      }
      let result = (await db.insert(usersTable).values(newUser).returning()).at(0)
      if (!result) throw new Error()
      await updateAuthSession({user: result})
      return {ok: true}
    }
    await updateAuthSession({user: user})
    return {ok: true}
  }) 
}

export const saveWebsiteOrder = async (order: websiteOrder) => {
  try {
    let values:typeof websiteOrders.$inferInsert = {
      ...order,
      features: JSON.stringify(order.features)
    }
    await db.insert(websiteOrders).values(values)
    await telegram.admin.send(`سفارش سایت \n\n${yaml.dump(order)}`)
    return {ok: true}
  } catch(_) {
    return {ok: false}
  }
}

export const replyWithAI = async (message: string) => {
  const result = await generateText({
    model: google('gemini-2.5-flash'),
    system: prompt.telegram,
    prompt: message
  });
  return result.text
}

export const deleteChatbot = async (botId: number) => {
  try {
    const user = await getAuthSession()
    if (!user) return {ok: false, msg: "لطفا ابتدا لاگین کنید"}

    await db.transaction(async tx => {
      await tx.delete(chatbot_status).where(
        eq(chatbot_status.id, botId),
      )
      await tx.delete(chatbot).where(
        and(
          eq(chatbot.id, botId),
          eq(chatbot.userId, user.id)
        )
      )
    })
    return {ok: true}
  } catch(e) {
    console.log(e)
    return {ok: false, msg: "مشکلی پیش آمد. لطفا مجددا تلاش کنید"}
  }
}

export const newPost = async (post: INewBlog) => {
  try {
    await db.insert(blogsTable).values(post)
    return {ok: true}
  } catch(e) {
    console.log(e)
    return {ok: false, error:e}
  }
}

export async function uploadToS3(file: File) {
  const arrayBuffer = await file.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)

  const key = `Hooshban/${Date.now()}-${file.name}`

  await s3.send(new PutObjectCommand({
    Bucket: process.env.BUCKET_NAME!,
    Key: key,
    Body: buffer,
    ContentType: file.type,
  }))

  return `https://${process.env.BUCKET_URL}/${key}`
}
