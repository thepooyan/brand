"use server"

import { deleteFileFromS3 as del, listS3Files as list, uploadToS3 as up } from "."
import { isAdminLoggedIn } from "~/server/serverUtil"


export const getAllFiles = async () => {
  if (!await isAdminLoggedIn()) return null
  return await list()
}

export const deleteFileFromS3 = async (filename: string) => {
  if (!await isAdminLoggedIn()) return null
  return del(filename)
}

export const uploadFileToS3 = async (file:File) => {
  // if (!await isAdminLoggedIn()) return null
  // HAS TO BE RATE LIMITED FOR NORMAL USERS
  return up(file)
}
