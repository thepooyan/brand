import { createEffect, createSignal } from "solid-js";
import { getThemeSession, updateThemeSession } from "./session";

export type theme = "dark" | "light"
export const defaultTheme:theme = "dark"


export const [theme, setTheme] = createSignal<theme>(await getThemeSession() || "dark")

export const toggleTheme = () => {
  setTheme(prev => prev === "dark" ? "light": "dark")
}

const setThemeClient = async (val: theme) => {
  "use sesrver"
  await updateThemeSession({theme: val})
}

createEffect(async () => {
  document.body.className = `theme-${theme()}`
  await setThemeClient(theme())
})
