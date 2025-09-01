import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faChevronDown,
  faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { useAuth } from '../context/AuthContext';
import { useUserLocation } from '../context/UserLocationContext';
import SearchModal from './modals/SearchModal';
import { toast } from 'react-toastify';

const LOCATIONS = ['Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Hyderabad'];

function Navbar() {
  const { user, logout } = useAuth();
  const { userLocation, setUserLocation } = useUserLocation();
  const [isOpen, setIsOpen] = useState(false);
  const isDisabled = true;

  const handleLogOut = () => {
    logout();
    toast.success('Logged out successfully!');
    console.log('User signed out');
  };

  const handleLocationSelect = (newLocation: string) => {
    setUserLocation(newLocation);
  };

  return (
    <nav className="leading-[2.5]">
      <header className="bg-white border-b border-gray-200">
        <div className=" py-3 flex items-center justify-around">
          {/* Brand */}
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ color: '#8A53FD' }}
              >
                <path d="M19 4H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Z" />
                <path d="M8 2v4" />
                <path d="M16 2v4" />
                <path d="M3 10h18" />
              </svg>
              <span className="text-xl font-bold">EventSpot</span>
            </Link>
          </div>

          {/* Search Button */}
          <div>
            <button
              onClick={() => setIsOpen(true)}
              className="flex items-center gap-2 bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700 transition"
            >
              <FontAwesomeIcon icon={faMagnifyingGlass} />
              Open Search
            </button>
            <SearchModal isOpen={isOpen} closeModal={() => setIsOpen(false)} />
          </div>

          {/* Nav Links */}
          <div className="flex gap-4">
            {['events', 'working', 'about', 'contact', 'faq'].map((path) => (
              <NavLink
                key={path}
                to={`/${path}`}
                onClick={(e) =>
                  isDisabled &&
                  ['working', 'about', 'faq'].includes(path) &&
                  e.preventDefault()
                }
                className={({ isActive }) =>
                  isActive
                    ? 'text-purple-600 font-semibold border-b-2 border-purple-600 cursor-pointer'
                    : 'text-gray-700 cursor-pointer'
                }
              >
                {path === 'events'
                  ? 'Browse Events'
                  : path === 'working'
                    ? 'How It Works'
                    : path === 'about'
                      ? 'About Us'
                      : path === 'faq'
                        ? 'FAQ'
                        : 'Contact Us'}
              </NavLink>
            ))}
          </div>

          {/* Location Dropdown */}
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <button className="inline-flex max-w-[10%] justify-center w-full rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200">
                {userLocation || 'Select City'}
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className="ml-2 text-xs"
                />
              </button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content
              sideOffset={8}
              className="mt-2 w-40 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none flex flex-col z-50"
            >
              {LOCATIONS.map((loc) => (
                <DropdownMenu.Item
                  key={loc}
                  onSelect={() => handleLocationSelect(loc)}
                  className={`text-left px-4 py-2 text-sm cursor-pointer ${
                    userLocation === loc
                      ? 'bg-gray-200 font-semibold'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  {loc}
                </DropdownMenu.Item>
              ))}
            </DropdownMenu.Content>
          </DropdownMenu.Root>

          {/* Profile Dropdown */}
          <div className="flex gap-4">
            {user && (
              <span className="text-gray-600">{user.email.split('@')[0]}</span>
            )}
            <DropdownMenu.Root>
              <DropdownMenu.Trigger asChild>
                <button className="hover:text-gray-900 cursor-pointer outline-0">
                  <FontAwesomeIcon icon={faUser} className="text-3xl" />
                </button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content
                align="end"
                sideOffset={8}
                className="w-30 bg-[#4a5565] mt-2 z-50 origin-top-right rounded-xl flex flex-col gap-2 p-3 border border-white/5 text-white transition duration-100 ease-out focus:outline-none"
              >
                {user ? (
                  <>
                    {user.role === 'organiser' && (
                      <DropdownMenu.Item asChild>
                        <Link
                          to="/dashboard/home"
                          className="p-2 rounded hover:bg-gray-700"
                        >
                          Dashboard
                        </Link>
                      </DropdownMenu.Item>
                    )}
                    <DropdownMenu.Item asChild>
                      <Link
                        to="/profile/user"
                        className="p-2 rounded text-left w-full hover:bg-gray-700 hover:underline"
                      >
                        Profile
                      </Link>
                    </DropdownMenu.Item>
                    <DropdownMenu.Item
                      onSelect={handleLogOut}
                      className="p-2 rounded text-left w-full hover:bg-gray-700 hover:underline cursor-pointer"
                    >
                      Log Out
                    </DropdownMenu.Item>
                  </>
                ) : (
                  <>
                    <DropdownMenu.Item asChild>
                      <Link
                        to="/login"
                        className="p-2 rounded hover:bg-gray-700 hover:underline"
                      >
                        Login
                      </Link>
                    </DropdownMenu.Item>
                    <DropdownMenu.Item asChild>
                      <Link
                        to="/signUp"
                        className="p-2 rounded hover:bg-gray-700 hover:underline"
                      >
                        Sign Up
                      </Link>
                    </DropdownMenu.Item>
                  </>
                )}
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          </div>
        </div>
      </header>
    </nav>
  );
}

export default Navbar;
