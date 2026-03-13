"use server"

import { db } from "~/db/db"
import { isAdminLoggedIn } from "./serverUtil"
import { query, redirect } from "@solidjs/router"


const queryTicketsWithRelations = async () => await db.query.ticketTable.findMany({with: {user: true}})
export type TicketWithRelations = Awaited<ReturnType<typeof queryTicketsWithRelations>>[number]

export const getAllTickets = query(async () => {
  if (!await isAdminLoggedIn()) throw redirect("/Login")
  return await queryTicketsWithRelations()
}, "adminTickets")

