import { Outlet } from "react-router";
import { useState } from "react";
import AdminNavbar from "./Admin/AdminNavbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminLayout = () => {
  return (
    <div className="flex  h-screen w-full overflow-hidden">
      <ToastContainer position="top-center" autoClose={3000} />;
      <AdminNavbar />
      {/* Main Content */}
      <div className="scrollbar-hide flex-1 overflow-y-auto my-2 lg:mx-2">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
