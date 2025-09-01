import { AuthProvider } from './context/AuthContext';
import { BrowserRouter } from 'react-router-dom';
import MainRoute from './routes/MainRoute';
import { UserLocationProvider } from './context/UserLocationContext';
import React from 'react';
import NavigationSetter from './routes/NavigationSetter';
import { EventProvider } from './context/EventContext';
import { EventFormProvider } from './context/EventFormContext';
function App() {
  return (
    <AuthProvider>
      <UserLocationProvider>
        <EventProvider>
          <BrowserRouter>
            <EventFormProvider>
              <NavigationSetter />
              <MainRoute />
            </EventFormProvider>
          </BrowserRouter>
        </EventProvider>
      </UserLocationProvider>
    </AuthProvider>
  );
}

export default App;
