"use server"

import { deleteFileFromS3, listS3Files,  } from "."
import { isAdminLoggedIn } from "~/server/serverUtil"


export const getAllFiles = async () => {
  if (!await isAdminLoggedIn()) return null
  return await listS3Files()
}

export const deleteFile = async (filename: string) => {
  if (!await isAdminLoggedIn()) return null
  return deleteFileFromS3(filename)
}
