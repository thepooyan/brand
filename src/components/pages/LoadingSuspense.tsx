import { ParentProps, Suspense } from "solid-js"
import { Loading } from "../parts/Loading"


const LoadingSuspense = (p:ParentProps) => {
  return (
    <Suspense fallback={<Loading/>}>
      {p.children}
    </Suspense>
  )
}

export default LoadingSuspense
