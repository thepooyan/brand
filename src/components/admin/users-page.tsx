import { Accessor, For } from "solid-js"
import UserCard from "./user-card"
import { User_Plan_Bots } from "~/db/schema"
import { FiFilter } from "solid-icons/fi"
import { Button } from "../ui/button"
import Checkbox from "../ui/checkbox"
import Input from "../ui/input"
import { FaSolidMagnifyingGlass } from "solid-icons/fa"
import UserSearchSelect from "./user-search-select"
import { Muted } from "../prose/prose-item"

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
        <Muted class="ml-2">
          <FiFilter/>
          فیلتر ها:
        </Muted>
        <Button variant="outline" size="sm">
          فقط ادمین
        </Button>
        <Button variant="outline" size="sm">
          بلاک شده
        </Button>
      </div>
      <For each={users()}>
        {u => <UserCard user={u}/>}
      </For>
    </div>
  )
}

export default UsersPage
