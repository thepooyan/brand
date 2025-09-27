import { A } from "@solidjs/router"
import { FiCalendar,  FiClock,  FiTag, FiArrowRight } from "solid-icons/fi"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { blogsTable } from "@/db/schema"
import { Button } from "@/components/ui/button"
import { orPlaceholder } from "~/lib/utils"

interface BlogCardProps {
  post: typeof blogsTable.$inferSelect
  index: number
}

const BlogCard = (props: BlogCardProps) => {
  return (
    <A href={(props.post.slug)}>
      <Card
        class="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer pt-0 ltr"
        style={{ "animation-delay": `${props.index * 100}ms` }}
      >
        <div class="relative overflow-hidden rounded-t-lg">
          <img
            src={orPlaceholder(props.post.image)}
            alt={props.post.title}
            class="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        <CardHeader>
          <div class="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <FiCalendar class="w-4 h-4" />
            {new Date(props.post.date).toLocaleDateString()}
            <Separator orientation="vertical" class="h-4" />
            <FiClock class="w-4 h-4" />
            {props.post.readTime} min read
          </div>
          <CardTitle class="group-hover:text-primary transition-colors line-clamp-2">
            {props.post.title}
          </CardTitle>
          <CardDescription class="line-clamp-3 h-10">
            {props.post.excerpt}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div class="flex flex-wrap gap-2 mb-4">
            {props.post.tags?.slice(0, 3).map(tag => (
              <Badge variant="outline" class="text-xs">
                <FiTag class="w-3 h-3 mr-1" />
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>

        <CardFooter class="mt-auto flex justify-between">
          <Button
            variant="ghost"
            size="sm"
            class="group-hover:text-primary ml-auto"
          >
            <span>
              Read More
              <FiArrowRight class="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Button>
        </CardFooter>
      </Card>
    </A>
  )
}

export default BlogCard
