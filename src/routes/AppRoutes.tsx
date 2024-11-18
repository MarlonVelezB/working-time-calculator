// src/AppRoutes.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage, NotFoundPage, LoginPage, RegisterPage, HoursCalculatorPage } from '../pages';

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Rutas principales */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/calculator" element={<HoursCalculatorPage />} />

        {/* Redireccionar rutas no encontradas */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
