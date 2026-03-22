import { createEffect, For } from "solid-js"
import HistoryCard, { HistoryWithName } from "./history-card"
import { FiFilter } from "solid-icons/fi"
import { filterOptions, useFilter } from "~/lib/hooks"
import { Button } from "../ui/button"
import { cn, filterLastMonth, filterLastWeek, filterOlderThanLastMonth, filterToday } from "~/lib/utils"

interface p {
  data: HistoryWithName[]
}
const HistoryCardMapper = ({data}:p) => {

  const timeFilters:filterOptions<HistoryWithName> = {
    "همه": () => true,
    "امروز": (d:HistoryWithName) => filterToday(d.messages.at(-1)?.timestamp),
    "هفته گذشته": (d:HistoryWithName) => filterLastWeek(d.messages.at(-1)?.timestamp),
    "ماه گذشته": (d:HistoryWithName) => filterLastMonth(d.messages.at(-1)?.timestamp),
    "قدیمی تر": (d:HistoryWithName) => filterOlderThanLastMonth(d.messages.at(-1)?.timestamp),
  }
  const {filtered, setFilter, activeFilter} = useFilter(data, timeFilters)

  const botsIds = new Set(data.map(i => i.botId))

  const botFilters: filterOptions<HistoryWithName> = {}

  botsIds.forEach(i => {
    botFilters[i] = (d:HistoryWithName) => d.botId === i
  })

  const {filtered: filtered2, setFilter: setBotFilter, activeFilter: activeBotFilter} = useFilter(filtered(), botFilters)


  return (
    <>
      <div class="my-4 mb-6 flex gap-1">
        <span class="text-sm center gap-1 text-muted-foreground ">
          <FiFilter/>
          فیلتر زمان:
        </span>
        <For each={Object.keys(timeFilters)}>
          {k => <Button
            variant="outline" size="sm"
            onclick={() => setFilter(k)} 
            class={cn(activeFilter() === k && "bg-secondary")}>
            {k}
          </Button>}
        </For>
      </div>

      <div class="my-4 mb-6 flex gap-1">
        <span class="text-sm center gap-1 text-muted-foreground ">
          <FiFilter/>
          فیلتر بات:
        </span>
        <For each={Object.keys(botFilters)}>
          {k => <Button
            variant="outline" size="sm"
            onclick={() => setBotFilter(k)} 
            class={cn(activeBotFilter() === k && "bg-secondary")}>
            {k}
          </Button>}
        </For>
      </div>

      <For each={filtered2()}>
        {(b, idx) => <HistoryCard histroy={b} idx={idx}/>}
      </For>
    </>
  )
}

export default HistoryCardMapper
