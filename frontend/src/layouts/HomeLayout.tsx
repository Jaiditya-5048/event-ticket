import React from 'react';
import Navbar from '../components/Navbar';
import { Link, Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

function HomeLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
        <ToastContainer position='bottom-right' autoClose={5000} />
      <div className="flex flex-1">
        <main className="dashboard-content w-full overflow-y-scroll h-[calc(97vh-2.6rem)]">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default HomeLayout;
