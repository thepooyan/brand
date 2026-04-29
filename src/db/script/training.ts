import { db } from "../db";
import { trainingDataTable } from "../schema";

let data:typeof trainingDataTable.$inferInsert = {
  tone: "",
  social: [],
  address: "",
  language: "",
  useEmojies: true,
  trainingText: "",
  contactNumber: [],
  maxResponseLength: ""
}
await db.insert(trainingDataTable).values(data)
