import React from 'react';
import { Outlet } from 'react-router-dom';

function FullLayout() {
  return (
    <div className="full-layout">
      <Outlet />
    </div>
  );
}

export default FullLayout;
