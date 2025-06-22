let count = 0;
export const GET = async () => {
  count++

  await new Promise(res => setTimeout(res, 2000))
  return `folna-${count}`
}
