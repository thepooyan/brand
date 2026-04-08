import { db } from "../db";
import { trainingDataTable } from "../schema";

let data:typeof trainingDataTable.$inferInsert = {
  businessName: "هوشبان",
  tone: "",
  social: [],
  address: "",
  language: "",
  useEmojies: true,
  websiteUrl: "",
  trainingText: "",
  contactNumber: [],
  maxResponseLength: ""
}
await db.insert(trainingDataTable).values(data)
