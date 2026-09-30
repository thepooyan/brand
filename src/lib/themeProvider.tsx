import { Accessor, createContext, createEffect, ParentProps, useContext } from "solid-js";
import { defaultTheme, setTheme, theme } from "./theme";
import { createAsync } from "@solidjs/router";
import { getThemeSession } from "./session";

type themeContext = {
  theme: Accessor<theme | undefined>,
  isDark: Accessor<boolean | undefined>
}
const ThemeContext = createContext<themeContext>({theme: () => defaultTheme, isDark: () => false});

export const useTheme = () => useContext(ThemeContext)

export const ThemeProvider = (props:ParentProps) => {

  const initialTheme = createAsync(() => getThemeSession(), {deferStream: true})
  createEffect(() => {
    let a = initialTheme()
    if (a) setTheme(a)
  })
  const finalTheme = () => theme() ?? initialTheme()
  const isDark = () => finalTheme() === "dark"

  return <ThemeContext.Provider value={{theme: finalTheme, isDark}}>
    {props.children}
  </ThemeContext.Provider>
}
