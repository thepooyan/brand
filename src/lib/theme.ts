import { createSignal } from "solid-js";
import { updateThemeSession } from "./session";
import { OptionalAccessor, unwrap } from "./solid";

export type theme = "dark" | "" | "plain" | "amber-dark" | "neon-dark" 
export const defaultTheme:theme = "dark"

export const [theme, setTheme] = createSignal<theme>(defaultTheme)

export const toggleTheme = async () => {
  const t = theme()
  const newTheme = t === "dark" ? "" : "dark"
  setTheme(newTheme)
  await updateThemeSession({theme: newTheme})
}

export const getClassname = (t:OptionalAccessor<theme>) => `theme-${unwrap(t)} ${unwrap(t).endsWith("dark") && "dark" || ""}`



