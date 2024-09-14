import { client } from "@/appwrite/appwrite";
import { Databases } from "appwrite";

const databases = new Databases(client);

const databaseId = process.env.NEXT_PUBLIC_DATABASE_ID as string;
const tableId = process.env.NEXT_PUBLIC_CUSTOMERS_TABLE_ID as string;

// Function to add a new guest to the database
export const DeleteCustomer = async (id: string) => {
  try {
    const response = await databases.deleteDocument(databaseId, tableId, id);
  } catch (error: any) {
    console.error("Error deleting customer", error.message);
  }
};
