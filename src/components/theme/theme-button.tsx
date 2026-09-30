import { FiMoon, FiSun } from "solid-icons/fi"
import { Button } from "../ui/button"
import { cn } from "~/lib/utils"
import { isDark, toggleTheme } from "~/lib/theme"

const ThemeButton = () => {
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
