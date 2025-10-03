import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createAsync } from "@solidjs/router";
import { FiPlus, FiEdit, FiTrash2, FiCalendar, FiEye } from "solid-icons/fi";
import { Suspense } from "solid-js";
import { callModal } from "~/components/layout/Modal";
import { Loading } from "~/components/parts/Loading";
import TA from "~/components/parts/TA";
import { IBlog } from "~/db/schema";
import { getAllBlogs } from "~/lib/queries";
import { limitChar, readableDate } from "~/lib/utils";

export default function WeblogPanel() {
  const posts = createAsync(() => getAllBlogs());

  const deletePost = (post: IBlog) => {
    callModal.prompt(`"${limitChar(post.title, 40)}" حذف شود؟`)
  }

  return (
    <div class="space-y-6">
      {/* Header Section */}
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-3xl font-bold tracking-tight">مدیریت وبلاگ</h2>
          <p class="text-muted-foreground">مدیریت و ایجاد بلاگ ها</p>
        </div>
        <Button class="gap-2 bg-primary text-primary-foreground hover:bg-primary/90" as={TA} href="/Admin/NewBlog">
          پست جدید
          <FiPlus class="h-4 w-4" />
        </Button>
      </div>

      {/* Stats Cards */}
      <div class="grid gap-4 md:grid-cols-3">
        <Card class="bg-card">
          <CardHeader class="pb-3">
            <CardDescription>تعداد پست ها</CardDescription>
            <CardTitle class="text-3xl font-bold text-primary">{posts()?.length}</CardTitle>
          </CardHeader>
        </Card>
        <Card class="bg-card">
          <CardHeader class="pb-3">
            <CardDescription>تاریخ آخرین پست</CardDescription>
            <CardTitle class="text-3xl font-bold text-primary">{readableDate(posts()?.at(-1)?.date || "")}</CardTitle>
          </CardHeader>
        </Card>
        <Card class="bg-card">
          <CardHeader class="pb-3">
            <CardDescription></CardDescription>
            <CardTitle class="text-3xl font-bold text-muted-foreground"></CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Posts List */}
      <div class="space-y-4">
        <h3 class="text-xl font-semibold">آخرین بلاگ ها</h3>
        <div class="space-y-3">
          <Suspense fallback={<Loading />}>
            {posts()?.map((post) => (
              <Card class="bg-card transition-colors hover:bg-accent/50">
                <CardContent class="p-4">
                  <div class="flex items-start justify-between gap-4">
                    <div class="flex-1 space-y-1">
                      <div class="flex items-center gap-2">
                        <h4 class="font-semibold text-card-foreground">
                          {post.title}
                        </h4>
                      </div>
                      <p class="text-sm text-muted-foreground">
                        {post.excerpt}
                      </p>
                      <div class="flex items-center gap-1 text-xs text-muted-foreground">
                        <FiCalendar class="h-3 w-3" />
                        {readableDate(post.date)}
                      </div>
                    </div>
                    <div class="flex gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        as={TA} href={`/Weblog/${encodeURIComponent(post.slug)}`}
                      >
                        <FiEye class="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost" class="h-8 w-8 p-0">
                        <FiEdit class="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        class="h-8 w-8 p-0 text-destructive hover:text-destructive"
                        onclick={() => deletePost(post)}
                      >
                        <FiTrash2 class="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </Suspense>
        </div>
      </div>
    </div>
  );
}
