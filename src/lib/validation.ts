
export const validateMobileNumber = (num: string): {ok: boolean, msg?: string} => {
  if (num.length !== 11) return {ok: false, msg:  "شماره تلفن باید ۱۱ رقم باشد"}

  return {ok: true}
}

export const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
