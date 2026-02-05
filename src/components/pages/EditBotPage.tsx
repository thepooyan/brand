import { I_Bot } from "~/db/schema"
import Input from "../ui/input"
import { Component } from "solid-js"
import Textarea from "../ui/Textarea"

interface p {
  bot: I_Bot
}
const EditBotPage = ({bot}:p) => {

  interface pp {
    key: keyof typeof bot
    name: string
    as?: Component
    className?: string
  }
  const In = ({key, name, className, as}:pp) => {
    let Comp = as ? as : Input
    return <label class={className}>
      {name}
      <Comp placeholder={name} value={bot[key] || undefined}/>
    </label>
  }

  return (
    <>
      EditBotPage {bot.id}
      <div class="grid grid-cols-3 p-10 gap-4">
        <In key="botName" name="نام ربات"/>
        <In key="businessName" name="نام بیزنس"/>
        <In key="language" name="زبان"/>
        <In key="tone" name="لحن"/>
        <In key="websiteUrl" name="آدرس وبسایت شما"/>
        <In key="trainingText" name="متن آموزش ربات" as={Textarea} className="col-span-3"/>
      </div>
    </>
  )
}


export default EditBotPage
