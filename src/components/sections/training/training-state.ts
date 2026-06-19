import { eq } from "drizzle-orm";
import { createSignal } from "solid-js";
import { db } from "~/db/db";
import { chatbotTable, NewTrainingData, trainingDataTable } from "~/db/schema";
import { CustomError } from "~/lib/errorHandler";
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
      let bot = await ctx.query.chatbotTable.findFirst({
        where: (tbl => eq(tbl.id, bot_id)),
        with: {trainingData: true}
      })
      if (!bot) throw CustomError("ربات یافت نشد")
      if (bot.trainingData === null) {
        let [result] = await ctx.insert(trainingDataTable).values(data).returning()
        await ctx.update(chatbotTable).set({training_data_id: result.id})
        .where(eq(chatbotTable.id, bot_id))
      } else {
        await ctx.update(trainingDataTable).set(data).where(eq(trainingDataTable.id, bot.trainingData.id))
      }
    })
  )
}
