import { createEffect, createSignal } from "solid-js";
import { getThemeSession, updateThemeSession } from "./session";

const test = async ():Promise<theme> => {
  "use server"
  return getThemeSession()
}

export type theme = "dark" | "" | "plain" | "amber-dark" | "neon-dark" 
export const defaultTheme:theme = await test()

export const [theme, setTheme] = createSignal<theme>(defaultTheme)

export const toggleTheme = () => {
  setTheme(prev => prev === "dark" ? "": "dark")
}

const setThemeClient = async (val: theme) => {
  "use sesrver"
  await updateThemeSession({theme: val})
}

createEffect(async () => {
  document.body.className = `theme-${theme()} ${theme().endsWith("dark") && "dark"}`
  await setThemeClient(theme())
})
