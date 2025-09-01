import { Routes, Route, Navigate } from 'react-router-dom';
import React from 'react';
import HomeLayout from '../layouts/HomeLayout';
import Home from '../pages/user/Home';
import UserEvents from '../pages/user/UserEvents';
import Working from '../pages/user/Working';
import AboutUs from '../pages/user/AboutUs';
import ContactUs from '../pages/user/ContactUs';
import Faq from '../pages/user/Faq';
import EventDetails from '../pages/user/EventDetails';
import Login from '../pages/auth/Login';
import SignUp from '../pages/auth/SignUp';
import PublicOnlyRoute from './PublicOnlyRoute';
import ProtectedRoute from './ProtectedRoute';
import ProfileLayout from '../layouts/ProfileLayout';
import PersonalInfo from '../pages/profile/PersonalInfo';
import Bookings from '../pages/profile/Bookings';
import DashboardLayout from '../layouts/ProfileLayout';
import NewEvent from '@/pages/organiser/NewEvent';
import Tickets from '@/pages/organiser/Tickets';
import Settings from '@/pages/organiser/Settings';
import Events from '../pages/organiser/Events';
import Dashboard from '../pages/organiser/Dashboard';
import CreateEvent from '@/pages/organiser/CreateEvent';
import EventDetailsOrganiser from '@/pages/organiser/EventDetails';



const MainRoute = () => {
  return (
    <Routes>
      {/* Public routes with layout */}
      <Route element={<HomeLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<UserEvents />} />
        <Route path="/working" element={<Working />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/event/:id" element={<EventDetails />} />

        <Route element={<PublicOnlyRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Route>
      </Route>

      {/* user routes with layout */}
      <Route element={<ProtectedRoute allowedRoles={['user', 'organiser']} />}>
        <Route element={<ProfileLayout />}>
          <Route path="/profile/user" element={<PersonalInfo />} />
          <Route path="/profile/bookings" element={<Bookings />} />
        </Route>
      </Route>

      {/* Dashboard routes for organisers */}
      <Route element={<ProtectedRoute allowedRoles={['organiser']} />}>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard/home" element={<Dashboard />} />
          <Route path="/dashboard/events" element={<Events />} />
          <Route path="/dashboard/new-event" element={<CreateEvent />} />
          <Route
            path="/dashboard/events/:id"
            element={<EventDetailsOrganiser />}
          />

          {/* <Route path="/dashboard/events/newai" element={<NewEvent />} /> */}
          <Route path="/dashboard/tickets" element={<Tickets />} />
          <Route path="/dashboard/settings" element={<Settings />} />
        </Route>
      </Route>

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default MainRoute;
