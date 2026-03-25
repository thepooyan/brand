import { createEffect, createSignal } from "solid-js";

type theme = "dark" | "light"
export const defaultTheme:theme = "dark"

export const [theme, setTheme] = createSignal<theme>(defaultTheme)

export const toggleTheme = () => {
  setTheme(prev => prev === "dark" ? "light": "dark")
}

createEffect(() => {
  document.body.className = `theme-${theme()}`
})
