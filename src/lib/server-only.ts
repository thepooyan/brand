import { isServer } from "solid-js/web";

if (isServer === false) {
  const err = "Attempt to access server only module in client."
  console.error(err)
  throw new Error(err)
}
