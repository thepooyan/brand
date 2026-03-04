"use server"

import { privateEnv } from "~/server/env/private-env"
import { deleteFileFromS3, listFiles } from "."


export const getAllFiles = async () => {
  return await listFiles(privateEnv.BUCKET_NAME, "hooshbaan")
}

export const deleteFile = async (file: string) => {
  return deleteFileFromS3(privateEnv.BUCKET_NAME, file)
}
