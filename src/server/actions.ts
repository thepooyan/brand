"use server"
import { db } from "~/db/db"
import yaml from "js-yaml"
import { compareEpochTime, generateOTP, Response, validatePhone, warpResponse } from "./util"
import { otpTable, usersTable, websiteOrders } from "~/db/schema"
import { eq } from "drizzle-orm"
import { updateAuthSession } from "~/lib/session"
import { websiteOrder } from "~/components/pages/OrderWebsite"
import { telegram } from "./telegram"


export const sendOTP = async (number: string):Response => {
  return warpResponse(async ():Promise<Response> => {
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
    
    return {ok: true}
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
    await telegram.sendToAdmin(`سفارش سایت \n\n${yaml.dump(order)}`)
    return {ok: true}
  } catch(_) {
    return {ok: false}
  }
}
