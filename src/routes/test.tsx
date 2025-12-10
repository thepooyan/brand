import axios from "axios"

const test = () => {

  const send = () => {
    const body = {
      messages: [
        {
          role: "user",
          content: "hi"
        }
      ]
    }
    axios.post("/api/chat/session", body)
  }

  return (
    <div>
      <button onclick={send}>hi</button>
    </div>
  )
}

export default test
