import { client } from "@/appwrite/appwrite";
import { ID, Databases } from "appwrite";

const databases = new Databases(client);

const databaseId = process.env.NEXT_PUBLIC_DATABASE_ID as string;
const tableId = process.env.NEXT_PUBLIC_CUSTOMERS_TABLE_ID as string;

export const AddCustomer = async (
  name: string,
  email: string,
  address: string
) => {
  try {
    const response = await databases.createDocument(
      databaseId,
      tableId,
      ID.unique(),
      {
        name: name,
        email: email,
        address: address,
      }
    );
  } catch (error: any) {
    console.error("Error adding customer", error.message);
  }
};
