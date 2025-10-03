import {marked} from "marked"

interface MarkdownPreviewProps {
  content: string
}

export function MarkdownPreview(props: MarkdownPreviewProps) {
  if (!props.content.trim()) {
    return (
      <div class="flex items-center justify-center h-32 text-muted-foreground">
        Start typing to see your markdown preview...
      </div>
    )
  }
  let content = () => marked(props.content, {async: false})

  return <div class="prose prose-sm max-w-none  dark:prose-invert" innerHTML={content() || ""}/>
}

