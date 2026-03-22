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

  const botsIds = new Set(data.map(i => i.botId))
  const botFilters: filterOptions<HistoryWithName> = {}
  botsIds.forEach(i => {
    botFilters[i] = (d:HistoryWithName) => d.botId === i
  })

  const botFilterHook = useFilter(timeFilterHook.filtered, botFilters)
  const {filtered} = botFilterHook


  return (
    <>
      <div class="grid grid-cols-2">
        <FilterSection name="زمان" fh={timeFilterHook}/>
        <FilterSection name="ربات" fh={botFilterHook}/>
      </div>

      <For each={filtered()}>
        {(b, idx) => <HistoryCard histroy={b} idx={idx}/>}
      </For>
    </>
  )
}

const FilterSection = ({name, fh: {allFilters, setFilter, activeFilter}}:{name: string, fh: filterHook}) => 
  <div class="my-4 mb-6 flex gap-1">
    <span class="text-sm center gap-1 text-muted-foreground ">
      <FiFilter/>
      فیلتر {name}:
    </span>
    <For each={Object.keys(allFilters)}>
      {k => <Button
        variant="outline" size="sm"
        onclick={() => setFilter(k)} 
        class={cn(activeFilter() === k && "bg-secondary")}>
        {k}
        {k === "" && "همه"}
      </Button>}
    </For>
  </div>

export default HistoryCardMapper
