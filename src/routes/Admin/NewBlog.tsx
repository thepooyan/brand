import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import Spinner from "~/components/parts/Spinner"
import { newPost } from "~/server/actions"
import { FiClock, FiImage, FiSave, FiTag } from "solid-icons/fi"
import { MarkdownPreview } from "~/components/parts/MarkdownPreview"
import { createSignal } from "solid-js"
import { useNavigate } from "@solidjs/router"
import { callModal } from "~/components/layout/Modal"
import { createStore } from "solid-js/store"
import Textarea from "~/components/ui/Textarea"
import Input from "~/components/ui/InputNew"

interface BlogPost {
  title: string
  slug: string
  excerpt: string
  content: string
  tags: string[]
  date: string
  readTime: number
  image: string
}

export default function BlogEditor() {
  const [blogPost, setBlogPost] = createStore<BlogPost>({
    title: "",
    slug: "",
    excerpt: "",
    content:
      '# Welcome to your blog post\n\nStart writing your **markdown** content here...\n\n- Use lists\n- Add links\n- Include code blocks\n\n```javascript\nconsole.log("Hello, world!");\n```',
    tags: [],
    date: new Date().toISOString().split("T")[0],
    readTime: 1,
    image: "",
  })

  const goodToSend = () => blogPost.title && blogPost.excerpt && blogPost.content && blogPost.tags.length > 0 && blogPost.image && blogPost.readTime

  const [tagInput, setTagInput] = createSignal("")
  const [isSending, setIsSending] = createSignal(false)
  const router = useNavigate()

  const handleContentChange = (content: string) => {
    const wordCount = content.split(/\s+/).filter((word) => word.length > 0).length
    const readTime = Math.max(1, Math.ceil(wordCount / 200))

    setBlogPost((prev) => ({
      ...prev,
      content,
      readTime,
    }))
  }

  const addTag = () => {
    if (tagInput().trim() && !blogPost.tags.includes(tagInput().trim())) {
      setBlogPost((prev) => ({
        ...prev,
        tags: [...prev.tags, tagInput().trim()],
      }))
      setTagInput("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setBlogPost((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }))
  }

  const handleKeyPress = (e: any) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addTag()
    }
  }

  const saveBlogPost = async () => {
    setIsSending(true)
    let {ok} = await newPost(blogPost)
    if (ok) return router("/")
    callModal.fail("Something went wrong. please try again.")
    setIsSending(false)
  }

  return (
    <div class="min-h-screen bg-background ltr">
      {/* Header */}
      <header class="border-b border-border bg-card px-6 py-4">
        <div class="flex items-center justify-between">
          <h1 class="text-2xl font-bold text-foreground">Blog Editor</h1>
          <Button onClick={saveBlogPost} disabled={!goodToSend() || isSending()}>
            {isSending() ? <Spinner reverse/> : <FiSave class="mr-1 h-4 w-4" />}
            Save Post
          </Button>
        </div>
      </header>

      {/* Metadata Section */}
      <div class="border-b border-border bg-card px-6 py-6">
        <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div class="space-y-2">
            <Label for="title" class="text-sm font-medium text-foreground">
              Title
            </Label>
            <Input
              id="title"
              value={blogPost.title}
              onchange={e => setBlogPost("title", e.target.value)}
              placeholder="Enter blog post title..."
              class="bg-input border-border"
            />
          </div>


          <div class="space-y-2">
            <Label for="readTime" class="text-sm font-medium text-foreground flex items-center gap-2">
              <FiClock class="h-4 w-4" />
              Read Time (min)
            </Label>
            <Input
              id="readTime"
              type="number"
              min="1"
              value={blogPost.readTime}
              onChange={(e) => setBlogPost((prev) => ({ ...prev, readTime: Number.parseInt(e.target.value) || 1 }))}
              class="bg-input border-border"
            />
          </div>

          <div class="space-y-2">
            <Label for="image" class="text-sm font-medium text-foreground flex items-center gap-2">
              <FiImage class="h-4 w-4" />
              Featured Image URL
            </Label>
            <Input
              id="image"
              placeholder="https://example.com/image.jpg"
              value={blogPost.image}
              onChange={(e) => setBlogPost((prev) => ({ ...prev, image: e.target.value }))}
              class="bg-input border-border"
            />
          </div>
        </div>

        <div class="mt-6 space-y-2">
          <Label for="excerpt" class="text-sm font-medium text-foreground">
            Excerpt
          </Label>
            <Textarea
              id="excerpt"
              placeholder="Write a brief excerpt for your blog post..."
              value={blogPost.excerpt}
              onChange={(e:any) => setBlogPost((prev) => ({ ...prev, excerpt: e.target.value }))}
              class="bg-input border-border resize-none"
              rows={2}
            />
        </div>

        <div class="mt-6 space-y-2">
          <Label class="text-sm font-medium text-foreground flex items-center gap-2">
            <FiTag class="h-4 w-4" />
            Tags
          </Label>
          <div class="flex gap-2">
            <Input
              placeholder="Add a tag..."
              value={tagInput()}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyPress={handleKeyPress}
              class="bg-input border-border"
            />
            <Button onClick={addTag} variant="outline" size="sm">
              Add
            </Button>
          </div>
          {blogPost.tags.length > 0 && (
            <div class="flex flex-wrap gap-2 mt-3">
              {blogPost.tags.map((tag) => (
                <Badge
                  variant="secondary"
                  class="cursor-pointer bg-accent text-accent-foreground hover:bg-accent/80"
                  onClick={() => removeTag(tag)}
                >
                  {tag} ×
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Editor and Preview */}
      <div class="flex h-[calc(100vh-280px)]">
        {/* Editor Pane */}
        <div class="flex-1 border-r border-border">
          <div class="h-full p-6">
            <Label for="content" class="text-sm font-medium text-foreground mb-3 block">
              Markdown Content
            </Label>

            <Textarea
              id="content"
              placeholder="Write your markdown content here..."
              value={blogPost.content}
              onChange={(e:any) => handleContentChange(e.target.value)}
              class="h-[calc(100%-2rem)] bg-background border-border font-mono text-sm resize-none focus:ring-2 focus:ring-accent"
            />
          </div>
        </div>

        {/* Preview Pane */}
        <div class="flex-1">
          <div class="h-full p-6 bg-card">
            <Label class="text-sm font-medium text-card-foreground mb-3 block">Live Preview</Label>
            <Card class="h-[calc(100%-2rem)] overflow-auto bg-card border-border">
              <div class="p-6">
                <MarkdownPreview content={blogPost.content} />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

