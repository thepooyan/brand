import { Client, Account } from 'appwrite';

export const client = new Client();

client
    .setEndpoint('https://fra.cloud.appwrite.io/v1')
    .setProject("68501ba5003a587ac9e8"); 

export const account = new Account(client);
export { ID } from 'appwrite';

