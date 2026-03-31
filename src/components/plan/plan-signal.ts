import { createSignal } from "solid-js";
import { PlanDefinition } from "~/sections/plan";

export const [selectedPlan, setSelectedPlan] = createSignal<PlanDefinition | null>(null)
export const [selectedMounth, setSelectedMounth] = createSignal(1)
