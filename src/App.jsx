import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EmployeeDashboard from './components/Employee/EmployeeDashboard';
import AdminDashboard from './components/Admin/AdminDashboard';
import Login from './components/Authentication/Login';
import Register from './components/Authentication/SignUp';
import Navbar from './components/FixedComponents/Navbar';
import './App.css'; // Your custom styles
import ProjectDetailPage from './components/Admin/ProjectDetailPage';

const App = () => {

  return (
    <Router>
      <div className="app-container">
       <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected routes for authenticated users */}
            <Route
              path="/employee-dashboard"
              element={
                // <ProtectedRoute role="employee" isAuthenticated={isAuthenticated}>
                  <EmployeeDashboard />
                // </ProtectedRoute>
              }
            />
            <Route
              path="/admin-dashboard"
              element={
                // <ProtectedRoute role="admin" isAuthenticated={isAuthenticated}>
                  <AdminDashboard />
                // </ProtectedRoute>
              }
            />
            <Route
              path="/project-details"
              element={
                // <ProtectedRoute role="admin" isAuthenticated={isAuthenticated}>
                  <ProjectDetailPage />
                // </ProtectedRoute>
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
