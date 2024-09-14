import { Client, Databases } from "appwrite";

// Define the type for the customer data
interface Customer {
  id: string;
  name: string;
  email: string;
  address: string;
}


const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string;
const projectId = process.env.NEXT_PUBLIC_PROJECT_ID as string;
const databaseId = process.env.NEXT_PUBLIC_DATABASE_ID as string;
const tableId = process.env.NEXT_PUBLIC_CUSTOMERS_TABLE_ID as string;

// Function to fetch data from Appwrite
export const customerData = async (): Promise<Customer[]> => {
  try {
    const client = new Client().setEndpoint(endpoint).setProject(projectId);
    const databases = new Databases(client);

    const response = await databases.listDocuments(databaseId, tableId);

    const data = response.documents.map((doc: any) => ({
      id: doc.$id,
      name: doc.name,
      email: doc.email,
      address: doc.address,
    }));

    data.reverse(); // Optionally reverse the data
    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error fetching data from Appwrite:", error.message);
    } else {
      console.error("Unknown error fetching data from Appwrite");
    }
    return [];
  }
};
