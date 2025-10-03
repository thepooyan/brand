import { FiUser } from "solid-icons/fi"

const Admin = () => {
  return (
    <div class="flex justify-center items-center flex-col h-full gap-4">
      <FiUser class="w-20 h-20 bg-primary rounded-full p-4  "/>
      <h2 class="text-3xl font-bold">
        به پنل ادمین خوش آمدید!
      </h2>
      <p class="text-md  text-zinc-400">
        جهت ادامه یکی از بخش ها را انتخاب کنید</p>
    </div>
  )
}

export default Admin
