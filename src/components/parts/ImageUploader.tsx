import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { createSignal } from "solid-js"
import { ChangeEvent } from "~/lib/interface"
import { FiImage, FiLoader, FiUpload, FiX } from "solid-icons/fi"

type UploadState = "idle" | "loading" | "preview"

export function ImageUploader() {
  const [state, setState] = createSignal<UploadState>("idle")
  const [preview, setPreview] = createSignal<string | null>(null)
  const [fileName, setFileName] = createSignal<string>("")
  const [isDragging, setIsDragging] = createSignal(false)
  let inputRef!:HTMLInputElement

  const processFile = (file: File) => {
    if (!file.type.startsWith("image/")) return

    setState("loading")
    setFileName(file.name)

    const reader = new FileReader()
    reader.onload = (e) => {
      // Simulate a slight delay for loading state visibility
      setTimeout(() => {
        setPreview(e.target?.result as string)
        setState("preview")
      }, 800)
    }
    reader.readAsDataURL(file)
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.[0]
    if (file) processFile(file)
  }

  const handleRemove = () => {
    setState("idle")
    setPreview(null)
    setFileName("")
    if (inputRef) inputRef.value = ""
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
                Drop an image here
              </p>
              <p class="text-xs">PNG, JPG, GIF, WebP up to 10MB</p>
            </div>
          </div>
        )}

        {/* Loading state */}
        {state() === "loading" && (
          <div class="flex flex-col items-center gap-3">
            <FiLoader class="size-8 animate-spin text-muted-foreground" />
            <div class="flex flex-col items-center gap-1">
              <p class="text-sm font-medium text-foreground">
                Processing...
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
                Remove
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
              Remove
            </Button>
            <Button
              class="flex-1"
              onClick={() => inputRef.click()}
            >
              <FiUpload class="size-4" />
              Replace
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
                Uploading...
              </>
            ) : (
              <>
                <FiUpload class="size-4" />
                Upload Image
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

