import { Button } from "@/components/ui/button"
import md from "@/other/sampleMD.md?raw"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import Spinner from "~/components/parts/Spinner"
import { editPost, newPost } from "~/server/actions"
import { FiClock, FiGlobe, FiImage, FiSave, FiTag } from "solid-icons/fi"
import { MarkdownPreview } from "~/components/parts/MarkdownPreview"
import { createSignal, Match, Switch } from "solid-js"
import { revalidate, useNavigate } from "@solidjs/router"
import { callModal } from "~/components/layout/Modal"
import { createStore } from "solid-js/store"
import Textarea from "~/components/ui/Textarea"
import Input from "~/components/ui/InputNew"
import UploadBtn from "~/components/parts/UploadBtn"
import { cn } from "~/lib/utils"
import { IBlog } from "~/db/schema"

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

const newEmptyBlog: BlogPost = {
    title: "",
    slug: "",
    excerpt: "",
    content: md,
    tags: [],
    date: new Date().toISOString(),
    readTime: 1,
    image: "",
}

interface props {
  editData?: IBlog
}
export default function BlogEditor({editData}:props) {
  const [blogPost, setBlogPost] = createStore<BlogPost>(editData ? editData : newEmptyBlog)

  const goodToSend = () => blogPost.title && blogPost.excerpt && blogPost.content && blogPost.tags.length > 0 && blogPost.image && blogPost.readTime

  const [tagInput, setTagInput] = createSignal("")
  const [isSending, setIsSending] = createSignal(false)
  enum imgState {
    loading,
    invalid,
    valid
  }
  const [imageState, setImageState] = createSignal(imgState.invalid)
  const navigate = useNavigate()

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

  const decideAction = (post: BlogPost) => {
    if (editData === undefined)
      return newPost(post)
      else return editPost({...post, id: editData.id, likeCount: editData.likeCount})
  }

  const saveBlogPost = async () => {
    setIsSending(true)
    let {ok} = await decideAction(blogPost)
    if (ok) {
      navigate("/admin/BlogManagment")
      revalidate("blogs")
      return
    }
    callModal.fail("Something went wrong. please try again.")
    setIsSending(false)
  }

  return (
    <div class="min-h-screen">
      {/* Header */}
      <header class="border-b border-border  px-6 py-4">
        <div class="flex items-center justify-between">
          <h1 class="text-2xl font-bold text-foreground">بلاگ جدید</h1>
          <Button onClick={saveBlogPost} disabled={!goodToSend() || isSending()}>
            {isSending() ? <Spinner/> : <FiSave class="mr-1 h-4 w-4" />}
            ذخیره
          </Button>
        </div>
      </header>

      {/* Metadata Section */}
      <div class="border-b border-border  px-6 py-6">
        <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div class="space-y-2">
            <Label for="title" class="text-sm font-medium text-foreground">
              عنوان
            </Label>
            <Input
              id="title"
              value={blogPost.title}
              onchange={e => setBlogPost("title", e.target.value)}
              placeholder="عنوان بلاگ را وارد کنید..."
              class="bg-input border-border"
            />
          </div>


          <div class="space-y-2">
            <Label for="readTime" class="text-sm font-medium text-foreground flex items-center gap-2">
              <FiGlobe class="h-4 w-4" />
              اسلاگ
            </Label>
            <Input
              value={blogPost.slug}
              onChange={e => setBlogPost("slug", e.target.value)}
              placeholder="اسلاگ-نمونه"
              class="bg-input border-border"
            />
          </div>
          <div class="space-y-2">
            <Label for="readTime" class="text-sm font-medium text-foreground flex items-center gap-2">
              <FiClock class="h-4 w-4" />
              زمان مطالعه (دقیقه)
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
              آدرس تصویر اصلی
            </Label>
            <div class="flex w-full gap-3">
              <Input
                id="image"
                placeholder="https://example.com/image.jpg"
                value={blogPost.image}
                onChange={(e) => setBlogPost((prev) => ({ ...prev, image: e.target.value }))}
                class="bg-input border-border w-full"
              />
              <UploadBtn onUploaded={str => setBlogPost("image", str)} setIsUploading={() => setImageState(imgState.loading)}/>
            </div>
          </div>
          <div class="">
            <p class="mb-1">پیش نمایش تصویر</p>
            <Switch>
              <Match when={imageState() === imgState.loading}>
                <p class="bg-input w-80 h-40 rounded-lg flex justify-center items-center text-muted-foreground/50 ">
                  لطفا صبر کنید
                  <Spinner reverse class="mr-2"/>
                </p>
              </Match>
              <Match when={imageState() === imgState.invalid}>
                <p class="bg-input w-80 h-40 rounded-lg flex justify-center items-center text-muted-foreground/50">تصویر یافت نشد</p>
              </Match>
            </Switch>
            <img src={blogPost.image}
              onerror={() => setImageState(imgState.invalid)}
              onload={() => setImageState(imgState.valid)}
              class={cn(" bg-input  h-40 w-80 rounded-lg object-contain", imageState() !== imgState.valid && "hidden")}
              alt=""/>
          </div>
        </div>

        <div class="mt-6 space-y-2">
          <Label for="excerpt" class="text-sm font-medium text-foreground">
            خلاصه
          </Label>
            <Textarea
              id="excerpt"
              placeholder="توضیحی کوتاه در مورد بلاگ..."
              value={blogPost.excerpt}
              onChange={(e:any) => setBlogPost((prev) => ({ ...prev, excerpt: e.target.value }))}
              class="bg-input border-border resize-none"
              rows={2}
            />
        </div>

        <div class="mt-6 space-y-2">
          <Label class="text-sm font-medium text-foreground flex items-center gap-2">
            <FiTag class="h-4 w-4" />
            تگ  ها
          </Label>
          <div class="flex gap-2">
            <Input
              placeholder="یک تگ اضافه کنید..."
              value={tagInput()}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyPress={handleKeyPress}
              class="bg-input border-border"
            />
            <Button onClick={addTag} variant="outline" size="sm">
              افزودن
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
              محتوای بلاگ
            </Label>

            <Textarea
              id="content"
              value={blogPost.content}
              onkeyup={(e:any) => handleContentChange(e.target.value)}
              class="h-93 bg-input border-border font-mono text-sm resize-none focus:ring-2 focus:ring-accent"
            />
          </div>
        </div>

        {/* Preview Pane */}
        <div class="flex-1">
          <div class="h-full p-6  ">
            <Label class="text-sm font-medium text-card-foreground mb-3 block">پیش نمایش</Label>
            <Card class="h-[calc(100%-2rem)] overflow-auto bg-input border-border">
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

