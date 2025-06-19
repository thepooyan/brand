"use server"
import { db } from "~/db/db"
import { generateOTP, validatePhone } from "./util"
import { otpTable } from "~/db/schema"
import { eq } from "drizzle-orm"

type response = Promise<{ok: boolean, msg?: string}>

export const sendOTP = async (number: string):response => {
  if (!validatePhone(number)) return {ok: false, msg: "شماره تلفن وارد شده صحیح نمیباشد"}

  const value: typeof otpTable.$inferInsert = {
    number: number,
    otp: generateOTP()
  } 

  try {
    await db.delete(otpTable).where(eq(otpTable.number, number))
    await db.insert(otpTable).values(value)
  } catch(err) {
    console.log(err)
    return {ok: false, msg: "مشکلی پیش آمده، لطفا دوباره تلاش کنید"}
  }
  
  return {ok: true}
}

export const verifyOTP = async (number: string, otp: string):response => {
  try {

    let selection = await db.select().from(otpTable).where(eq(otpTable.number, number))

    if (selection.length === 0) return {ok: false, msg: "کدی برای شماره مورد نظر یافت نشد"}

    if (selection[0].otp !== otp) return {ok: false, msg: "کد ارسالی اشتباه میباشد"}

    await db.delete(otpTable).where(eq(otpTable.number, number))

    return {ok: true}
  } catch(err) {
    console.log(err)
    return {ok: false, msg: "something went wrong"}
  }
}
