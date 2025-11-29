import { S3Client } from "@aws-sdk/client-s3"
import {  getEnv } from "~/server/env"

export const s3 = new S3Client({
  endpoint: `https://${getEnv().BUCKET_URL}`,
  region: "a",
  forcePathStyle: true,
  credentials: {
    accessKeyId: getEnv().BUCKET_KEY,
    secretAccessKey: getEnv().BUCKET_SECRET
  }
})

