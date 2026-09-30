import Code from "~/components/ui/code"
import { name, socialLinks } from "../../../../config/config"

const examplejs = () => {
  return (
    <>
      <h2>ارسال ریکوئست به سرور {name} در javascript</h2>
      <Code code={`const data = [
  {
    role: "user", 
    content: "سلام! چه خدماتی ارائه میدید؟",
  },
]

const response = await fetch("${socialLinks.website}/api/chat", {
  headers: {
    "Content-Type": "application/json",
    "authorization": "Bearer $token" 
  },
  body: JSON.stringify(data)
})`}/>
    </>
  )
}

export default examplejs
