import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Landing from "@/pages/Landing";
import Features from "@/pages/Features";
import Platforms from "@/pages/Platforms";
import Contact from "@/pages/Contact";
import Help from "@/pages/Help";
import Privacy from "@/pages/Privacy";
import Terms from "@/pages/Terms";
import Cookies from "@/pages/Cookies";
import ActivateAccount from "@/pages/ActivateAccount";
import ResetPassword from "@/pages/ResetPassword";
import ConfirmDeleteRequest from "@/pages/ConfirmDeleteRequest";
import CancelDeleteRequest from "@/pages/CancelDeleteRequest";
import DeleteAccount from "@/pages/DeleteAccount";
import Bases from "@/pages/Bases";
import UserDashboard from "@/pages/UserDashboard";
import AdminDashboard from "@/pages/AdminDashboard";
import ProtectedRoute from "@/routes/ProtectedRoute";
import Auth from "@/pages/Auth";
import ForgotPassword from "@/pages/ForgotPassword";
import AdminDashboardDemo from "@/pages/AdminDashboardDemo";


export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/features" element={<Features />} />
        <Route path="/platforms" element={<Platforms />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/help" element={<Help />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/cookies" element={<Cookies />} />

        <Route path="/activate" element={<ActivateAccount />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/login" element={<Auth initialTab="login" />} />
        <Route path="/register" element={<Auth initialTab="register" />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route path="/account/delete-request/confirm/:token" element={<ConfirmDeleteRequest />} />
        <Route path="/account/delete-request/cancel/:token" element={<CancelDeleteRequest />} />

        <Route path="/delete-account" element={<DeleteAccount />} />
        <Route path="/bases" element={<Bases />} />

        <Route path="/user" element={
          <ProtectedRoute>
            <UserDashboard />
          </ProtectedRoute>
        } />

        <Route path="/admin" element={
          <ProtectedRoute adminOnly>
            <AdminDashboard />
          </ProtectedRoute>
        } />

        <Route path="/admin-demo" element={<AdminDashboardDemo />} />


        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
