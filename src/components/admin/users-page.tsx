import { Accessor, For } from "solid-js"
import { PartialUser } from "~/routes/Admin/users"
import UserCard from "./user-card"

interface p {
  users: Accessor<PartialUser[]>
}
const UsersPage = ({users}:p) => {
  return (
    <div>
      <For each={users()}>
        {u => <UserCard user={u}/>}
      </For>
    </div>
  )
}

export default UsersPage
