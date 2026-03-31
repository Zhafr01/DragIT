import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

import LandingPage from '../pages/LandingPage';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';
import MaterialPage from '../pages/MaterialPage';
import GamePage from '../pages/GamePage';
import ProfilePage from '../pages/ProfilePage';
import EvaluasiPage from '../pages/EvaluasiPage';
import AdminPage from '../pages/AdminPage';
import ChapterPage from '../pages/ChapterPage';
import MotherboardGame from '../pages/MotherboardGame';
import AboutPage from '../pages/AboutPage';
import DesignDiagrams from '../pages/DesignDiagrams';

function ProtectedRoute({ children, allowedRoles }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
}

export default function AppRoutes() {
  const { user } = useAuth();
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={user ? <Navigate to="/dashboard" replace /> : <Login />} />
      <Route path="/register" element={user ? <Navigate to="/dashboard" replace /> : <Register />} />

      <Route path="/dashboard" element={
        <ProtectedRoute><Dashboard /></ProtectedRoute>
      } />
      <Route path="/dashboard/materi" element={
        <ProtectedRoute><MaterialPage /></ProtectedRoute>
      } />
      <Route path="/dashboard/materi/:slug" element={
        <ProtectedRoute><ChapterPage /></ProtectedRoute>
      } />
      <Route path="/dashboard/game" element={
        <ProtectedRoute><GamePage /></ProtectedRoute>
      } />
      <Route path="/dashboard/game/motherboard" element={
        <ProtectedRoute><MotherboardGame /></ProtectedRoute>
      } />
      <Route path="/dashboard/evaluasi" element={
        <ProtectedRoute><EvaluasiPage /></ProtectedRoute>
      } />
      <Route path="/dashboard/profil" element={
        <ProtectedRoute><ProfilePage /></ProtectedRoute>
      } />
      <Route path="/dashboard/about" element={
        <ProtectedRoute><AboutPage /></ProtectedRoute>
      } />
      <Route path="/dashboard/diagrams" element={
        <ProtectedRoute><DesignDiagrams /></ProtectedRoute>
      } />
      <Route path="/admin" element={
        <ProtectedRoute allowedRoles={['guru']}><AdminPage /></ProtectedRoute>
      } />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
