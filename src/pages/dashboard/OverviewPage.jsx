import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sprout,
  Droplets,
  Layers,
  Activity,
  AlertTriangle,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  TrendingDown,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Radio,
  Sliders,
  ExternalLink
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceLine
} from 'recharts';
import { useIrrigation } from '../../context/IrrigationContext';

export default function OverviewPage() {
  const {
    fields,
    totalFields,
    activeSprinklersCount,
    averageMoisture,
    waterUsedToday,
    weeklyWaterData,
    recentActivities,
    recommendations,
    applyRecommendation,
    setSelectedFieldId,
    systemMode,
    setSystemMode
  } = useIrrigation();

  // Find top pending critical recommendation
  const urgentRec = recommendations.find(r => r.status === 'Pending' && r.priority === 'Critical') || recommendations[0];

  // Data for multi-field soil moisture overview chart
  const fieldMoistureChartData = fields.map(f => ({
    name: f.name.split(' - ')[0],
    fullName: f.name,
    moisture: f.moisture,
    min: f.minMoisture,
    max: f.maxMoisture
  }));

  const getMoistureBadge = (val) => {
    if (val < 30) return { label: 'Low', color: 'bg-amber-100 text-amber-800 border-amber-200' };
    if (val > 60) return { label: 'High', color: 'bg-blue-100 text-blue-800 border-blue-200' };
    return { label: 'Optimal', color: 'bg-emerald-100 text-emerald-800 border-emerald-200' };
  };

  return (
    <div className="space-y-6">
      {/* Top Banner Notice: System Mode & Quick Action */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-800">Operational Status:</span>
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                Active Telemetry Loop
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Current operational mode is set to <strong className="text-slate-700 font-semibold">{systemMode === 'automatic' ? 'Automatic (AI Decision)' : 'Manual (Operator Override)'}</strong>.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-stretch sm:self-auto">
          <Link
            to="/dashboard/controls"
            className="flex-1 sm:flex-none text-xs font-semibold px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors flex items-center justify-center gap-1.5"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Sprinkler Controls</span>
          </Link>
          <button
            onClick={() => setSystemMode(systemMode === 'automatic' ? 'manual' : 'automatic')}
            className={`flex-1 sm:flex-none text-xs font-semibold px-3.5 py-2 rounded-xl text-white shadow-xs transition-colors flex items-center justify-center gap-1.5 ${
              systemMode === 'automatic' ? 'bg-emerald-700 hover:bg-emerald-800' : 'bg-amber-600 hover:bg-amber-700'
            }`}
          >
            Switch to {systemMode === 'automatic' ? 'Manual' : 'Automatic'}
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Fields */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span className="font-semibold uppercase tracking-wider">Total Managed Fields</span>
            <div className="p-2 rounded-lg bg-emerald-50 text-emerald-700">
              <Sprout className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900 tracking-tight">{totalFields}</span>
            <span className="text-xs font-medium text-slate-500">Parcels</span>
          </div>
          <div className="mt-3 flex items-center justify-between text-xs text-slate-500 border-t border-slate-100 pt-2.5">
            <span>Total Acreage:</span>
            <span className="font-semibold text-slate-700">130.1 Hectares</span>
          </div>
        </div>

        {/* Average Soil Moisture */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span className="font-semibold uppercase tracking-wider">Average Soil Moisture</span>
            <div className="p-2 rounded-lg bg-blue-50 text-blue-700">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900 tracking-tight">{averageMoisture}%</span>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getMoistureBadge(averageMoisture).color}`}>
              {getMoistureBadge(averageMoisture).label}
            </span>
          </div>
          <div className="mt-3 flex items-center justify-between text-xs text-slate-500 border-t border-slate-100 pt-2.5">
            <span>Optimal Range:</span>
            <span className="font-semibold text-emerald-700">30% - 60%</span>
          </div>
        </div>

        {/* Water Used Today */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span className="font-semibold uppercase tracking-wider">Water Used Today</span>
            <div className="p-2 rounded-lg bg-teal-50 text-teal-700">
              <Droplets className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900 tracking-tight">
              {waterUsedToday.toLocaleString()}
            </span>
            <span className="text-xs font-medium text-slate-500">Liters</span>
          </div>
          <div className="mt-3 flex items-center justify-between text-xs text-slate-500 border-t border-slate-100 pt-2.5">
            <span className="flex items-center gap-1 text-emerald-700 font-semibold">
              <TrendingDown className="w-3.5 h-3.5" />
              -28% vs baseline
            </span>
            <span className="text-[11px] text-slate-400">8,550 L saved</span>
          </div>
        </div>

        {/* Active Sprinklers */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span className="font-semibold uppercase tracking-wider">Active Sprinklers</span>
            <div className={`p-2 rounded-lg ${activeSprinklersCount > 0 ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'}`}>
              <Activity className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900 tracking-tight">
              {activeSprinklersCount}
            </span>
            <span className="text-xs font-medium text-slate-500">/ {totalFields} Valves Open</span>
          </div>
          <div className="mt-3 flex items-center justify-between text-xs text-slate-500 border-t border-slate-100 pt-2.5">
            <span>Total Flow Rate:</span>
            <span className="font-semibold text-slate-700">
              {fields.filter(f => f.sprinklerActive).reduce((a, c) => a + c.flowRate, 0)} L/min
            </span>
          </div>
        </div>
      </div>

      {/* AI Recommendation Highlight Card */}
      {urgentRec && (
        <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-900 text-white shadow-md">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1.5 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-200 border border-emerald-400/30 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-emerald-300" />
                  AI Irrigation Recommendation ({urgentRec.confidenceScore}% Confidence)
                </span>
                <span className="text-xs text-emerald-200/80">• {urgentRec.timestamp}</span>
              </div>
              <h3 className="text-base font-bold text-white tracking-tight">
                {urgentRec.title}
              </h3>
              <p className="text-xs text-emerald-100/90 leading-relaxed">
                {urgentRec.reason}
              </p>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              {urgentRec.status === 'Pending' ? (
                <button
                  onClick={() => applyRecommendation(urgentRec.id)}
                  className="px-4 py-2.5 rounded-xl bg-white hover:bg-emerald-50 text-emerald-900 text-xs font-bold shadow transition-all flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Execute Recommendation</span>
                </button>
              ) : (
                <span className="px-3 py-1.5 rounded-lg bg-emerald-600/50 text-xs text-emerald-100 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Action Applied
                </span>
              )}
              <Link
                to="/dashboard/ai-insights"
                className="px-3 py-2.5 rounded-xl bg-emerald-950/60 hover:bg-emerald-950 text-emerald-200 text-xs font-semibold border border-emerald-700/60 transition-colors"
              >
                All Insights
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Soil Moisture Overview Chart */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Soil Moisture Across Fields</h3>
              <p className="text-xs text-slate-500">Live capacitive root-zone measurement (% VWC)</p>
            </div>
            <div className="flex items-center gap-3 text-[11px] text-slate-500">
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded bg-emerald-600"></span> Actual
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-0.5 bg-amber-500"></span> Min (30%)
              </span>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={fieldMoistureChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={{ stroke: '#cbd5e1' }} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: '#64748b' }} axisLine={{ stroke: '#cbd5e1' }} unit="%" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    borderRadius: '8px',
                    border: '1px solid #e2e8f0',
                    fontSize: '12px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                  }}
                  formatter={(val, name) => [`${val}%`, 'Moisture']}
                />
                <ReferenceLine y={30} stroke="#f59e0b" strokeDasharray="3 3" label={{ value: 'Dry Threshold', fill: '#d97706', fontSize: 10, position: 'right' }} />
                <ReferenceLine y={60} stroke="#3b82f6" strokeDasharray="3 3" label={{ value: 'Saturated', fill: '#2563eb', fontSize: 10, position: 'right' }} />
                <Bar
                  dataKey="moisture"
                  radius={[6, 6, 0, 0]}
                  fill="#059669"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Water Consumption Chart */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">7-Day Water Consumption Trend</h3>
              <p className="text-xs text-slate-500">Actual consumption vs legacy scheduled baseline</p>
            </div>
            <Link
              to="/dashboard/water-analytics"
              className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
            >
              <span>Full Analytics</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weeklyWaterData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="actualGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#059669" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#059669" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={{ stroke: '#cbd5e1' }} />
                <YAxis tick={{ fontSize: 11, fill: '#64748b' }} axisLine={{ stroke: '#cbd5e1' }} tickFormatter={(v) => `${(v/1000).toFixed(0)}kL`} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    borderRadius: '8px',
                    border: '1px solid #e2e8f0',
                    fontSize: '12px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                  }}
                  formatter={(val) => [`${val.toLocaleString()} Liters`]}
                />
                <Area type="monotone" dataKey="baselineWater" stroke="#94a3b8" strokeDasharray="4 4" fill="transparent" name="Baseline" />
                <Area type="monotone" dataKey="actualWater" stroke="#059669" strokeWidth={2.5} fillOpacity={1} fill="url(#actualGrad)" name="Smart System" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Field Health Overview Grid */}
      <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Field Health & Telemetry Status</h3>
            <p className="text-xs text-slate-500">Click any card to inspect multi-depth sensor readings</p>
          </div>
          <Link
            to="/dashboard/fields"
            className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
          >
            <span>View All Fields</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {fields.map(field => {
            const status = getMoistureBadge(field.moisture);

            return (
              <div
                key={field.id}
                onClick={() => setSelectedFieldId(field.id)}
                className="p-4 rounded-xl border border-slate-200 hover:border-emerald-400 bg-slate-50/50 hover:bg-emerald-50/20 cursor-pointer transition-all shadow-xs group"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-mono font-semibold text-slate-500">{field.code}</span>
                    <h4 className="text-xs font-bold text-slate-900 group-hover:text-emerald-800 transition-colors">
                      {field.name}
                    </h4>
                    <p className="text-[11px] text-slate-500">{field.crop}</p>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${status.color}`}>
                    {status.label}
                  </span>
                </div>

                <div className="mt-3">
                  <div className="flex justify-between text-[11px] text-slate-600 mb-1">
                    <span>Soil Moisture:</span>
                    <span className="font-bold text-slate-800">{field.moisture}%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-1.5">
                    <div
                      className={`h-1.5 rounded-full ${field.moisture < 30 ? 'bg-amber-500' : field.moisture > 60 ? 'bg-blue-500' : 'bg-emerald-600'}`}
                      style={{ width: `${Math.min(100, field.moisture)}%` }}
                    />
                  </div>
                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-200/80 flex items-center justify-between text-[11px] text-slate-500">
                  <span>Soil: {field.soilTemp}°C</span>
                  <span className={`font-semibold ${field.sprinklerActive ? 'text-emerald-700 animate-pulse' : 'text-slate-400'}`}>
                    {field.sprinklerActive ? 'Sprinkler Spraying' : 'Idle'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Two Column Bottom: Recent Activity & System Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Irrigation Activity (2 cols) */}
        <div className="lg:col-span-2 p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Recent Irrigation Activity</h3>
              <p className="text-xs text-slate-500">Log of automated cycles and manual activations</p>
            </div>
            <Link
              to="/dashboard/water-analytics"
              className="text-xs font-semibold text-emerald-700 hover:text-emerald-800"
            >
              Full Log
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 font-semibold uppercase text-[10px]">
                  <th className="pb-2.5">Field / Valve</th>
                  <th className="pb-2.5">Time</th>
                  <th className="pb-2.5">Volume</th>
                  <th className="pb-2.5">Trigger Mode</th>
                  <th className="pb-2.5 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentActivities.slice(0, 5).map(act => (
                  <tr key={act.id} className="hover:bg-slate-50">
                    <td className="py-3 font-semibold text-slate-800">
                      <div>{act.field}</div>
                      <span className="text-[10px] font-mono text-slate-400">{act.valveId}</span>
                    </td>
                    <td className="py-3 text-slate-600">
                      <div>{act.timestamp}</div>
                      <span className="text-[10px] text-slate-400">{act.duration}</span>
                    </td>
                    <td className="py-3 font-mono font-medium text-slate-700">
                      {act.volumeLiters.toLocaleString()} L
                    </td>
                    <td className="py-3 text-slate-600 text-[11px]">
                      {act.mode}
                    </td>
                    <td className="py-3 text-right">
                      <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                        act.status === 'Active'
                          ? 'bg-emerald-100 text-emerald-800 animate-pulse'
                          : 'bg-slate-100 text-slate-700'
                      }`}>
                        {act.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* System Diagnostics & Status (1 col) */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900 mb-1">System Health Diagnostics</h3>
            <p className="text-xs text-slate-500 mb-4">Infrastructure heartbeat & edge connectivity</p>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Radio className="w-4 h-4 text-emerald-600" />
                  <div>
                    <div className="font-semibold text-slate-800">LoRaWAN Gateway</div>
                    <div className="text-[10px] text-slate-400">868 MHz ISM Band</div>
                  </div>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  Online (12ms)
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <div>
                    <div className="font-semibold text-slate-800">FDR Capacitive Probes</div>
                    <div className="text-[10px] text-slate-400">24 / 24 Connected</div>
                  </div>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  100% Health
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Sparkles className="w-4 h-4 text-teal-600" />
                  <div>
                    <div className="font-semibold text-slate-800">AI Analytics Model</div>
                    <div className="text-[10px] text-slate-400">ET0 Evapotranspiration v2.4</div>
                  </div>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  Active
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-slate-600" />
                  <div>
                    <div className="font-semibold text-slate-800">Weather Sync</div>
                    <div className="text-[10px] text-slate-400">Micro-climate station</div>
                  </div>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-200 text-slate-700">
                  2m ago
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 text-center">
            <span className="text-[11px] text-slate-400">
              University Sandbox • Sandbox Model ID: AGRI-IOT-2026
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
