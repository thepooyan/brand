import { PutObjectCommand } from "@aws-sdk/client-s3"
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

const s3Prefix = "Hooshban"

export async function listS3Files() {
  const files: string[] = []
  let continuationToken: string | undefined

  do {
    const res = await s3.send(
      new ListObjectsV2Command({
        Bucket: privateEnv.BUCKET_NAME,
        Prefix: s3Prefix,
        ContinuationToken: continuationToken
      })
    )
    res.Contents?.forEach(obj => obj.Key && files.push(obj.Key))
    continuationToken = res.NextContinuationToken
  } while (continuationToken)

  return files.reverse()
}

export async function deleteFileFromS3(filename: string) {
  const cmd = new DeleteObjectCommand({ Bucket: privateEnv.BUCKET_NAME, Key: filename })
  await s3.send(cmd)
}

export async function uploadToS3(file: File) {
  const arrayBuffer = await file.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)

  const key = `${s3Prefix}/${Date.now()}-${file.name}`

  await s3.send(new PutObjectCommand({
    Bucket: privateEnv.BUCKET_NAME!,
    Key: key,
    Body: buffer,
    ContentType: file.type,
  }))

  return `https://${privateEnv.BUCKET_URL}/${key}`
}
