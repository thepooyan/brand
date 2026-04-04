import 'prismjs/themes/prism-tomorrow.css';
import Prism from 'prismjs';
import { onMount } from 'solid-js';

interface p {
  children: string
  lang: "javascript" | "html"
}
const PrismParser = ({children, lang}:p) => {

  let ref!:HTMLPreElement

  onMount(() => {
    Prism.highlightAllUnder(ref)
  })

  return (
    <pre ref={ref}><code class={`language-${lang}`}>{children}</code></pre>
  )
}

export default PrismParser
