import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { createAsync } from "@solidjs/router";
import { FiPlus, FiEdit, FiTrash2, FiCalendar } from "solid-icons/fi";
import { Suspense } from "solid-js";
import { Loading } from "~/components/parts/Loading";
import Input from "~/components/ui/InputNew";
import Textarea from "~/components/ui/Textarea";
import { getAllBlogs } from "~/lib/queries";

export default function WeblogPanel() {
  const posts = createAsync(() => getAllBlogs());

  return (
    <div class="space-y-6">
      {/* Header Section */}
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-3xl font-bold tracking-tight">Weblog Management</h2>
          <p class="text-muted-foreground">Create and manage your blog posts</p>
        </div>
        <Button class="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
          <FiPlus class="h-4 w-4" />
          New Post
        </Button>
      </div>

      {/* Stats Cards */}
      <div class="grid gap-4 md:grid-cols-3">
        <Card class="bg-card">
          <CardHeader class="pb-3">
            <CardDescription>Total Posts</CardDescription>
            <CardTitle class="text-3xl font-bold text-primary">12</CardTitle>
          </CardHeader>
        </Card>
        <Card class="bg-card">
          <CardHeader class="pb-3">
            <CardDescription>Published</CardDescription>
            <CardTitle class="text-3xl font-bold text-primary">8</CardTitle>
          </CardHeader>
        </Card>
        <Card class="bg-card">
          <CardHeader class="pb-3">
            <CardDescription>Drafts</CardDescription>
            <CardTitle class="text-3xl font-bold text-muted-foreground">
              4
            </CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Quick Create Form */}
      <Card class="bg-card">
        <CardHeader>
          <CardTitle>Quick Create</CardTitle>
          <CardDescription>Quickly draft a new blog post</CardDescription>
        </CardHeader>
        <CardContent class="space-y-4">
          <div class="space-y-2">
            <Label for="title">Post Title</Label>
            <Input
              id="title"
              placeholder="Enter post title..."
              class="bg-background"
            />
          </div>
          <div class="space-y-2">
            <Label for="excerpt">Excerpt</Label>
            <Textarea
              id="excerpt"
              placeholder="Write a brief excerpt..."
              rows={3}
              class="bg-background"
            />
          </div>
          <div class="flex gap-2">
            <Button variant="outline" class="flex-1 bg-transparent">
              Save as Draft
            </Button>
            <Button class="flex-1 bg-primary text-primary-foreground hover:bg-primary/90">
              Publish Now
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Posts List */}
      <div class="space-y-4">
        <h3 class="text-xl font-semibold">Recent Posts</h3>
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
                        {post.date}
                      </div>
                    </div>
                    <div class="flex gap-2">
                      <Button size="sm" variant="ghost" class="h-8 w-8 p-0">
                        <FiEdit class="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        class="h-8 w-8 p-0 text-destructive hover:text-destructive"
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
