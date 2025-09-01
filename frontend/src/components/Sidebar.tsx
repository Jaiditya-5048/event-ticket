import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import React from 'react';

function Sidebar() {
  const { user } = useAuth();

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `block px-4 py-2 rounded-md font-medium ${
      isActive ? 'bg-gray-100 text-blue-600' : 'text-gray-700 hover:bg-gray-100'
    }`;

  return (
    <aside className="w-64 bg-white border-r border-gray-200 hidden md:block">
      <nav className="p-4 space-y-1">
        {/* Organiser-specific links */}
        {user?.role === 'organiser' && (
          <>
            <NavLink to="/dashboard/home" className={navLinkClass}>
              Dashboard
            </NavLink>
            <NavLink to="/dashboard/events" className={navLinkClass}>
              Events
            </NavLink>
            <NavLink to="/dashboard/new-event" className={navLinkClass}>
              Create Event
            </NavLink>
            <NavLink to="/dashboard/tickets" className={navLinkClass}>
              Tickets
            </NavLink>
            <NavLink to="/dashboard/settings" className={navLinkClass}>
              Settings
            </NavLink>
            <hr />
          </>
        )}

        {/* Common user links */}
        <NavLink to="/profile/user" className={navLinkClass}>
          User Info
        </NavLink>
        <NavLink to="/profile/bookings" className={navLinkClass}>
          Bookings
        </NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;
