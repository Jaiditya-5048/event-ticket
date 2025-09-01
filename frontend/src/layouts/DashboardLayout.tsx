import { Outlet } from 'react-router-dom';

import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import React from 'react';
import { ToastContainer } from 'react-toastify';

const DashboardLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex flex-1">
        <Sidebar />
        <ToastContainer position='bottom-right' autoClose={5000} />

        <main className="dashboard-content w-full overflow-y-scroll h-[calc(97vh-2.6rem)]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
