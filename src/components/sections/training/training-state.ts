import { createSignal } from "solid-js";
import { useViewTransition } from "~/lib/viewTransition";
import { crawlTree } from "~/server/crawler";

export type train_stage = "choose" | "auto" | "" | "tree" | "form" | "loading"

export const [training_state, set_training_state, mark_training_page] = useViewTransition<train_stage>("training", "loading")

export const [tree, setTree] = createSignal<crawlTree>([])
