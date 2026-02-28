import { S3Client } from "@aws-sdk/client-s3"
import { privateEnv } from "~/server/env/private-env"

export const s3 = new S3Client({
  endpoint: `https://${privateEnv.BUCKET_URL}`,
  region: "a",
  forcePathStyle: true,
  credentials: {
    accessKeyId: privateEnv.BUCKET_KEY,
    secretAccessKey: privateEnv.BUCKET_SECRET
  }
})

