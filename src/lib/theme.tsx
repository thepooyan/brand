import { createEffect, createSignal, ParentProps } from "solid-js";
import { updateThemeSession } from "./session";
import { OptionalAccessor, unwrap } from "./solid";
import { useTheme } from "./themeProvider";
import z from "zod";

const availableThemes = z.enum(["dark" , "light" , "plain" , "amber-dark" , "neon-dark" ])
const zodThemeObject = z.object({
  light: availableThemes,
  dark: availableThemes,
  isDark: z.boolean()
})
export type theme = z.infer<typeof availableThemes>
export type themeObject = z.infer<typeof zodThemeObject>
export const defaultTheme:themeObject = {light: "light", dark: "dark", isDark: true}

// initial value has to be undefined because
// it flashes on the default theme for some reason
export const [theme, setTheme] = createSignal<themeObject>()

export const toggleTheme = async () => {
  const t = theme()
  if (!t) return
  const newTheme = {...t, isDark: !t.isDark}
  setTheme(newTheme)
  await updateThemeSession({theme: newTheme})
}

export const setupTheme = async () => {
  // this is client side
  await setupThemeSession()
  setTheme(defaultTheme)
}

const setupThemeSession = async () => {
  "use server"
  await updateThemeSession({theme: defaultTheme})
}

export const validateThemeObject = (themeObject: any) => {
  return zodThemeObject.safeParse(themeObject)
}

export const getClassname = (t:OptionalAccessor<themeObject>) => {
  const opened = unwrap(t)
  const isDark = opened.isDark
  const theme = isDark ? opened.dark : opened.light

  return `theme-${theme} ${isDark ? "dark" : ""}`
}

createEffect(() => {
  const t = theme()
  if (t)
  document.body.className = getClassname(t)
})

export const WrapWithTheme = (props:ParentProps) => {

  const theme = useTheme()

  return <div class={getClassname(theme())} id="body">
    {props.children}
  </div>
}
