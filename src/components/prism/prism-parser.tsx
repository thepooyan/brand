import 'prismjs/themes/prism-tomorrow.css';
import Prism from 'prismjs';
import { onMount } from 'solid-js';

interface p {
  children: string
  lang: PrismLangs
}
export type PrismLangs = "javascript" | "HTML"
const PrismParser = ({children, lang}:p) => {

  let ref!:HTMLPreElement

  onMount(() => {
    Prism.highlightAllUnder(ref)
    Prism.highlight
  })

  return (
    <pre ref={ref}><code class={`language-${lang}`}>{children}</code></pre>
  )
}

export default PrismParser
