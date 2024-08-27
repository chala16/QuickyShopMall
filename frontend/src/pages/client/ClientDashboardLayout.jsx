import React from "react";
import { Outlet } from 'react-router'

const ClientDashboardLayout = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default ClientDashboardLayout;
