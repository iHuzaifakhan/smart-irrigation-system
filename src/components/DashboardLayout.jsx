import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, useLocation, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  Sprout,
  Sliders,
  Sparkles,
  BarChart3,
  Settings,
  Bell,
  Droplets,
  Menu,
  X,
  ChevronRight,
  ShieldCheck,
  Radio,
  Power,
  RotateCcw,
  ExternalLink,
  Check
} from 'lucide-react';
import { useIrrigation } from '../context/IrrigationContext';
import ToastContainer from './ToastContainer';
import FieldDetailModal from './FieldDetailModal';

export default function DashboardLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const location = useLocation();

  const {
    systemMode,
    setSystemMode,
    activeSprinklersCount,
    totalFields,
    notifications,
    markAllNotificationsRead,
    clearNotifications,
    simulationActive,
    setSimulationActive
  } = useIrrigation();

  // Clock ticker
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Close mobile sidebar on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navItems = [
    { name: 'Overview', path: '/dashboard', icon: LayoutDashboard, exact: true },
    { name: 'Field Monitoring', path: '/dashboard/fields', icon: Sprout },
    { name: 'Irrigation Control', path: '/dashboard/controls', icon: Sliders },
    { name: 'AI Insights', path: '/dashboard/ai-insights', icon: Sparkles },
    { name: 'Water Analytics', path: '/dashboard/water-analytics', icon: BarChart3 },
    { name: 'Settings', path: '/dashboard/settings', icon: Settings },
  ];

  const getPageTitle = () => {
    const p = location.pathname;
    if (p === '/dashboard') return 'Farm Operations Overview';
    if (p.includes('/fields')) return 'Field Telemetry & Monitoring';
    if (p.includes('/controls')) return 'Sprinkler & Valve Management';
    if (p.includes('/ai-insights')) return 'AI-Assisted Agronomic Insights';
    if (p.includes('/water-analytics')) return 'Water Consumption Analytics';
    if (p.includes('/settings')) return 'System Settings & Preferences';
    return 'Smart Irrigation Management';
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col lg:flex-row antialiased">
      {/* Mobile Header Bar */}
      <header className="lg:hidden bg-slate-900 text-white px-4 py-3 flex items-center justify-between sticky top-0 z-40 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-600 flex items-center justify-center text-white">
              <Droplets className="w-4 h-4" />
            </div>
            <span className="font-bold text-sm tracking-tight">SmartIrrigation</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="relative p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            )}
          </button>
          <Link
            to="/"
            className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 px-2.5 py-1.5 rounded-md border border-slate-700 transition-colors"
          >
            Landing Page
          </Link>
        </div>
      </header>

      {/* Sidebar for Desktop & Mobile Overlay */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-slate-300 flex flex-col border-r border-slate-800 transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:h-screen lg:sticky lg:top-0 ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand / Logo */}
        <div className="p-5 border-b border-slate-800/80 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-md shadow-emerald-900/30 group-hover:scale-105 transition-transform">
              <Droplets className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-base text-white tracking-tight flex items-center gap-1.5">
                SmartIrrigation
              </div>
              <div className="text-[10px] text-emerald-400 font-medium uppercase tracking-wider">
                Digital Sandbox
              </div>
            </div>
          </Link>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="lg:hidden text-slate-400 hover:text-white p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* System Mode Switcher in Sidebar */}
        <div className="px-4 py-3 border-b border-slate-800/80 bg-slate-950/40">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              System Control Mode
            </span>
            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded uppercase ${systemMode === 'automatic' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-amber-950 text-amber-400 border border-amber-800'}`}>
              {systemMode === 'automatic' ? 'AI Auto' : 'Manual'}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-1 p-1 bg-slate-900 rounded-lg border border-slate-800">
            <button
              onClick={() => setSystemMode('automatic')}
              className={`py-1 text-xs font-semibold rounded transition-all ${
                systemMode === 'automatic'
                  ? 'bg-emerald-600 text-white shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Automatic
            </button>
            <button
              onClick={() => setSystemMode('manual')}
              className={`py-1 text-xs font-semibold rounded transition-all ${
                systemMode === 'manual'
                  ? 'bg-amber-600 text-white shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Manual
            </button>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.exact
              ? location.pathname === item.path
              : location.pathname.startsWith(item.path);

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive: active }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    (item.exact ? location.pathname === item.path : active)
                      ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-950/40'
                      : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
                  }`
                }
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span className="flex-1">{item.name}</span>
                {item.name === 'Field Monitoring' && (
                  <span className="text-[10px] bg-slate-800 px-1.5 py-0.5 rounded text-slate-300 font-mono">
                    {totalFields}
                  </span>
                )}
                {item.name === 'Irrigation Control' && activeSprinklersCount > 0 && (
                  <span className="text-[10px] bg-emerald-500 text-white px-1.5 py-0.5 rounded font-mono font-bold animate-pulse">
                    {activeSprinklersCount} active
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Telemetry Simulation Status Widget */}
        <div className="p-3 m-3 rounded-xl bg-slate-950/70 border border-slate-800 text-xs">
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${simulationActive ? 'bg-emerald-500 animate-ping' : 'bg-slate-500'}`} />
              <span className="font-semibold text-slate-300 text-[11px]">IoT Simulation</span>
            </div>
            <button
              onClick={() => setSimulationActive(!simulationActive)}
              className="text-[10px] text-emerald-400 hover:underline"
            >
              {simulationActive ? 'Pause' : 'Resume'}
            </button>
          </div>
          <p className="text-[10px] text-slate-400">
            24 probes online • LoRaWAN Gateway active • Live sensor telemetry streaming
          </p>
        </div>

        {/* User / Sandbox Info Footer */}
        <div className="p-4 border-t border-slate-800/80 bg-slate-950/60 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-emerald-900 border border-emerald-700 flex items-center justify-center font-bold text-xs text-emerald-200">
              ZK
            </div>
            <div className="overflow-hidden">
              <div className="text-xs font-semibold text-white truncate">Zonaira Khan</div>
              <div className="text-[10px] text-slate-400 truncate">Project Lead • Sandbox</div>
            </div>
          </div>
          <Link
            to="/"
            title="Return to Public Landing Page"
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Desktop Navigation Bar */}
        <header className="hidden lg:flex bg-white border-b border-slate-200 px-8 py-3.5 items-center justify-between sticky top-0 z-30 shadow-xs">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Link to="/dashboard" className="hover:text-slate-700">Dashboard</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-slate-700 font-medium">{getPageTitle()}</span>
            </div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight mt-0.5">
              {getPageTitle()}
            </h1>
          </div>

          <div className="flex items-center gap-4">
            {/* Live Time */}
            <div className="text-right border-r border-slate-200 pr-4">
              <div className="text-xs font-mono font-medium text-slate-700">
                {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
              </div>
              <div className="text-[11px] text-slate-400">
                {currentTime.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
              </div>
            </div>

            {/* Sprinklers active badge */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 font-medium">
              <Droplets className="w-3.5 h-3.5 text-emerald-600" />
              <span>
                Active Sprinklers: <strong className="font-bold text-emerald-700">{activeSprinklersCount}</strong> / {totalFields}
              </span>
            </div>

            {/* Notification Center Bell & Dropdown */}
            <div className="relative">
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="relative p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 transition-colors"
                aria-label="View notifications"
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-600 text-white text-[9px] font-bold flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notification Popover */}
              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">Notifications ({unreadCount} new)</span>
                    <button
                      onClick={markAllNotificationsRead}
                      className="text-[11px] text-emerald-700 hover:underline font-medium"
                    >
                      Mark all read
                    </button>
                  </div>
                  <div className="max-h-72 overflow-y-auto divide-y divide-slate-100">
                    {notifications.length === 0 ? (
                      <div className="p-4 text-center text-xs text-slate-400">
                        No notifications to display
                      </div>
                    ) : (
                      notifications.map(n => (
                        <div key={n.id} className={`p-3 text-xs hover:bg-slate-50 transition-colors ${!n.read ? 'bg-emerald-50/40' : ''}`}>
                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-slate-800">{n.title}</span>
                            <span className="text-[10px] text-slate-400">{n.timestamp}</span>
                          </div>
                          <p className="text-slate-600 text-[11px] mt-1">{n.message}</p>
                        </div>
                      ))
                    )}
                  </div>
                  <div className="px-4 pt-2 pb-1 border-t border-slate-100 flex justify-between">
                    <button
                      onClick={clearNotifications}
                      className="text-[11px] text-slate-400 hover:text-slate-600"
                    >
                      Clear all
                    </button>
                    <button
                      onClick={() => setNotificationsOpen(false)}
                      className="text-[11px] text-slate-600 hover:text-slate-900 font-semibold"
                    >
                      Dismiss
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Back to Landing Page Button */}
            <Link
              to="/"
              className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-300 hover:border-slate-400 text-slate-700 hover:bg-slate-100 transition-colors flex items-center gap-1.5"
            >
              <span>Landing Page</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 lg:p-8 overflow-x-hidden">
          <Outlet />
        </main>
      </div>

      {/* Global Modals & Toast Manager */}
      <FieldDetailModal />
      <ToastContainer />
    </div>
  );
}
