import { TbMoodSadDizzy } from 'solid-icons/tb'
import { Button } from '../ui/button'
import TA from '../parts/TA'
import { createSignal } from 'solid-js'
import Spinner from '../parts/Spinner'

interface p {
  error: any
}
const ErrorPage = ({error}:p) => {
  console.log(error)

  const [refreshing, setRefreshing] = createSignal(false);

  const tryAgain = () => {
    setRefreshing(true)
    window.location.reload()
  }

  return (
    <div class="flex justify-center items-center h-dvh flex-col gap-5">
      <div class='flex gap-2 items-center'>
        <TbMoodSadDizzy size={70} class='text-destructive'/>

        <h1 class="text-2xl font-bold">
          مشکلی پیش آمده!
        </h1>
      </div>
      <div class='text-muted-foreground'>
        <p>متاسفان ایراد غیر منتظره ای پیش آمده است!</p>
        <p>لطفا مجددا تلاش کنید یا با پشتیبانی تماس بگیرید</p>
      </div>
      <div class='space-x-2'>
        <Button onclick={tryAgain} disabled={refreshing()}>
          تلاش مجدد
          {refreshing() && <Spinner/>}
        </Button>
        <Button variant="secondary"
          as={TA} href="/"
        >خانه</Button>
      </div>
      
    </div>
  )
}

export default ErrorPage
