import { Accessor } from "solid-js"

export type OptionalAccessor<T> = Accessor<T> | T

export const unwrap = <T>(o: OptionalAccessor<T>) => {
  if (typeof o === "function") return (o as Accessor<T>)()
  return o
}

export const wrap = <T>(o: OptionalAccessor<T>):Accessor<T> => {
  if (typeof o !== "function") return (o as Accessor<T>)
  return () => o as T
}
