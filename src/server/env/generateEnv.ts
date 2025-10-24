import fs from "fs"
import { envSchema } from "./envSchema";

const keys = Object.entries(envSchema.shape).map(([k]) => k)
const args = process.argv
const fileName = args[2] || "example.env";
let content = keys.map(k => `${k}=""`).join("\n")
fs.writeFileSync(fileName, content, "utf-8")
