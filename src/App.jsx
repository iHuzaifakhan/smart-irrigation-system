import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { IrrigationProvider } from './context/IrrigationContext';

// Pages
import LandingPage from './pages/LandingPage';
import DashboardLayout from './components/DashboardLayout';
import OverviewPage from './pages/dashboard/OverviewPage';
import FieldMonitoringPage from './pages/dashboard/FieldMonitoringPage';
import IrrigationControlPage from './pages/dashboard/IrrigationControlPage';
import AIInsightsPage from './pages/dashboard/AIInsightsPage';
import WaterAnalyticsPage from './pages/dashboard/WaterAnalyticsPage';
import SettingsPage from './pages/dashboard/SettingsPage';

export default function App() {
  return (
    <IrrigationProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Landing Page */}
          <Route path="/" element={<LandingPage />} />

          {/* Interactive Agricultural Management Dashboard */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<OverviewPage />} />
            <Route path="fields" element={<FieldMonitoringPage />} />
            <Route path="controls" element={<IrrigationControlPage />} />
            <Route path="ai-insights" element={<AIInsightsPage />} />
            <Route path="water-analytics" element={<WaterAnalyticsPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>

          {/* Fallback to Landing Page */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </IrrigationProvider>
  );
}
