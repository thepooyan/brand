import { PartialUser } from "~/routes/Admin/users"

interface p {
  user: PartialUser
}

const UserCard = ({user}:p) => {
  return (
    <div>
      {JSON.stringify(user)}
      hla
    </div>
  )
}

export default UserCard
