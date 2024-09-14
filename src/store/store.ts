import { create } from "zustand";
import { customerData } from "@/utils/customerData";
import { account } from "@/appwrite/appwrite";

interface CustomerStore {
  data: any[];
  loading: boolean;
  error: string | null;
  loggedInUser?: any;
  userId?: string;
  userEmail?: string;
  checkUserSession: (router: any) => Promise<void>;
  fetchData: () => Promise<void>;
}

const useCustomerStore = create<CustomerStore>((set) => ({
  data: [],
  loading: false,
  error: null,

  checkUserSession: async (router: any) => {
    set({ loading: true });
    try {
      const user = await account.get();
      const { email, $id } = user; // Destructure email and user ID

      set({ loggedInUser: user, userEmail:  email, userId: $id }); // Store them in state
    } catch (error) {
      console.log("No active session found, redirecting to login");
      router.push("/");
    } finally {
      set({ loading: false });
    }
  },

  fetchData: async () => {
    set({ loading: true });
    try {
      const appWriteData = await customerData();
      set({ data: appWriteData, loading: false });
    } catch (error: any) {
      console.error("Error fetching data:", error);
      set({ error: error.message, loading: false });
    }
  },
}));

export default useCustomerStore;
