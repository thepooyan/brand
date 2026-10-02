import { Accessor, createContext, createEffect, ParentProps, useContext } from "solid-js";
import { defaultTheme, setTheme, setupTheme, theme, themeObject } from "./theme";
import { createAsync } from "@solidjs/router";
import { getThemeSession } from "./session";

const ThemeContext = createContext<Accessor<themeObject>>(() => defaultTheme);

export const useTheme = () => useContext(ThemeContext)

export const ThemeProvider = (props:ParentProps) => {

  const initialTheme = createAsync(() => getThemeSession(), {deferStream: true})
  createEffect(async () => {
    let a = initialTheme()
    if (a === undefined) {
      let setup = await setupTheme()
      setTheme(setup)
    }
    //validate the cookie
    if (a) setTheme(a)
  })
  const finalTheme = () => theme() ?? initialTheme() ?? defaultTheme

  return <ThemeContext.Provider value={finalTheme}>
    {props.children}
  </ThemeContext.Provider>
}
