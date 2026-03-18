import { createEffect, createSignal } from "solid-js";

type theme = "dark" | "light"
export const [theme, setTheme] = createSignal<theme>("dark")

export const toggleTheme = () => {
  setTheme(prev => prev === "dark" ? "light": "dark")
}

createEffect(() => {
  document.body.className = theme()
})
