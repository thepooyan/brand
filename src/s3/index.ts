import "@/lib/server-only"
import { S3Client } from "@aws-sdk/client-s3"
import { DeleteObjectCommand, ListObjectsV2Command } from "@aws-sdk/client-s3"
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

export async function listFiles(bucket: string, prefix?: string) {
  const files: string[] = []
  let continuationToken: string | undefined

  do {
    const res = await s3.send(
      new ListObjectsV2Command({
        Bucket: bucket,
        Prefix: prefix,
        ContinuationToken: continuationToken
      })
    )
    res.Contents?.forEach(obj => obj.Key && files.push(obj.Key))
    continuationToken = res.NextContinuationToken
  } while (continuationToken)

  return files.reverse()
}

export async function deleteFileFromS3(bucket: string, key: string) {
  const cmd = new DeleteObjectCommand({ Bucket: bucket, Key: key })
  await s3.send(cmd)
}
