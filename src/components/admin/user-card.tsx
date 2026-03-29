import { Card } from "../ui/card"
import { Button } from "../ui/button"
import { Muted } from "../prose/prose-item"
import TA from "../parts/TA"
import { User_Plan_Bots } from "~/db/schema"
import { AiFillLock } from "solid-icons/ai"

interface p {
  user: User_Plan_Bots
}

const UserCard = ({user}:p) => {
  return (
    <Card class="grid grid-cols-[.2fr_1fr_2fr_1fr_1fr_1fr] p-4 gap-1 items-center">
      <p>
        {user.isBlocked === "1" && <AiFillLock class="text-destructive"/> }
      </p>
      <p>
        <Muted>شماره:</Muted>
        {user.number}
      </p>
      <p>
        <Muted>نام:</Muted>
        {user.name || "ندارد"}
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
