import { Accessor, For } from "solid-js"
import UserCard from "./user-card"
import { User_Plan_Bots } from "~/db/schema"

interface p {
  users: Accessor<User_Plan_Bots[]>
}
const UsersPage = ({users}:p) => {
  return (
    <div class="space-y-2 p-2">
      <For each={users()}>
        {u => <UserCard user={u}/>}
      </For>
    </div>
  )
}

export default UsersPage
