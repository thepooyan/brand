import { PartialUser } from "~/routes/Admin/users"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { FiArrowUpCircle, FiTrash } from "solid-icons/fi"
import { FaSolidBan } from "solid-icons/fa"
import { Show } from "solid-js"
import { Badge } from "../ui/badge"

interface p {
  user: PartialUser
}

const UserCard = ({user}:p) => {
  return (
    <Card>
      <CardHeader class="relative">
        <CardTitle>{user.number}</CardTitle>
        <CardDescription>{user.name}</CardDescription>
        <Show when={user.admin !== null}>
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
        <Button>
          ارتقا به ادمین
          <FiArrowUpCircle/>
        </Button>
      </CardFooter>
    </Card>
  )
}

export default UserCard
