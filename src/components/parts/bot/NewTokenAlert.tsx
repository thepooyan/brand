import Copyable from "~/components/ui/copyable"

interface p {
  token: string
}
const NewTokenAlert = ({token}:p) => {
  return (
    <div>
      توکن جدید با موفقیت ایجاد شد. برای کپی کردن آن، روی کلیک کنید. توجه داشته باشید که پس از این، امکان مشاهده مجدد این توکن وجود نخواهد داشت.
      <Copyable toCopy="token">
        <div class="bg-zinc-900 p-1 overflow-hidden w-100 rounded mt-2 mx-auto cursor-pointer">
          {token}
        </div>
      </Copyable>
    </div>
  )
}

export default NewTokenAlert
