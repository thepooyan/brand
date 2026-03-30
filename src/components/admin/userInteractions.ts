"use server"

import { eq } from "drizzle-orm"
import { db } from "~/db/db"
import { adminsTable, NewAdminData, usersTable } from "~/db/schema"
import { safeDbTransaction } from "~/lib/utils"

export const deleteUser = (user_id: number) => {
  return safeDbTransaction(
    db.delete(usersTable).where(eq(usersTable.id, user_id))
  )
}
export const blockUser = (user_id: number) => {
  return safeDbTransaction(
    db.update(usersTable).set({isBlocked: "1"}).where(eq(usersTable.id, user_id))
  )
}
export const unblockUser = (user_id: number) => {
  return safeDbTransaction(
    db.update(usersTable).set({isBlocked: "0"}).where(eq(usersTable.id, user_id))
  )
}
export const promoteUser = (newAdmin: NewAdminData) => {
  return safeDbTransaction(
    db.insert(adminsTable).values(newAdmin)
  )
}
export const demoteUser = (admin_id: number) => {
  return safeDbTransaction(
    db.delete(adminsTable).where(eq(adminsTable.id, admin_id))
  )
}
