"use client";
import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { account } from "@/appwrite/appwrite";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CiUser } from "react-icons/ci";
import { CiViewTable } from "react-icons/ci";
import { CiLogout } from "react-icons/ci";
import Link from "next/link";

type SidebarProps = {
  loggedInUser: any;
};

const Sidebar: React.FC<SidebarProps> = ({ loggedInUser }) => {
  const router = useRouter();

  const logout = async () => {
    try {
      await account.deleteSession("current");
      toast.success("Successfully logged out!");
      router.push("/");
    } catch (error: any) {
      toast.error("Logout failed: " + error.message);
    }
  };
  return (
    <div className="border-x px-6 h-screen">
      <div className=" py-8">
        <h1 className="text-2xl text-center">Dashboard</h1>
      </div>
      <hr />
      <div className="flex flex-col justify-between pt-4 h-[450px]">
        <div className="flex flex-col gap-2">
          <Link
            href={"/tables"}
            className="flex items-center gap-4 text-lg capitalize"
          >
            <CiViewTable />
            Tables
          </Link>
          <Link
            href={"/profile"}
            className="flex items-center gap-4 text-lg capitalize"
          >
            <CiUser />
            Profile
          </Link>
        </div>
        <div className="w-full flex justify-center">
          <Button onClick={logout} className="w-full">
            <CiLogout className="mr-2" />
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
