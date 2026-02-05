import {  FiCalendar, FiClock } from "solid-icons/fi"
import {marked} from "marked"
import { I_Blog } from "~/db/schema"
import { createAsync } from "@solidjs/router"
import { createBlogFullUrl, readableDate } from "~/lib/utils"
import { Link, Meta, Title } from "@solidjs/meta"
import BlogSchema from "../jsonSchema/BlogSchema"

interface BlogPostProps {
  blog: I_Blog
}

export function BlogPage({ blog }: BlogPostProps) {

  let content = createAsync(() => marked(blog.content, {async: true}))

  return (
    <article class="mx-auto max-w-3xl px-4 py-12 md:py-20">
      <Title>{blog.title}</Title>
      <Link rel="canonical" href={createBlogFullUrl(blog.slug)}/>
      <Meta name="description" content={blog.excerpt}/>
      <Meta property="og:title" content={blog.title}/>
      <Meta property="og:description" content={blog.excerpt}/>
      <Meta property="og:image" content={blog.image}/>
      <Meta property="og:url" content={createBlogFullUrl(blog.slug)}/>
      <BlogSchema blog={blog}/>

      {/* Header */}
      <header class="mb-8 space-y-4">
        <h1 class=" text-4xl font-bold leading-tight text-balance md:text-5xl">{blog.title}</h1>

        <p class="text-lg text-muted-foreground text-pretty leading-relaxed text-justify">{blog.excerpt}</p>

        {/* Metadata */}
        <div class="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <div class="flex items-center gap-1.5">
            <FiCalendar class="h-4 w-4" />
            <time dateTime={blog.date}>
              {readableDate(blog.date)}
            </time>
          </div>

          <div class="flex items-center gap-1.5">
            <FiClock class="h-4 w-4" />
            <span>{blog.readTime} دقیقه مطالعه</span>
          </div>

          {/*<div class="flex items-center gap-1.5">
            <FiHeart class="h-4 w-4" />
            <span>{blog.likeCount} لایک</span>
          </div>*/}
        </div>

        {/* Tags */}
        {blog.tags && blog.tags.length > 0 && (
          <div class="flex flex-wrap gap-2">
            {blog.tags.map((tag) => (
              <span class="rounded-md bg-accent/90 px-3 py-1 text-sm font-medium ">
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>

      {/* Featured Image */}
      {blog.image && (
        <div class="mb-12 overflow-hidden rounded-lg">
          <img
            src={blog.image || "/placeholder.svg"}
            alt={blog.title}
            width={1200}
            height={630}
            class="h-auto w-full object-cover"
          />
        </div>
      )}

      {/* Content */}
      <div class="prose prose-neutral dark:prose-invert prose-headings:font-bold prose-p:leading-relaxed prose-a:text-accent prose-a:no-underline hover:prose-a:underline prose-img:rounded-lg max-w-none">
        <div innerHTML={content()} />
      </div>
    </article>
  )
}

