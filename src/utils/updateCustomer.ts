import { client } from "@/appwrite/appwrite";
import { Databases } from "appwrite";

const databases = new Databases(client);
const databaseId = process.env.NEXT_PUBLIC_DATABASE_ID as string;
const tableId = process.env.NEXT_PUBLIC_CUSTOMERS_TABLE_ID as string;

export const UpdateCustomer = async (
  Id: string,
  name: string,
  email: string,
  address: string
) => {
  try {
    const response = await databases.updateDocument(databaseId, tableId, Id, {
      name: name,
      email: email,
      address: address,
    });
    console.log(Id, name, email, address);
  } catch (error) {
    console.error("Error updating customer:", error);
  }
};
