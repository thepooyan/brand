import { createEffect, createSignal } from "solid-js";
import { getThemeSession, updateThemeSession } from "./session";
import { OptionalAccessor, unwrap } from "./solid";

export type theme = "dark" | "" | "plain" | "amber-dark" | "neon-dark" 
export const defaultTheme:theme = "dark"

export const [theme, setTheme] = createSignal<theme>(defaultTheme)

export const toggleTheme = () => {
  setTheme(prev => prev === "dark" ? "": "dark")
}

export const getClassname = (t:OptionalAccessor<theme>) => `theme-${unwrap(t)} ${unwrap(t).endsWith("dark") && "dark" || ""}`

createEffect(async () => {
  document.body.className = getClassname(theme())
  await updateThemeSession({theme: theme()})
})

export const updateThemeSignal = () => {
  getThemeSession()
  .then(theme => setTheme(theme))
}

