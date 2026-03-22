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
  createEffect(() => console.log(activeFilter() === ""))
  return (
    <>
      <div class="my-4 mb-6 flex gap-1">
        <span class="text-sm center gap-1 text-muted-foreground ">
          <FiFilter/>
          فیلتر:
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
      <For each={filtered()}>
        {(b, idx) => <HistoryCard histroy={b} idx={idx}/>}
      </For>
    </>
  )
}

export default HistoryCardMapper
