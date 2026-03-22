import { For } from "solid-js"
import HistoryCard, { HistoryWithName } from "./history-card"
import { FiFilter } from "solid-icons/fi"
import { filterHook, filterOptions, useFilter } from "~/lib/hooks"
import { Button } from "../ui/button"
import { cn, filterLastMonth, filterLastWeek, filterOlderThanLastMonth, filterToday } from "~/lib/utils"

interface p {
  data: HistoryWithName[]
}
const HistoryCardMapper = ({data}:p) => {

  const timeFilters:filterOptions<HistoryWithName> = {
    "امروز": (d:HistoryWithName) => filterToday(d.messages.at(-1)?.timestamp),
    "هفته گذشته": (d:HistoryWithName) => filterLastWeek(d.messages.at(-1)?.timestamp),
    "ماه گذشته": (d:HistoryWithName) => filterLastMonth(d.messages.at(-1)?.timestamp),
    "قدیمی تر": (d:HistoryWithName) => filterOlderThanLastMonth(d.messages.at(-1)?.timestamp),
  }
  const timeFilterHook = useFilter(() => data, timeFilters)

  const uniqeBotIds = new Set(data.map(i => i.botId))
  const botFilters: filterOptions<HistoryWithName> = {}
  uniqeBotIds.forEach(i => {
    botFilters[i] = (d:HistoryWithName) => d.botId === i
  })

  const botFilterHook = useFilter(timeFilterHook.filtered, botFilters)

  const uniqeUserIps = new Set(data.map(i => i.userIP))
  const userFilters: filterOptions<HistoryWithName> = {}
  uniqeUserIps.forEach(i => {
    userFilters[i] = (d:HistoryWithName) => d.userIP === i
  })

  const userFilterHook = useFilter(botFilterHook.filtered, userFilters)
  const {filtered} = userFilterHook

  return (
    <>
      <div class="grid grid-cols-2">
        <FilterSection name="زمان" fh={timeFilterHook}/>
        <FilterSection name="ربات" fh={botFilterHook}/>
        <FilterSection name="کاربر" fh={userFilterHook}/>
      </div>

      <For each={filtered()}>
        {(b, idx) => <HistoryCard histroy={b} idx={idx}/>}
      </For>
    </>
  )
}

const FilterSection = ({name, fh: {allFilters, setFilter, activeFilter}}:{name: string, fh: filterHook<HistoryWithName>}) => 
  <div class="my-4 mb-6 flex gap-1">
    <span class="text-sm center gap-1 text-muted-foreground ">
      <FiFilter/>
      فیلتر {name}:
    </span>
    <Button variant="outline"
      size="sm"
      class={cn(activeFilter() === "" && "bg-secondary")}
      onclick={() => setFilter("")}>
      همه
    </Button>
    <For each={Object.keys(allFilters).filter(i => i !== "")}>
      {k => <Button
        variant="outline" size="sm"
        onclick={() => setFilter(k)} 
        class={cn(activeFilter() === k && "bg-secondary")}>
        {k}
      </Button>}
    </For>
  </div>

export default HistoryCardMapper
