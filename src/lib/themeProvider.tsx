import { Accessor, createContext, createEffect, ParentProps, useContext } from "solid-js";
import { defaultIsDark, defaultTheme, setTheme, theme } from "./theme";
import { createAsync } from "@solidjs/router";
import { getThemeSession } from "./session";

type themeContext = {
  theme: Accessor<theme>,
  isDark: Accessor<boolean>
}
const ThemeContext = createContext<themeContext>({theme: () => defaultTheme, isDark: () => defaultIsDark});

export const useTheme = () => useContext(ThemeContext)

export const ThemeProvider = (props:ParentProps) => {

  const initialTheme = createAsync(() => getThemeSession(), {deferStream: true})
  createEffect(() => {
    let a = initialTheme()
    if (a) setTheme(a)
  })
  const finalTheme = () => theme() ?? initialTheme() ?? defaultTheme
  const isDark = () => finalTheme() === "dark"

  return <ThemeContext.Provider value={{theme: finalTheme, isDark}}>
    {props.children}
  </ThemeContext.Provider>
}
