// LocationContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface UserLocationContextType {
  userLocation: string;
  setUserLocation: (newLocation: string) => void;
}

const UserLocationContext = createContext<UserLocationContextType | undefined>(
  undefined
);

export const UserLocationProvider = ({ children }: { children: ReactNode }) => {
  const [userLocation, setUserLocation] = useState<string>('');

  return (
    <UserLocationContext.Provider value={{ userLocation, setUserLocation }}>
      {children}
    </UserLocationContext.Provider>
  );
};

export const useUserLocation = (): UserLocationContextType => {
  const context = useContext(UserLocationContext);
  if (!context) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
};
