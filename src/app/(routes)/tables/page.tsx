"use client";

import React, { useEffect } from "react";
import DataTable from "@/components/table/dataTable";
import Sidebar from "@/components/layout/sidebar";
import { ModeToggle } from "@/components/layout/modeToggle";
import { useRouter } from "next/navigation";
import useCustomerStore from "@/store/store";

const TablePage: React.FC = () => {
  const router = useRouter();

  const { loggedInUser, data, checkUserSession, fetchData } =
    useCustomerStore();

  useEffect(() => {
    checkUserSession(router);
    fetchData();
  }, [checkUserSession, fetchData, router]);

  return (
    <div className="grid grid-cols-12">
      <div className="col-span-2">
        <Sidebar loggedInUser={loggedInUser} />
      </div>
      <div className="col-span-10 py-1">
        <div className="w-full px-3 py-1 flex items-center justify-between border-b">
          <h1 className="text-2xl ml-4 mt-2">Customer Table</h1>
          <h1>Hello, {loggedInUser?.name}</h1>
          <ModeToggle />
        </div>
        <DataTable data={data} />
      </div>
    </div>
  );
};

export default TablePage;
