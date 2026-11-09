import React, { useState } from 'react';
import {
  Sliders,
  Play,
  Square,
  AlertTriangle,
  Clock,
  Droplets,
  Sparkles,
  Calendar,
  CheckCircle2,
  Power,
  RotateCcw,
  Zap,
  Info
} from 'lucide-react';
import { useIrrigation } from '../../context/IrrigationContext';
import { irrigationSchedule } from '../../data/mockData';

export default function IrrigationControlPage() {
  const {
    fields,
    systemMode,
    setSystemMode,
    toggleSprinkler,
    startIrrigation,
    stopIrrigation,
    stopAllSprinklers,
    waterUsedToday,
    activeSprinklersCount,
    updateFieldSettings
  } = useIrrigation();

  const [selectedFieldId, setSelectedFieldId] = useState('f1');
  const [customDuration, setCustomDuration] = useState(30);

  const activeField = fields.find(f => f.id === selectedFieldId) || fields[0];

  const formatCountdown = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs < 10 ? '0' : ''}${secs}s`;
  };

  return (
    <div className="space-y-6">
      {/* Mode Control & Safety Bar */}
      <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-slate-900">Actuator & Valve Dispatch</h2>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase border ${
              systemMode === 'automatic'
                ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                : 'bg-amber-100 text-amber-800 border-amber-300'
            }`}>
              {systemMode === 'automatic' ? 'AI Automatic Mode Active' : 'Manual Override Engaged'}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            {systemMode === 'automatic'
              ? 'AI algorithms dynamically schedule sprinkler runs based on multi-depth soil moisture and ET0 evapotranspiration.'
              : 'Autonomous algorithms are suspended. Human operators hold executive command over individual field solenoids.'}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Mode Switcher Buttons */}
          <div className="flex p-1 bg-slate-100 rounded-xl border border-slate-200">
            <button
              onClick={() => setSystemMode('automatic')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                systemMode === 'automatic'
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Automatic Mode</span>
            </button>
            <button
              onClick={() => setSystemMode('manual')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                systemMode === 'manual'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Manual Mode</span>
            </button>
          </div>

          {/* Emergency Stop All */}
          <button
            onClick={stopAllSprinklers}
            className="px-3.5 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs"
          >
            <Power className="w-3.5 h-3.5 text-rose-600" />
            <span>Master Cutoff (Stop All)</span>
          </button>
        </div>
      </div>

      {/* In Automatic Mode: AI Decision Matrix Callout */}
      {systemMode === 'automatic' && (
        <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 flex items-start gap-3.5">
          <div className="p-2.5 rounded-xl bg-emerald-600 text-white flex-shrink-0 mt-0.5 shadow-xs">
            <Sparkles className="w-5 h-5" />
          </div>
          <div className="flex-1 text-xs">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-emerald-950 text-sm">Autonomous AI Controller Active</h4>
              <span className="text-[10px] font-mono text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-200">
                Model: Agronomic Penman-Monteith Heuristic
              </span>
            </div>
            <p className="text-emerald-800 mt-1 leading-relaxed">
              Automated rules evaluate root moisture continuously. Fields NO-01 and DP-05 are flagged for low soil moisture. When thresholds breach (&lt;30%), cycles trigger during low wind speeds to prevent spray drift and maximize soil penetration.
            </p>
            <div className="mt-2.5 flex flex-wrap gap-4 text-[11px] text-emerald-900 font-medium">
              <span>• Active Valves: <strong>{activeSprinklersCount} / 6</strong></span>
              <span>• Next Scheduled Evaluation: <strong>10 minutes</strong></span>
              <span>• Safety Max Cutoff: <strong>65% Saturation</strong></span>
            </div>
          </div>
        </div>
      )}

      {/* In Manual Mode: Warning Banner */}
      {systemMode === 'manual' && (
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-3.5">
          <div className="p-2.5 rounded-xl bg-amber-600 text-white flex-shrink-0 mt-0.5 shadow-xs">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div className="flex-1 text-xs text-amber-900">
            <h4 className="font-bold text-amber-950 text-sm">Manual Operator Control Engaged</h4>
            <p className="mt-1 leading-relaxed">
              Autonomous scheduling is temporarily overridden. You can turn individual sprinklers ON or OFF, adjust run durations, and execute immediate watering cycles. The system will still enforce the master 65% soil saturation cutoff to prevent flooding.
            </p>
          </div>
        </div>
      )}

      {/* Main Interactive Controls: Field Control Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Quick Actuator Commander */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900">Actuator Command Console</h3>
          <p className="text-xs text-slate-500">Configure duration and dispatch individual valve solenoids</p>

          {/* Field Selection Dropdown */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Select Target Field:</label>
            <select
              value={selectedFieldId}
              onChange={(e) => setSelectedFieldId(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600"
            >
              {fields.map(f => (
                <option key={f.id} value={f.id}>
                  {f.code} — {f.name} ({f.moisture}% moisture)
                </option>
              ))}
            </select>
          </div>

          {/* Selected Field Quick Specs */}
          {activeField && (
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">Crop Type:</span>
                <span className="font-semibold text-slate-800">{activeField.crop}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Valve ID:</span>
                <span className="font-mono font-bold text-slate-800">{activeField.valveId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Current Soil Moisture:</span>
                <span className={`font-bold ${activeField.moisture < 30 ? 'text-amber-600' : 'text-emerald-600'}`}>
                  {activeField.moisture}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Nominal Flow Rate:</span>
                <span className="font-semibold text-slate-800">{activeField.flowRate} L/min</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Current Valve State:</span>
                <span className={`font-bold ${activeField.sprinklerActive ? 'text-emerald-700' : 'text-slate-500'}`}>
                  {activeField.sprinklerActive ? `Spraying (${formatCountdown(activeField.timeRemainingSeconds)})` : 'Closed'}
                </span>
              </div>
            </div>
          )}

          {/* Duration Selector */}
          <div>
            <div className="flex justify-between items-center text-xs font-semibold text-slate-700 mb-1.5">
              <span>Irrigation Duration:</span>
              <span className="text-emerald-700 font-bold">{customDuration} minutes</span>
            </div>
            <input
              type="range"
              min="10"
              max="90"
              step="5"
              value={customDuration}
              onChange={(e) => setCustomDuration(Number(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>10m</span>
              <span>30m</span>
              <span>60m</span>
              <span>90m</span>
            </div>

            {/* Quick Preset Buttons */}
            <div className="grid grid-cols-4 gap-1.5 mt-3">
              {[15, 30, 45, 60].map(mins => (
                <button
                  key={mins}
                  onClick={() => setCustomDuration(mins)}
                  className={`py-1 rounded-lg text-xs font-semibold border ${
                    customDuration === mins
                      ? 'bg-emerald-100 border-emerald-300 text-emerald-800'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {mins}m
                </button>
              ))}
            </div>
          </div>

          {/* Volume Projection */}
          <div className="p-3 rounded-xl bg-teal-50/60 border border-teal-200 text-xs text-teal-900 flex items-center justify-between">
            <span className="font-medium">Estimated Water Volume:</span>
            <span className="font-bold text-sm">
              {(customDuration * (activeField?.flowRate || 120)).toLocaleString()} Liters
            </span>
          </div>

          {/* Action Button */}
          <div className="pt-2">
            {activeField?.sprinklerActive ? (
              <button
                onClick={() => stopIrrigation(activeField.id)}
                className="w-full py-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow transition-all flex items-center justify-center gap-2"
              >
                <Square className="w-4 h-4 fill-white" />
                <span>Stop Valve {activeField.valveId}</span>
              </button>
            ) : (
              <button
                onClick={() => startIrrigation(activeField.id, customDuration)}
                className="w-full py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow transition-all flex items-center justify-center gap-2"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Start Irrigation ({customDuration}m)</span>
              </button>
            )}
          </div>
        </div>

        {/* Right Column: All Field Actuators Matrix (2 cols) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Sprinkler Valve Matrix</h3>
                <p className="text-xs text-slate-500">Live operational state and individual toggle switches</p>
              </div>
              <span className="text-xs text-slate-400">
                {activeSprinklersCount} of {fields.length} Valves Open
              </span>
            </div>

            <div className="space-y-3">
              {fields.map(field => (
                <div
                  key={field.id}
                  className={`p-4 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                    field.sprinklerActive
                      ? 'bg-emerald-50/60 border-emerald-300 shadow-xs'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2.5 rounded-xl border flex-shrink-0 ${
                      field.sprinklerActive
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs animate-pulse'
                        : 'bg-slate-100 text-slate-500 border-slate-200'
                    }`}>
                      <Droplets className="w-5 h-5" />
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                          {field.code}
                        </span>
                        <h4 className="text-xs font-bold text-slate-900">{field.name}</h4>
                        <span className="text-[10px] text-slate-400 font-mono">({field.valveId})</span>
                      </div>

                      <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-500 mt-1">
                        <span>Crop: <strong>{field.crop}</strong></span>
                        <span>Moisture: <strong className={field.moisture < 30 ? 'text-amber-600 font-bold' : 'text-slate-700'}>{field.moisture}%</strong></span>
                        <span>Flow: <strong>{field.flowRate} L/min</strong></span>
                      </div>

                      {field.sprinklerActive && (
                        <div className="text-[11px] font-semibold text-emerald-800 mt-1.5 flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Active Run: {formatCountdown(field.timeRemainingSeconds)} remaining</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <button
                      onClick={() => setSelectedFieldId(field.id)}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                    >
                      Select
                    </button>

                    <button
                      onClick={() => toggleSprinkler(field.id)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold shadow-xs transition-all flex items-center gap-1.5 ${
                        field.sprinklerActive
                          ? 'bg-rose-600 hover:bg-rose-700 text-white'
                          : 'bg-emerald-700 hover:bg-emerald-800 text-white'
                      }`}
                    >
                      {field.sprinklerActive ? (
                        <>
                          <Square className="w-3.5 h-3.5 fill-white" />
                          <span>Close Valve</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-3.5 h-3.5 fill-white" />
                          <span>Open Valve</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Irrigation Schedule Timeline */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-emerald-700" />
                <h3 className="text-sm font-bold text-slate-900">Today's Planned Irrigation Schedule</h3>
              </div>
              <span className="text-[11px] text-slate-400">Synchronized with weather forecasts</span>
            </div>

            <div className="divide-y divide-slate-100 text-xs">
              {irrigationSchedule.map((item, idx) => (
                <div key={idx} className="py-2.5 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-slate-600 font-semibold w-16">{item.time}</span>
                    <div>
                      <div className="font-semibold text-slate-800">{item.field}</div>
                      <span className="text-[10px] text-slate-400">{item.reason}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-slate-500 font-mono text-[11px]">{item.duration}</span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                      item.status === 'Running'
                        ? 'bg-emerald-100 text-emerald-800 animate-pulse'
                        : item.status === 'Scheduled'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-slate-100 text-slate-600'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
