import React from "react";
import AdminNavbar from "./AdminNavbar";
import { Outlet } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="flex max-w-[1600px] w-full h-screen border">
      <AdminNavbar />
      
      <div className="overflow-y-scroll scrollbar-hide h-screen flex-1  relative m-4 ">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;
