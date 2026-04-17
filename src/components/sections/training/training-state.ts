import { eq } from "drizzle-orm";
import { createSignal } from "solid-js";
import { db } from "~/db/db";
import { chatbotTable, NewTrainingData, trainingDataTable } from "~/db/schema";
import { safeDbTransaction } from "~/lib/utils";
import { useViewTransition } from "~/lib/viewTransition";
import { crawlTree } from "~/server/crawler";

export type train_stage = "choose" | "auto" | "" | "tree" | "form" | "loading"

export const [training_state, set_training_state, mark_training_page] = useViewTransition<train_stage>("training", "loading")

export const [tree, setTree] = createSignal<crawlTree>([])

export const saveTrainingData = (data:NewTrainingData, bot_id:number) => {
  "use server"
  return safeDbTransaction(
    db.transaction(async ctx => {
      let [result] = await ctx.insert(trainingDataTable).values(data).returning()
      await ctx.update(chatbotTable).set({training_data_id: result.id})
      .where(eq(chatbotTable.id, bot_id))
    })
  )
}
