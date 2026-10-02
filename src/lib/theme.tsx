import { createEffect, createSignal, ParentProps } from "solid-js";
import { updateThemeSession } from "./session";
import { OptionalAccessor, unwrap } from "./solid";
import { useTheme } from "./themeProvider";

export type theme = "dark" | "light" | "plain" | "amber-dark" | "neon-dark" 
export const defaultTheme:theme = "dark"
export const defaultIsDark = true

export const [theme, setTheme] = createSignal<theme | null>(null)


export const toggleTheme = async () => {
  const t = theme()
  const newTheme = t === "dark" ? "light" : "dark"
  setTheme(newTheme)
  await updateThemeSession({theme: newTheme})
}

export const getClassname = (t:OptionalAccessor<theme>) => `theme-${unwrap(t)} ${unwrap(t).endsWith("dark") && "dark" || ""}`

createEffect(() => document.body.className = getClassname(theme() ?? defaultTheme))

export const WrapWithTheme = (props:ParentProps) => {

  const {theme} = useTheme()

  return <div class={getClassname(theme())} id="body">
    {props.children}
  </div>
}
