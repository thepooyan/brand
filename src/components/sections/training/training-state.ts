import { createSignal } from "solid-js";
import { crawlTree } from "~/server/crawler";

export type train_stage = "choose" | "manual" | "auto" | "" | "tree"

export const [training_state, set_training_state] = createSignal<train_stage>("")
export const [tree, setTree] = createSignal<crawlTree>([])
