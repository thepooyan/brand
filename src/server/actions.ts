"use server"
import { db } from "~/db/db"
import { generateOTP, Response, validatePhone, warpResponse } from "./util"
import { otpTable } from "~/db/schema"
import { eq } from "drizzle-orm"


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

    await db.delete(otpTable).where(eq(otpTable.number, number))

    return {ok: true}
  }) 
}
