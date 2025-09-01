import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Role } from '../utils/types/user_types';
import React from 'react';

interface ProtectedRouteProps {
  allowedRoles: Role[];
}

const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;
  if (user.role === undefined || !allowedRoles.includes(user.role))
    return <Navigate to="/" replace />;

  return <Outlet />;
};

export default ProtectedRoute;
