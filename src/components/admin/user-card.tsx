import { Card } from "../ui/card"
import { Button } from "../ui/button"
import { Muted } from "../prose/prose-item"
import TA from "../parts/TA"
import { User_Plan_Bots } from "~/db/schema"

interface p {
  user: User_Plan_Bots
}

const UserCard = ({user}:p) => {
  return (
    <Card class="grid grid-cols-[1fr_1fr_2fr_1fr_1fr_1fr] p-4 gap-1">
      <p>
        <Muted>شماره:</Muted>
        {user.number}
      </p>
      <p>
        <Muted>نام:</Muted>
        {user.name || "ندارد"}
      </p>
      <p>
        <Muted>ایمیل:</Muted>
        {user.email || "ندارد"}
      </p>
      <p>
        <Muted>تعداد پلن:</Muted>
        {user.current_plans.length}
      </p>
      <p>
        <Muted>تعداد ربات:</Muted>
        {user.bots.length}
      </p>
      <Button
        as={TA}
        href={`/admin/users/${user.id}`}
      >
        جزئیات
      </Button>
    </Card>
  )
}

export default UserCard
