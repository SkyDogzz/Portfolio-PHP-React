import { useEffect } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import DashboardHeader from "./dashboard/DashboardHeader";

export default function Dashboard() {
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            window.location.href = '/login';
        }
    }, []);

    return (
      <div>
          <DashboardHeader />
          <Outlet />
      </div>
    );
}