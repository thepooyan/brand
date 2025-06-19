export const validatePhone = (phone: string) => {
  if (phone.length !== 11) return false
  return true
}

export function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString()
}
