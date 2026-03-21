export const resolveError = (error: unknown):string => {
  if (error instanceof Error) {
    if (error.cause instanceof Error) {
      const msg = error.cause.message
      const split = msg.replaceAll(":", "").split(" ")
      const err = split.at(0)
      const tableRow = split.at(-1)?.split(".").at(-1)

      switch (err) {
        case "SQLITE_CONSTRAINT_UNIQUE":
          return `${getTableRowName(tableRow!)} از قبل وجود دارد`
        case "fetch":
          return `ارتباط سرور با دیتابیس برقرار نشد. لطفا مجددا تلاش کنید.`
        default:
          return `Unhandled sqlite error code: ${err}`
      }
    }
  }

  return "متاسفانه خطایی ناشناخته رخ داده است. لطفا مجددا تلاش کنید. در صورت تکرار با پشتیبانی تماس بگیرید."
}

const getTableRowName = (tableRow: string) => {
  if (tableRowNames[tableRow]) {
    return tableRowNames[tableRow]
  }
  return tableRow
}

const tableRowNames:Record<string, string> = {
  email: "ایمیل",
  number: "شماره همراه",
}
