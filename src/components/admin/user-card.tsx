import { PartialUser } from "~/routes/Admin/users"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { FiArrowDownCircle, FiArrowUpCircle, FiTrash } from "solid-icons/fi"
import { FaSolidBan } from "solid-icons/fa"
import { Show } from "solid-js"
import { Badge } from "../ui/badge"

interface p {
  user: PartialUser
}

const UserCard = ({user}:p) => {

  const isAdmin = user.admin !== null

  return (
    <Card>
      <CardHeader class="relative">
        <CardTitle>{user.number}</CardTitle>
        <CardDescription>{user.name}</CardDescription>
        <Show when={isAdmin}>
          <Badge class="absolute left-5" variant="success">
            admin
          </Badge>
        </Show>
      </CardHeader>

      <CardContent>
        پلن:
        {JSON.stringify(user.current_plans)}
      </CardContent>
      <CardFooter class="gap-2 justify-end">
        <Button variant="destructive">
          حذف
          <FiTrash/>
        </Button>
        <Button variant="secondary">
          بلاک
          <FaSolidBan/>
        </Button>
        <Show when={!isAdmin}>
          <Button>
            ارتقا به ادمین
            <FiArrowUpCircle/>
          </Button>
        </Show>
        <Show when={isAdmin}>
          <Button>
            تنزل به کاربر معمولی
            <FiArrowDownCircle/>
          </Button>
        </Show>
      </CardFooter>
    </Card>
  )
}

export default UserCard
