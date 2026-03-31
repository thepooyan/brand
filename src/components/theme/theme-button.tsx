import { FiMoon, FiSun } from "solid-icons/fi"
import { Button } from "../ui/button"
import { theme, toggleTheme } from "~/lib/theme"
import { cn } from "~/lib/utils"

const ThemeButton = () => {

  const isDark = () => theme() === "dark"

  return (
    <Button variant="outline" onclick={() => toggleTheme()}
      class="w-10"
    >
      <FiSun class={cn(
        "transition-all absolute duration-100",
        !isDark() && "opacity-0 rotate-45 invisible"
      )}/>
      <FiMoon class={cn(
        "transition-all absolute duration-100",
        isDark() && "opacity-0 -rotate-45 invisible"
      )}/>
    </Button>
  )
}

export default ThemeButton
