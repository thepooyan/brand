import { Accessor, For } from "solid-js"
import UserCard from "./user-card"
import { User_Plan_Bots_Admin } from "~/db/schema"
import { FiFilter } from "solid-icons/fi"
import { Button } from "../ui/button"
import Input from "../ui/input"
import { FaSolidMagnifyingGlass } from "solid-icons/fa"
import UserSearchSelect from "./user-search-select"
import { Muted } from "../prose/prose-item"
import { filterOptions, useFilter } from "~/lib/hooks/useFilter"

interface p {
  users: Accessor<User_Plan_Bots_Admin[]>
}
const UsersPage = ({users}:p) => {

  let fo: filterOptions<User_Plan_Bots_Admin> = {
    "فقط ادمین": (e:User_Plan_Bots_Admin) => e.admin !== null,
    "بلاک‌شده": (e:User_Plan_Bots_Admin) => e.isBlocked === "1",
  }
  const {filtered, setFilter, allFilters, activeFilter} = useFilter(users, fo)

  return (
    <div class="space-y-4 p-5">
      <div class="flex gap-2">
        <Input placeholder="جستجو..."/>
        <UserSearchSelect/>
        <Button>
          <FaSolidMagnifyingGlass/>
        </Button>
      </div>
      <div class="flex justify-between items-center">
        <div class="flex items-center gap-1">
          <Muted class="ml-2">
            <FiFilter/>
            فیلتر ها:
          </Muted>
          <For each={Object.keys(allFilters)}>
            {f => <Button variant={activeFilter() === f ? "secondary" : "outline"} size="sm" onclick={() => setFilter(f)}>
              {f || "همه"}
          </Button>}
          </For>
        </div>
        <div>
          <Muted>تعداد کاربران: {filtered().length.toLocaleString("fa-IR")}</Muted>
        </div>
      </div>
      <div class="space-y-1.5">
        <For each={filtered()}>
          {u => <UserCard user={u}/>}
        </For>
      </div>
    </div>
  )
}

export default UsersPage
