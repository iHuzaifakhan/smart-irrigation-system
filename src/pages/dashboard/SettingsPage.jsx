import React from 'react';
import {
  Settings,
  User,
  Bell,
  Sliders,
  Shield,
  RotateCcw,
  Sun,
  CloudRain,
  Flame,
  CheckCircle2,
  Save,
  HelpCircle
} from 'lucide-react';
import { useIrrigation } from '../../context/IrrigationContext';

export default function SettingsPage() {
  const {
    settings,
    setSettings,
    triggerDroughtSimulation,
    triggerRainSimulation,
    resetAllData,
    addToast
  } = useIrrigation();

  const handleUnitChange = (unit) => {
    setSettings(prev => ({ ...prev, unitSystem: unit }));
    addToast('Units Updated', `Measurement system switched to ${unit.toUpperCase()}`, 'info');
  };

  const handleNotificationToggle = (key) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
    addToast('Preferences Saved', 'Notification channels updated.', 'info');
  };

  const handleThresholdChange = (key, val) => {
    setSettings(prev => ({ ...prev, [key]: Number(val) }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    addToast('Settings Saved', 'All farm preferences successfully saved to browser storage.', 'success');
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Page Title */}
      <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
        <h2 className="text-base font-bold text-slate-900">System Preferences & Settings</h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Configure sensor threshold parameters, notification channels, measurement units, and sandbox testing controls.
        </p>
      </div>

      {/* User Profile Section */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
          <User className="w-4 h-4 text-emerald-700" />
          <h3 className="text-sm font-bold text-slate-900">User Profile (Lead Agronomist)</h3>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-emerald-700 text-white font-extrabold text-xl flex items-center justify-center shadow-md shadow-emerald-900/20">
            ZK
          </div>
          <div className="space-y-1">
            <h4 className="text-base font-bold text-slate-900">Zonaira Khan</h4>
            <p className="text-xs text-slate-500">
              Role: <strong className="text-slate-700 font-semibold">Project Lead & Farm Systems Administrator</strong>
            </p>
            <p className="text-xs text-slate-500">
              Organization: <span className="text-emerald-700 font-medium">Digital Transformation Sandbox • University Project</span>
            </p>
            <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 mt-1">
              Full Administrative Privileges
            </span>
          </div>
        </div>
      </div>

      {/* Measurement Units */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
          <Sliders className="w-4 h-4 text-emerald-700" />
          <h3 className="text-sm font-bold text-slate-900">Measurement Units</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div
            onClick={() => handleUnitChange('metric')}
            className={`p-4 rounded-xl border cursor-pointer transition-all ${
              settings.unitSystem === 'metric'
                ? 'bg-emerald-50/70 border-emerald-400 shadow-xs ring-1 ring-emerald-400'
                : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs text-slate-900">Metric System (Recommended)</span>
              {settings.unitSystem === 'metric' && <CheckCircle2 className="w-4 h-4 text-emerald-700" />}
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Celsius (°C), Liters (L), Hectares (ha), Millimeters (mm/day)
            </p>
          </div>

          <div
            onClick={() => handleUnitChange('imperial')}
            className={`p-4 rounded-xl border cursor-pointer transition-all ${
              settings.unitSystem === 'imperial'
                ? 'bg-emerald-50/70 border-emerald-400 shadow-xs ring-1 ring-emerald-400'
                : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs text-slate-900">Imperial System</span>
              {settings.unitSystem === 'imperial' && <CheckCircle2 className="w-4 h-4 text-emerald-700" />}
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Fahrenheit (°F), Gallons (gal), Acres (ac), Inches (in/day)
            </p>
          </div>
        </div>
      </div>

      {/* Irrigation Threshold Presets */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-5">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
          <Sliders className="w-4 h-4 text-emerald-700" />
          <h3 className="text-sm font-bold text-slate-900">Irrigation Automation Thresholds</h3>
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
              <span>Dry Wilting Trigger Threshold:</span>
              <span className="text-amber-700 font-bold">{settings.dryTriggerThreshold}% Moisture</span>
            </div>
            <input
              type="range"
              min="15"
              max="40"
              value={settings.dryTriggerThreshold}
              onChange={(e) => handleThresholdChange('dryTriggerThreshold', e.target.value)}
              className="w-full accent-emerald-600 cursor-pointer"
            />
            <p className="text-[11px] text-slate-400 mt-1">
              When root-zone moisture drops below this value in automatic mode, AI schedules an emergency cycle.
            </p>
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
              <span>Saturated Cutoff Ceiling:</span>
              <span className="text-blue-700 font-bold">{settings.saturatedCutoffThreshold}% Moisture</span>
            </div>
            <input
              type="range"
              min="50"
              max="80"
              value={settings.saturatedCutoffThreshold}
              onChange={(e) => handleThresholdChange('saturatedCutoffThreshold', e.target.value)}
              className="w-full accent-emerald-600 cursor-pointer"
            />
            <p className="text-[11px] text-slate-400 mt-1">
              Mandatory safety ceiling. Any active valve will immediately shut down if moisture crosses this level.
            </p>
          </div>
        </div>
      </div>

      {/* Notification Preferences */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
          <Bell className="w-4 h-4 text-emerald-700" />
          <h3 className="text-sm font-bold text-slate-900">Notification Channels</h3>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
            <div>
              <div className="text-xs font-bold text-slate-800">Email Alerts</div>
              <div className="text-[11px] text-slate-500">Send critical soil moisture warnings to zonaira.khan@sandbox.edu</div>
            </div>
            <button
              onClick={() => handleNotificationToggle('notificationsEmail')}
              className={`w-11 h-6 rounded-full transition-colors relative ${settings.notificationsEmail ? 'bg-emerald-600' : 'bg-slate-300'}`}
            >
              <span className={`block w-4 h-4 rounded-full bg-white shadow transform transition-transform absolute top-1 ${settings.notificationsEmail ? 'right-1' : 'left-1'}`} />
            </button>
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
            <div>
              <div className="text-xs font-bold text-slate-800">Push In-App Notifications</div>
              <div className="text-[11px] text-slate-500">Receive instant popups when valve actuators open or close</div>
            </div>
            <button
              onClick={() => handleNotificationToggle('notificationsPush')}
              className={`w-11 h-6 rounded-full transition-colors relative ${settings.notificationsPush ? 'bg-emerald-600' : 'bg-slate-300'}`}
            >
              <span className={`block w-4 h-4 rounded-full bg-white shadow transform transition-transform absolute top-1 ${settings.notificationsPush ? 'right-1' : 'left-1'}`} />
            </button>
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
            <div>
              <div className="text-xs font-bold text-slate-800">SMS Emergency Broadcast</div>
              <div className="text-[11px] text-slate-500">Send text messages on pump fault or extreme drought events</div>
            </div>
            <button
              onClick={() => handleNotificationToggle('notificationsSms')}
              className={`w-11 h-6 rounded-full transition-colors relative ${settings.notificationsSms ? 'bg-emerald-600' : 'bg-slate-300'}`}
            >
              <span className={`block w-4 h-4 rounded-full bg-white shadow transform transition-transform absolute top-1 ${settings.notificationsSms ? 'right-1' : 'left-1'}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Sandbox Evaluation & Simulation Scenarios */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-50 via-teal-50/50 to-white border border-emerald-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-emerald-100">
          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4 text-emerald-700" />
            <h3 className="text-sm font-bold text-slate-900">Sandbox Testing Triggers</h3>
          </div>
          <span className="text-[10px] font-mono font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-200">
            Evaluation Tool
          </span>
        </div>
        <p className="text-xs text-slate-600 leading-relaxed">
          Use these triggers during demonstration to simulate dynamic weather anomalies and observe how the dashboard, charts, and AI recommendation engines react in real-time.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
          <button
            onClick={triggerDroughtSimulation}
            className="p-3 rounded-xl bg-white hover:bg-amber-50 border border-amber-200 text-left transition-all shadow-xs group"
          >
            <div className="flex items-center gap-2 text-amber-700 font-bold text-xs mb-1">
              <Sun className="w-4 h-4 group-hover:rotate-45 transition-transform" />
              <span>Simulate Drought</span>
            </div>
            <p className="text-[11px] text-slate-500">
              Drops moisture in Field NO-01 & DP-05 to trigger critical AI warnings.
            </p>
          </button>

          <button
            onClick={triggerRainSimulation}
            className="p-3 rounded-xl bg-white hover:bg-blue-50 border border-blue-200 text-left transition-all shadow-xs group"
          >
            <div className="flex items-center gap-2 text-blue-700 font-bold text-xs mb-1">
              <CloudRain className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
              <span>Simulate Rainfall</span>
            </div>
            <p className="text-[11px] text-slate-500">
              Increases soil moisture by 18% and shuts off all active sprinklers.
            </p>
          </button>

          <button
            onClick={resetAllData}
            className="p-3 rounded-xl bg-white hover:bg-slate-100 border border-slate-300 text-left transition-all shadow-xs group"
          >
            <div className="flex items-center gap-2 text-slate-700 font-bold text-xs mb-1">
              <RotateCcw className="w-4 h-4 group-hover:-rotate-90 transition-transform" />
              <span>Reset Sandbox</span>
            </div>
            <p className="text-[11px] text-slate-500">
              Restores all fields, moisture, and recommendations to initial baseline.
            </p>
          </button>
        </div>
      </div>

      {/* System Information */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs text-xs space-y-3">
        <h3 className="font-bold text-slate-900 border-b border-slate-100 pb-2">System Diagnostics</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-slate-600">
          <div>
            <span className="text-[10px] text-slate-400 block font-semibold uppercase">Platform</span>
            <span className="font-medium text-slate-800">React + Vite SPA</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 block font-semibold uppercase">Version</span>
            <span className="font-medium text-slate-800">v2.4.0 (Sandbox)</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 block font-semibold uppercase">Hosting Target</span>
            <span className="font-medium text-slate-800">Netlify / Vercel Ready</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 block font-semibold uppercase">Database / APIs</span>
            <span className="font-medium text-emerald-700">Front-End Only (Zero Paid APIs)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
