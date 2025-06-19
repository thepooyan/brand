import { ParentProps } from "solid-js"

const Panel = ({children}:ParentProps) => {
  return (
    <main >
      <div>
        list
      </div>
      {children}
    </main>
  )
}

export default Panel
