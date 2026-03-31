import Code from "~/components/ui/code"

const examplejs = () => {
  return (
    <>
      <Code code={`const data = [
  {
    role: "user", 
    content: "سلام! چه خدماتی ارائه میدید؟",
  },
]

const response = await fetch("https://hooshbaan.com/api/chat", {
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
