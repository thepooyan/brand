import { ParentProps } from "solid-js"

const layout = ({children}:ParentProps) => {
  return (
    <>
      <div class="absolute pointer-events-none inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 opacity-30 -z-10"></div>
      <div class="absolute pointer-events-none top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10"></div>
      <div class="absolute pointer-events-none bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10"></div>
      {children}
    </>
  )
}

export default layout 
