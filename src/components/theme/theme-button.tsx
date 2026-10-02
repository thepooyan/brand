import { FiMoon, FiSun } from "solid-icons/fi"
import { Button } from "../ui/button"
import { cn } from "~/lib/utils"
import { toggleTheme } from "~/lib/theme"
import { useTheme } from "~/lib/themeProvider"

const ThemeButton = () => {
  const theme = useTheme()
  return (
    <Button variant="outline" onclick={() => toggleTheme()}
      class="w-10"
    >
      <FiSun class={cn(
        "transition-all absolute duration-100",
        !theme().isDark && "opacity-0 rotate-45 invisible"
      )}/>
      <FiMoon class={cn(
        "transition-all absolute duration-100",
        theme().isDark && "opacity-0 -rotate-45 invisible"
      )}/>
    </Button>
  )
}

export default ThemeButton
