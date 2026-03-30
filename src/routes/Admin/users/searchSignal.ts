import { createSignal } from "solid-js";

export type Search = {str: string, type: "name" | "number"}
export const [search, setSearch] = createSignal<Search>({str: "", type: "name"})
