"use client";

import { useState } from "react";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "react-hot-toast";
import { UpdateCustomer } from "@/utils/updateCustomer";
import useCustomerStore from "@/store/store";

// Define the types for the props
interface UpdateCustomerModalProps {
  Id: string;
  Name: string;
  Email: string;
  Address: string;
}

export function UpdateCustomerModal({
  Id,
  Name,
  Email,
  Address,
}: UpdateCustomerModalProps) {
  const [name, setName] = useState<string>(Name);
  const [email, setEmail] = useState<string>(Email);
  const [address, setAddress] = useState<string>(Address);

  const fetchData = useCustomerStore((state) => state.fetchData);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    toast
      .promise(
        UpdateCustomer(Id, name, email, address)
          .then(() => {
            fetchData();
          })
          .catch((error: any) => {
            console.error("Error updating customer:", error);
          }),
        {
          loading: "Saving...",
          success: <b>Customer updated!</b>,
          error: <b>Failed to update customer!</b>,
        }
      )
      .then(() => {
        fetchData();
      });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"ghost"} className="w-full font-thin">
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit customer details</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="address" className="text-right">
                Address
              </Label>
              <Input
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="submit">Save</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
