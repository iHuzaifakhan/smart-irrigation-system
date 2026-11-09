import React from 'react';
import { useIrrigation } from '../context/IrrigationContext';
import {
  X,
  Droplets,
  Thermometer,
  Wind,
  BatteryCharging,
  Radio,
  Play,
  Square,
  Sparkles,
  Layers,
  Clock,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';

export default function FieldDetailModal() {
  const {
    selectedField,
    setSelectedFieldId,
    toggleSprinkler,
    systemMode
  } = useIrrigation();

  if (!selectedField) return null;

  const getMoistureStatus = (val) => {
    if (val < 30) return { label: 'Low Moisture (Water Stress Risk)', color: 'text-amber-700 bg-amber-50 border-amber-200' };
    if (val > 60) return { label: 'High Moisture (Percolation / Saturated)', color: 'text-blue-700 bg-blue-50 border-blue-200' };
    return { label: 'Optimal Moisture Band', color: 'text-emerald-700 bg-emerald-50 border-emerald-200' };
  };

  const status = getMoistureStatus(selectedField.moisture);

  const formatCountdown = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs < 10 ? '0' : ''}${secs}s`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="bg-white rounded-2xl max-w-3xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-start justify-between bg-slate-50/70">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="text-xs font-mono font-medium px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200">
                {selectedField.code}
              </span>
              <h3 className="text-lg font-bold text-slate-900">{selectedField.name}</h3>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Crop: <span className="font-medium text-slate-700">{selectedField.crop}</span> • Soil Type: {selectedField.soilType} • Size: {selectedField.hectares} ha
            </p>
          </div>
          <button
            onClick={() => setSelectedFieldId(null)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Status Banner */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div className="flex items-center gap-3">
              <div className={`p-2.5 rounded-xl border ${selectedField.sprinklerActive ? 'bg-emerald-500 text-white animate-pulse' : 'bg-white text-slate-600 border-slate-200'}`}>
                <Droplets className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs uppercase tracking-wider text-slate-500 font-semibold">Valve Status</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${selectedField.sprinklerActive ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-700'}`}>
                    {selectedField.sprinklerActive ? 'Active (Spraying)' : 'Closed (Idle)'}
                  </span>
                </div>
                <div className="text-xs text-slate-500 mt-0.5">
                  Valve ID: <span className="font-mono text-slate-700 font-medium">{selectedField.valveId}</span> • Flow Rate: {selectedField.flowRate} L/min
                  {selectedField.sprinklerActive && (
                    <span className="ml-2 font-semibold text-emerald-700">
                      Remaining: {formatCountdown(selectedField.timeRemainingSeconds)}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <button
              onClick={() => toggleSprinkler(selectedField.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold shadow-sm transition-all ${
                selectedField.sprinklerActive
                  ? 'bg-rose-600 hover:bg-rose-700 text-white'
                  : 'bg-emerald-700 hover:bg-emerald-800 text-white'
              }`}
            >
              {selectedField.sprinklerActive ? (
                <>
                  <Square className="w-3.5 h-3.5 fill-white" />
                  Stop Irrigation
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-white" />
                  Start Irrigation ({selectedField.durationMinutes || 30}m)
                </>
              )}
            </button>
          </div>

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-xl bg-white border border-slate-200">
              <span className="text-xs text-slate-500">Root-Zone Moisture</span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-2xl font-bold text-slate-900">{selectedField.moisture}%</span>
                <span className="text-xs text-slate-400 font-medium">/ 100%</span>
              </div>
              <div className={`mt-2 text-[10px] font-semibold px-2 py-0.5 rounded-full border inline-block ${status.color}`}>
                {status.label}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-white border border-slate-200">
              <span className="text-xs text-slate-500">Soil / Air Temp</span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-2xl font-bold text-slate-900">{selectedField.soilTemp}°C</span>
                <span className="text-xs text-slate-400 font-medium">soil</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-2">Ambient: {selectedField.airTemp}°C</p>
            </div>

            <div className="p-3.5 rounded-xl bg-white border border-slate-200">
              <span className="text-xs text-slate-500">Relative Humidity</span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-2xl font-bold text-slate-900">{selectedField.humidity}%</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-2">Dew point: 12.8°C</p>
            </div>

            <div className="p-3.5 rounded-xl bg-white border border-slate-200">
              <span className="text-xs text-slate-500">IoT Node Telemetry</span>
              <div className="flex items-center gap-1.5 mt-1 text-slate-800 text-sm font-semibold">
                <BatteryCharging className="w-4 h-4 text-emerald-600" />
                {selectedField.batteryLevel}% Battery
              </div>
              <div className="flex items-center gap-1.5 mt-2 text-[11px] text-slate-500">
                <Radio className="w-3.5 h-3.5 text-blue-600" />
                {selectedField.signalStrength}
              </div>
            </div>
          </div>

          {/* Multi-depth Soil Sensor Breakdown */}
          <div className="p-4 rounded-xl border border-slate-200 bg-white">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-emerald-700" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Multi-Depth Probe Profile
                </h4>
              </div>
              <span className="text-[11px] text-slate-400 font-medium">Frequency Domain Reflectometry</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                <div className="flex justify-between text-xs text-slate-600 font-medium">
                  <span>Topsoil (10 cm)</span>
                  <span className="font-bold text-slate-800">{selectedField.depthReadings?.topsoil10cm || 22}%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-1.5 mt-2">
                  <div
                    className="bg-emerald-500 h-1.5 rounded-full"
                    style={{ width: `${selectedField.depthReadings?.topsoil10cm || 22}%` }}
                  />
                </div>
                <p className="text-[10px] text-slate-400 mt-1.5">Direct surface evaporation zone</p>
              </div>

              <div className="p-3 rounded-lg bg-emerald-50/60 border border-emerald-200">
                <div className="flex justify-between text-xs text-emerald-900 font-medium">
                  <span>Root Zone (30 cm)</span>
                  <span className="font-bold text-emerald-800">{selectedField.depthReadings?.rootZone30cm || selectedField.moisture}%</span>
                </div>
                <div className="w-full bg-emerald-200 rounded-full h-1.5 mt-2">
                  <div
                    className="bg-emerald-600 h-1.5 rounded-full"
                    style={{ width: `${selectedField.depthReadings?.rootZone30cm || selectedField.moisture}%` }}
                  />
                </div>
                <p className="text-[10px] text-emerald-700 mt-1.5">Primary crop absorption tier (Target: 35-60%)</p>
              </div>

              <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                <div className="flex justify-between text-xs text-slate-600 font-medium">
                  <span>Deep Subsoil (60 cm)</span>
                  <span className="font-bold text-slate-800">{selectedField.depthReadings?.subsoil60cm || 32}%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-1.5 mt-2">
                  <div
                    className="bg-teal-600 h-1.5 rounded-full"
                    style={{ width: `${selectedField.depthReadings?.subsoil60cm || 32}%` }}
                  />
                </div>
                <p className="text-[10px] text-slate-400 mt-1.5">Percolation reservoir capacity</p>
              </div>
            </div>
          </div>

          {/* 24-Hour Historical Moisture & Soil Temperature Chart */}
          <div className="p-4 rounded-xl border border-slate-200 bg-white">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                24-Hour Moisture Trend & Soil Temperature
              </h4>
              <span className="text-[11px] text-slate-400">Hourly Telemetry Log</span>
            </div>
            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={selectedField.history24h || []}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="moistureGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#059669" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#059669" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="time" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={{ stroke: '#cbd5e1' }} />
                  <YAxis
                    domain={[0, 100]}
                    tick={{ fontSize: 11, fill: '#64748b' }}
                    axisLine={{ stroke: '#cbd5e1' }}
                    unit="%"
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#ffffff',
                      borderRadius: '8px',
                      border: '1px solid #e2e8f0',
                      fontSize: '12px',
                      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                    }}
                    formatter={(value, name) => [
                      `${value}${name === 'moisture' ? '%' : '°C'}`,
                      name === 'moisture' ? 'Soil Moisture' : 'Soil Temp'
                    ]}
                  />
                  <Area
                    type="monotone"
                    dataKey="moisture"
                    stroke="#059669"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#moistureGrad)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Agronomic AI Advice */}
          <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/50 flex items-start gap-3">
            <div className="p-2 rounded-lg bg-emerald-600 text-white flex-shrink-0 mt-0.5">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="flex-1 text-xs">
              <h5 className="font-semibold text-emerald-950">AI Agronomic Model Assessment</h5>
              <p className="text-emerald-800 mt-1 leading-relaxed">
                Based on continuous root-zone capacitive telemetry and localized evapotranspiration modeling,
                {selectedField.moisture < 30 ? (
                  <> this field requires active irrigation to prevent crop wilting. Recommending a 30-35 minute delivery at dawn or dusk.</>
                ) : selectedField.moisture > 60 ? (
                  <> moisture levels are above target saturation. Recommend withholding irrigation to prevent root hypoxia and water wastage.</>
                ) : (
                  <> moisture is balanced within the optimal agronomic envelope ({selectedField.minMoisture}% - {selectedField.maxMoisture}%). No intervention needed.</>
                )}
              </p>
              <div className="mt-2 text-[10px] text-emerald-700/80 font-mono">
                System Mode: {systemMode.toUpperCase()} • Confidence Score: 94.8% • Model: Hargreaves-Penman ET0 Heuristic
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 flex items-center justify-between bg-slate-50/50">
          <span className="text-xs text-slate-500">
            Last Irrigated: {selectedField.lastIrrigated}
          </span>
          <button
            onClick={() => setSelectedFieldId(null)}
            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold shadow-sm transition-colors"
          >
            Close View
          </button>
        </div>
      </div>
    </div>
  );
}
