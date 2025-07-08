import Spinner from "../parts/Spinner"

const FallbackPage = () => {
  return (
    <div class="h-dvh flex flex-col justify-center items-center gap-4">
      لطفا صبر کنید
      <Spinner reverse/>
    </div>
  )
}

export default FallbackPage
