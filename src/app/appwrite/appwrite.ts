import { Client, Account, OAuthProvider, Storage } from "appwrite";

const appwriteEndpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string;
const projectId = process.env.NEXT_PUBLIC_PROJECT_ID as string;

export const client = new Client();

client.setEndpoint(appwriteEndpoint).setProject(projectId);

export const account = new Account(client);
export { ID } from "appwrite";
export { OAuthProvider } from "appwrite";
export {Storage} from "appwrite";
