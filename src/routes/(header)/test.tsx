import { createSignal } from "solid-js"

const test = () => {
  const [sig, sett] = createSignal("kk")
  return <>
    <input placeholder="hi" value={sig()} onchange={() => console.log("change")}/>
  </>
}

export default test
