import React, { createContext, useContext, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-toastify';

interface Token {
  email: string;
  exp: number;
  iat: number;
  role: 'admin' | 'user' | 'organiser';
  user_id: number;
}
interface AuthContextType {
  user: Token | null;
  loginContext: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

let externalLogout: (() => void) | null = null;
export const getExternalLogout = () => externalLogout;

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<Token | null>(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        return jwtDecode<Token>(token); // Decode before first render
      } catch (err) {
        console.error('Invalid token', err);
        localStorage.removeItem('token');
      }
    }
    return null;
  });

  const loginContext = (token: string) => {
    localStorage.setItem('token', token);
    const decoded = jwtDecode<Token>(token);
    console.log('decoded', decoded);
    setUser(decoded);
    toast.success('Logged in successfully!');
  };

  const logout = () => {
    localStorage.removeItem('token'); // Clear localStorage
    setUser(null);    
  };

  externalLogout = logout;

  return (
    <AuthContext.Provider value={{ user, loginContext, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
