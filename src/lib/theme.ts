import { createEffect, createSignal } from "solid-js";
import { getThemeSession, updateThemeSession } from "./session";

export type theme = "dark" | "" | "plain" | "amber-dark" | "neon-dark" 
export const defaultTheme:theme = "dark"

export const [theme, setTheme] = createSignal<theme>(defaultTheme)

export const toggleTheme = () => {
  setTheme(prev => prev === "dark" ? "": "dark")
}

createEffect(async () => {
  document.body.className = `theme-${theme()} ${theme().endsWith("dark") && "dark"}`
  await updateThemeSession({theme: theme()})
})

export const updateThemeSignal = () => {
  getThemeSession()
  .then(theme => setTheme(theme))
}
