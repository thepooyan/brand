"use server"
import prompt from "~/data/llm-prompt.json"
import { db } from "~/db/db"
import yaml from "js-yaml"
import { compareEpochTime, findoutRole, generateOTP, Response, validatePhone, warpResponse } from "./serverUtil"
import {  blogsTable, chatbotTable, I_Blog, I_NewBlog, otpTable, ticketTable, usersTable, websiteOrdersTable } from "~/db/schema"
import { and, eq } from "drizzle-orm"
import { getAuthSession, updateAuthSession } from "~/lib/session"
import { websiteOrder } from "~/lib/interface"
import { telegram } from "./telegram"
import { generateText } from "ai"
import { google } from "@ai-sdk/google"
import { message } from "~/db/constants"
import { safeDb } from "~/lib/utils"
import { newFreePlan } from "~/sections/planServer"
// import { convertNumberToE164, sendOtpSMS } from "./sms"

export const newTicket = async (t: {subject:string, content:string, category:string}):Response => {
  return warpResponse(async ():Promise<Response> => {
    const user = await getAuthSession()
    if (!user) return {ok: false, msg: "لطفا مجددا وارد شوید"}

    await db.insert(ticketTable).values({
      userId: user.id,
      content: [{from: "user", msg: t.content}],
      subject: t.subject,
      category: t.category,
      updatedAt: new Date(),
      state: "pending"
    })

    return {ok: true}
  })
}

export const sendOTP = async (number: string):Response<string> => {
  return warpResponse(async ():Promise<Response<string>> => {
    if (!validatePhone(number)) return {ok: false, msg: "شماره تلفن وارد شده صحیح نمیباشد"}

    let newOtp = generateOTP()

    const value: typeof otpTable.$inferInsert = {
      number: number,
      otp: newOtp
    } 

    let done = await safeDb(
      db.transaction(async (tx) => {
        await tx.delete(otpTable).where(eq(otpTable.number, number)),
        await tx.insert(otpTable).values(value)
      })
    )
    if (done.ok) return {ok: true, data: newOtp}
    return done
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
      let result = (await db.insert(usersTable).values({number}).returning()).at(0)
      if (!result) throw new Error("user insesrt not successful")
      await newFreePlan(result.id)
      const role = await findoutRole(result.number)
      await updateAuthSession({user: {...result, role: role }})
      return {ok: true}
    }
    const role = await findoutRole(user.number)
    await updateAuthSession({user: {...user, role: role }})
    return {ok: true}
  }) 
}

export const saveWebsiteOrder = async (order: websiteOrder) => {
  try {
    let values:typeof websiteOrdersTable.$inferInsert = {
      ...order,
      features: JSON.stringify(order.features)
    }
    await Promise.all([
      await db.insert(websiteOrdersTable).values(values),
      await telegram.admin.send(`سفارش سایت \n\n${yaml.dump(order)}`)
    ])
    return {ok: true}
  } catch(_) {
    return {ok: false}
  }
}

export const replyWithAI = async (message: string, history?: message[]) => {

  let messages:message[] = []
  if (history) {
    messages.push(...history)
  }
  messages.push({role: "system", content: message})

  const result = await generateText({
    model: google('gemini-2.5-flash'),
    system: prompt.telegram,
    messages: messages
  });
  return result.text
}

export const deleteChatbot = async (botId: number) => {
  try {
    const user = await getAuthSession()
    if (!user) return {ok: false, msg: "لطفا ابتدا لاگین کنید"}

    await db.transaction(async tx => {
      await tx.delete(chatbotTable).where(
        and(
          eq(chatbotTable.id, botId),
          eq(chatbotTable.userId, user.id)
        )
      )
    })
    return {ok: true}
  } catch(e) {
    console.log(e)
    return {ok: false, msg: "مشکلی پیش آمد. لطفا مجددا تلاش کنید"}
  }
}

export const newPost = async (post: I_NewBlog) => {
  try {
    await db.insert(blogsTable).values(post)
    return {ok: true}
  } catch(e) {
    console.log(e)
    return {ok: false, error:e}
  }
}

export const deletePost = async (id: number) => {
  try {
    await db.delete(blogsTable).where(eq(blogsTable.id, id))
    return {ok: true}
  } catch(e) {
    return {ok: false, error: e}
  }
}

export const editPost = async (post: I_Blog) => {
  try {
    await db.update(blogsTable).set(post).where(eq(blogsTable.id, post.id))
    return {ok: true}
  } catch(e) {
    console.log(e)
    return {ok: false, error:e}
  }
}
