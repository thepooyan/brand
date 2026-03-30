import { Accessor, For, Show } from "solid-js"
import HistoryCard, { HistoryWithName } from "./history-card"
import { FiFilter } from "solid-icons/fi"
import { filterHook, filterOptions, useFilter } from "~/lib/hooks/useFilter"
import { Button } from "../ui/button"
import { cn, filterLastMonth, filterLastWeek, filterOlderThanLastMonth, filterToday } from "~/lib/utils"
import { Tooltip,TooltipContent, TooltipTrigger } from "../ui/tooltip"

interface p {
  data: Accessor<HistoryWithName[]>
}
const HistoryCardMapper = ({data}:p) => {
  const timeFilters:filterOptions<HistoryWithName> = {
    "امروز": (d:HistoryWithName) => filterToday(d.lastUpdated),
    "هفته گذشته": (d:HistoryWithName) => filterLastWeek(d.lastUpdated),
    "ماه گذشته": (d:HistoryWithName) => filterLastMonth(d.lastUpdated),
    "قدیمی تر": (d:HistoryWithName) => filterOlderThanLastMonth(d.lastUpdated),
  }
  const timeFilterHook = useFilter(data, timeFilters)

  const uniqeBotNames = new Set(data().map(i => i.chatbot.botName))
  const botFilters: filterOptions<HistoryWithName> = {}
  uniqeBotNames.forEach(i => {
    botFilters[i] = (d:HistoryWithName) => d.chatbot.botName === i
  })

  const botFilterHook = useFilter(timeFilterHook.filtered, botFilters)

  const uniqeUserIps = new Set(data().map(i => i.nickname))
  const userFilters: filterOptions<HistoryWithName> = {}
  uniqeUserIps.forEach(i => {
    userFilters[i] = (d:HistoryWithName) => d.nickname === i
  })

  const userFilterHook = useFilter(botFilterHook.filtered, userFilters)

  const sourceFilters: filterOptions<HistoryWithName> = {
    "widget": (d:HistoryWithName) => d.source === "widget",
    "website": (d:HistoryWithName) => d.source === "website",
    "api": (d:HistoryWithName) => d.source === "api",
    "telegram": (d:HistoryWithName) => d.source === "telegram",
  }
  const sourceFilterHook = useFilter(userFilterHook.filtered, sourceFilters)

  const {filtered} = sourceFilterHook

  return (
    <>
      <div class="flex gap-2 mb-4">
        <FilterSection name="زمان" fh={timeFilterHook}/>
        {Object.keys(botFilters).length > 1 && 
        <FilterSection name="ربات" fh={botFilterHook}/>}
        <FilterSection name="کاربر" fh={userFilterHook}/>
        <FilterSection name="منبع" fh={sourceFilterHook}/>
      </div>

      <For each={filtered()}>
        {(b, idx) => <HistoryCard histroy={b} idx={idx}/>}
      </For>

      <Show when={filtered().length === 0}>
        <div class="text-muted-foreground text-center text-sm my-10">
          مکالمه ای وجود ندارد
        </div>
      </Show>
    </>
  )
}

const FilterSection = ({name, fh: {allFilters, setFilter, activeFilter}}:{name: string, fh: filterHook<HistoryWithName>}) => 
  <div class="flex gap-1">
    <Tooltip openDelay={0}  skipDelayDuration={0}>
      <TooltipTrigger as={Button} variant="outline" size="sm">
        <FiFilter/>
        فیلتر {name}
      </TooltipTrigger>
      <TooltipContent class="gap-1 flex bg-card p-2 text-card-foreground">
        <Button variant="outline"
          size="sm"
          class={cn(activeFilter() === "" && "bg-secondary")}
          onclick={() => setFilter("")}>
          همه
        </Button>
        <For each={Object.keys(allFilters).filter(i => i !== "")}>
          {k => <Button
            variant="outline" size="sm"
            onClick={() => setFilter(k)} 
            class={cn(activeFilter() === k && "bg-secondary")}>
            {k}
          </Button>}
        </For>
      </TooltipContent>
    </Tooltip>
  </div>

export default HistoryCardMapper
