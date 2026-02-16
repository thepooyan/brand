import axios from "axios"
import { getEnv } from "./env"
import { isServer } from "solid-js/web";
if (!isServer) throw new Error("This module is server only");

const baseUrl = "https://edge.ippanel.com/v1"

const smsBase = axios.create({
  baseURL:baseUrl,
  headers: {
    Authorization: getEnv().SMS_PANEL
  }
})

export const sendOtpSMS = async (otp: string | number, recipient: string) => {
  "use server"
  const data = {
    "sending_type": "pattern",
    "from_number": "+983000505",
    "code": "faw7303jridd1pc",
    "recipients": [
      recipient
      // "+989120000000"
    ],
    "params": {
      "OTP": otp
    },
  }
  return smsBase.post("api/send", data)
}

export const convertNumberToE164 = (n: string) => {
  return "+98" + n.substring(1)
}
