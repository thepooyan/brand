import { Accessor, For } from "solid-js"
import UserCard from "./user-card"
import { User_Plan_Bots } from "~/db/schema"
import { FiFilter } from "solid-icons/fi"
import { Button } from "../ui/button"
import Checkbox from "../ui/checkbox"
import Input from "../ui/input"
import { FaSolidMagnifyingGlass } from "solid-icons/fa"
import UserSearchSelect from "./user-search-select"

interface p {
  users: Accessor<User_Plan_Bots[]>
}
const UsersPage = ({users}:p) => {
  return (
    <div class="space-y-2 p-2">
      <div class="flex gap-2">
        <Input placeholder="جستجو..."/>
        <UserSearchSelect/>
        <Button>
          <FaSolidMagnifyingGlass/>
        </Button>
      </div>
      <div class="flex items-center gap-1">
        <Button variant="secondary">
          <FiFilter/>
          فیلتر ها
        </Button>
        <Button variant="secondary">
          نام
        </Button>
        <Button variant="secondary">
          شماره
        </Button>
        <Button variant="secondary">
          فقط ادمین
          <Checkbox/>
        </Button>
        <Button variant="secondary">
          بلاک شده
          <Checkbox/>
        </Button>
      </div>
      <For each={users()}>
        {u => <UserCard user={u}/>}
      </For>
    </div>
  )
}

export default UsersPage
