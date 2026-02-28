import { isServer } from "solid-js/web";

if (isServer === true) {
  const err = "Attempt to access client only module in server."
  console.error(err)
  throw new Error(err)
}
