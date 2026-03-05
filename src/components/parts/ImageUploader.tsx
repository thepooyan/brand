import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { createSignal, Show } from "solid-js"
import { ChangeEvent } from "~/lib/interface"
import { FiImage, FiLoader, FiUpload, FiX } from "solid-icons/fi"
import { callModal } from "../layout/Modal"
import { uploadFileToS3 } from "~/s3/s3Actions"

type UploadState = "idle" | "loading" | "preview"

interface props {
  name?: string
  onChange?: (value: string) => void
  initialValue?: string
}
export function ImageUploader({ name, onChange, initialValue }:props) {
  const [state, setState] = createSignal<UploadState>(initialValue ? "preview" : "idle")
  const [preview, setPreview] = createSignal<string | null>(initialValue || null)
  const [fileName, setFileName] = createSignal<string>("")
  const [isDragging, setIsDragging] = createSignal(false)
  const [uploadedUrl, setUploadedUrl] = createSignal<string | null>(initialValue || null)
  let inputRef!:HTMLInputElement

  const processFile = async (file: File) => {
    if (!file.type.startsWith("image/")) return

    setState("loading")
    setFileName(file.name)

    const reader = new FileReader()
    reader.onload = (e) => {
      setPreview(e.target?.result as string)
      setState("preview")
    }
    try {
      const url = await uploadFileToS3(file)
      reader.readAsDataURL(file)
      setUploadedUrl(url)
      onChange && onChange(url)
    } catch(e) {
      console.log(e)
      callModal.fail("متاسفانه آپلود فایل با مشکل مواجه شد. لطفا مجددا تلاش کنید.")
      setState("idle")
    }
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.[0]
    if (file) processFile(file)
  }

  const handleRemove = async () => {
    const url = uploadedUrl()
    if (!url) return 
    try {
      // await deleteFileFromS3(url)
      setState("idle")
      setPreview(null)
      setFileName("")
      setUploadedUrl("")
      onChange && onChange("")
      if (inputRef) inputRef.value = ""
    } catch(e) {
      console.log(e)
      callModal.fail("حذف تصویر موفقیت آمیز نبود. لطفا مجددا تلاش کنید.")
    }
  }

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e?.dataTransfer?.files?.[0]
    if (file) processFile(file)
  }

  return (
    <div class="flex flex-col items-center gap-4 w-full max-w-sm">
      <Show when={uploadedUrl()}>
        {v => 
          <input
            type="hidden"
            name={name}
            value={v()}
          />
        }
      </Show>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        class="sr-only"
        aria-label="Upload image"
      />

      {/* Drop zone / Preview area */}
      <div
        role="button"
        tabIndex={0}
        onClick={() => state() !== "preview" && inputRef.click()}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault()
            if (state() !== "preview") inputRef.click()
          }
        }}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        class={cn(
          "relative flex items-center justify-center w-full aspect-square rounded-xl border-2 border-dashed transition-all duration-200 overflow-hidden",
          state() === "idle" && "cursor-pointer border-muted-foreground/25 bg-muted/40 hover:border-muted-foreground/50 hover:bg-muted/60",
          state() === "loading" && "border-muted-foreground/25 bg-muted/40 cursor-default",
          state() === "preview" && "border-transparent bg-muted/20 cursor-default",
          isDragging() && "border-primary bg-primary/5 scale-[1.02]"
        )}
      >
        {/* Idle state */}
        {state() === "idle" && (
          <div class="flex flex-col items-center gap-3 text-muted-foreground">
            <div class="flex items-center justify-center size-12 rounded-full bg-muted">
              <FiImage class="size-5" />
            </div>
            <div class="flex flex-col items-center gap-1">
              <p class="text-sm font-medium text-foreground">
                تصویر خود را اینجا رها کنید
              </p>
              <p class="text-xs">PNG, JPG, GIF, WebP</p>
            </div>
          </div>
        )}

        {/* Loading state */}
        {state() === "loading" && (
          <div class="flex flex-col items-center gap-3">
            <FiLoader class="size-8 animate-spin text-muted-foreground" />
            <div class="flex flex-col items-center gap-1">
              <p class="text-sm font-medium text-foreground">
                دل حال پردازش...
              </p>
              <p class="text-xs text-muted-foreground truncate max-w-[200px]">
                {fileName()}
              </p>
            </div>
          </div>
        )}

        {/* Preview state */}
        {state() === "preview" && preview() && (
          <>
            <img
              src={preview() || ""}
              alt={`Preview of ${fileName()}`}
              class="size-full object-cover"
            />
            {/* Overlay with remove button */}
            <div class="absolute inset-0 bg-foreground/0 hover:bg-foreground/40 transition-colors duration-200 flex items-center justify-center opacity-0 hover:opacity-100">
              <Button
                variant="secondary"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation()
                  handleRemove()
                }}
                class="gap-1.5"
              >
                <FiX class="size-3.5" />
                 حذف
              </Button>
            </div>
          </>
        )}
      </div>

      {/* Action buttons */}
      <div class="flex items-center gap-2 w-full">
        {state() === "preview" ? (
          <>
            <Button
              variant="outline"
              class="flex-1"
              onClick={handleRemove}
            >
              <FiX class="size-4" />
              حذف
            </Button>
            <Button
              class="flex-1"
              onClick={() => inputRef.click()}
            >
              <FiUpload class="size-4" />
              انتخاب مجدد
            </Button>
          </>
        ) : (
          <Button
            class="w-full"
            onClick={() => inputRef.click()}
            disabled={state() === "loading"}
          >
            {state() === "loading" ? (
              <>
                <FiLoader class="size-4 animate-spin" />
                  دل حال آپلود...
              </>
            ) : (
              <>
                <FiUpload class="size-4" />
                آپلود تصویر
              </>
            )}
          </Button>
        )}
      </div>

      {/* File name indicator */}
      {state() === "preview" && (
        <p class="text-xs text-muted-foreground truncate max-w-full">
          {fileName()}
        </p>
      )}
    </div>
  )
}

