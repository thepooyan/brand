import Spinner from "./Spinner"

const BotCard = () => {
  return (
    <div>BotCard</div>
  )
}

export default BotCard

export const BotCardFallback = () => {
  return <div
    class=" h-97 w-97 rounded-md bg-gray-900 animate-pulse flex justify-center"
  >
    <Spinner reverse/>

  </div>
}
