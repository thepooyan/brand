import { createSignal } from "solid-js";

export type train_stage = "choose" | "manual" | "auto" | ""

export const [training_state, set_training_state] = createSignal<train_stage>("")
