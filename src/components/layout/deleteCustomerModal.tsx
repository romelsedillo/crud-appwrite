"use client";

import { FormEvent } from "react"; // Import FormEvent for form handling
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogDescription,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "react-hot-toast";
import { DeleteCustomer } from "@/utils/deleteCustomer";
import useCustomerStore from "@/store/store";

// Define the props interface
interface DeleteCustomerModalProps {
  Id: string; // Specify the type of Id
}

export function DeleteCustomerModal({ Id }: DeleteCustomerModalProps) {
  const fetchData = useCustomerStore((state) => state.fetchData);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    toast
      .promise(
        DeleteCustomer(Id), // Call the DeleteCustomer function with the ID
        {
          loading: "Deleting customer...",
          success: "Customer deleted successfully!",
          error: "Failed to delete customer!",
        }
      )
      .then(() => {
        fetchData(); // Refresh the data after the deletion is successful
      })
      .catch((error) => {
        console.error("Error during deletion:", error);
      });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"ghost"} className="w-full font-thin text-red-500">
          Delete
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-red-500">
            Are you absolutely sure?
          </DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete the data.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline" size="sm">
                Cancel
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button
                className="text-red-500"
                type="submit"
                variant="outline"
                size="sm"
              >
                Continue
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
