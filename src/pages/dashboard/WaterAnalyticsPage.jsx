import React, { useState } from 'react';
import {
  BarChart3,
  TrendingDown,
  Droplets,
  Calendar,
  Download,
  Filter,
  CheckCircle2,
  Layers,
  ArrowUpRight,
  Sparkles
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid
} from 'recharts';
import { useIrrigation } from '../../context/IrrigationContext';

export default function WaterAnalyticsPage() {
  const {
    waterUsedToday,
    weeklyWaterData,
    monthlyWaterData,
    fieldWaterDistribution,
    recentActivities,
    addToast
  } = useIrrigation();

  const [timeRange, setTimeRange] = useState('weekly'); // 'daily', 'weekly', 'monthly'
  const [historyFilter, setHistoryFilter] = useState('all');

  // Daily hourly breakdown data
  const dailyHourlyData = [
    { time: '00:00', waterUsed: 120, baseline: 800 },
    { time: '04:00', waterUsed: 4200, baseline: 5500 },
    { time: '08:00', waterUsed: 3800, baseline: 6200 },
    { time: '12:00', waterUsed: 1100, baseline: 4900 },
    { time: '16:00', waterUsed: 2300, baseline: 3800 },
    { time: '20:00', waterUsed: 4900, baseline: 5800 }
  ];

  const handleExportCSV = () => {
    addToast('Report Export Initiated', 'Simulated CSV export generated for water auditing.', 'success');
  };

  const filteredActivities = recentActivities.filter(act => {
    if (historyFilter === 'all') return true;
    if (historyFilter === 'active') return act.status === 'Active';
    if (historyFilter === 'auto') return act.mode.toLowerCase().includes('auto');
    if (historyFilter === 'manual') return act.mode.toLowerCase().includes('manual');
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Top Banner KPI Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span className="font-semibold uppercase tracking-wider">Water Used (Today)</span>
            <div className="p-2 rounded-lg bg-emerald-50 text-emerald-700">
              <Droplets className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900 tracking-tight">
              {waterUsedToday.toLocaleString()}
            </span>
            <span className="text-xs font-medium text-slate-500">Liters</span>
          </div>
          <p className="text-[11px] text-emerald-700 font-medium mt-2 flex items-center gap-1">
            <TrendingDown className="w-3.5 h-3.5" />
            31% less than timer baseline
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span className="font-semibold uppercase tracking-wider">7-Day Cumulative Savings</span>
            <div className="p-2 rounded-lg bg-teal-50 text-teal-700">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-teal-700 tracking-tight">
              59,100
            </span>
            <span className="text-xs font-medium text-slate-500">Liters Preserved</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-2">Prevents deep groundwater depletion</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span className="font-semibold uppercase tracking-wider">Water Efficiency Index</span>
            <div className="p-2 rounded-lg bg-blue-50 text-blue-700">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900 tracking-tight">94.2%</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-2">Root-zone absorption vs delivered volume</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span className="font-semibold uppercase tracking-wider">Runoff Reduction</span>
            <div className="p-2 rounded-lg bg-amber-50 text-amber-700">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900 tracking-tight">88%</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-2">Surface runoff virtually eliminated</p>
        </div>
      </div>

      {/* Main Consumption Trend with Timeframe Switcher */}
      <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-base font-bold text-slate-900">Water Consumption Overview</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Comparing intelligent sensor-guided volumes against conventional calendar timer schedules.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="p-1 bg-slate-100 rounded-xl border border-slate-200 flex">
              <button
                onClick={() => setTimeRange('daily')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  timeRange === 'daily'
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Hourly (Today)
              </button>
              <button
                onClick={() => setTimeRange('weekly')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  timeRange === 'weekly'
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                7-Day Weekly
              </button>
              <button
                onClick={() => setTimeRange('monthly')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  timeRange === 'monthly'
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                6-Month Trend
              </button>
            </div>

            <button
              onClick={handleExportCSV}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors"
              title="Download simulated report"
            >
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Chart View based on selected timeRange */}
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            {timeRange === 'daily' ? (
              <BarChart data={dailyHourlyData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="time" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={{ stroke: '#cbd5e1' }} />
                <YAxis tick={{ fontSize: 11, fill: '#64748b' }} axisLine={{ stroke: '#cbd5e1' }} tickFormatter={(v) => `${(v/1000).toFixed(1)}kL`} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '12px' }}
                  formatter={(val, name) => [`${val.toLocaleString()} L`, name === 'waterUsed' ? 'Smart Irrigation' : 'Conventional Baseline']}
                />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar dataKey="baseline" name="Baseline (Scheduled)" fill="#cbd5e1" radius={[4, 4, 0, 0]} />
                <Bar dataKey="waterUsed" name="Smart System (Actual)" fill="#059669" radius={[4, 4, 0, 0]} />
              </BarChart>
            ) : timeRange === 'weekly' ? (
              <BarChart data={weeklyWaterData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={{ stroke: '#cbd5e1' }} />
                <YAxis tick={{ fontSize: 11, fill: '#64748b' }} axisLine={{ stroke: '#cbd5e1' }} tickFormatter={(v) => `${(v/1000).toFixed(0)}kL`} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '12px' }}
                  formatter={(val, name) => [`${val.toLocaleString()} L`, name === 'actualWater' ? 'Smart Usage' : 'Conventional Baseline']}
                />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar dataKey="baselineWater" name="Baseline (No Sensors)" fill="#cbd5e1" radius={[4, 4, 0, 0]} />
                <Bar dataKey="actualWater" name="Smart System (Actual)" fill="#059669" radius={[4, 4, 0, 0]} />
              </BarChart>
            ) : (
              <AreaChart data={monthlyWaterData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="monthlyGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#059669" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#059669" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={{ stroke: '#cbd5e1' }} />
                <YAxis tick={{ fontSize: 11, fill: '#64748b' }} axisLine={{ stroke: '#cbd5e1' }} tickFormatter={(v) => `${(v/1000).toFixed(0)}kL`} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '12px' }}
                  formatter={(val, name) => [`${val.toLocaleString()} L`, name === 'actual' ? 'Smart Total' : 'Baseline Total']}
                />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Area type="monotone" dataKey="baseline" name="Baseline Volume" stroke="#94a3b8" strokeDasharray="4 4" fill="transparent" />
                <Area type="monotone" dataKey="actual" name="Smart System Volume" stroke="#059669" strokeWidth={2.5} fill="url(#monthlyGrad)" />
              </AreaChart>
            )}
          </ResponsiveContainer>
        </div>
      </div>

      {/* Two Column Section: Water Distribution & Irrigation History */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Water Distribution by Field (1 col) */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900 mb-1">Water Usage Distribution</h3>
            <p className="text-xs text-slate-500 mb-4">Volume allocated across farm parcels today</p>

            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={fieldWaterDistribution}
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {fieldWaterDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(val, name, entry) => [`${entry.payload.liters.toLocaleString()} L (${val}%)`, entry.payload.name]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Breakdown List */}
            <div className="space-y-2 mt-2">
              {fieldWaterDistribution.map(item => (
                <div key={item.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.fill }} />
                    <span className="text-slate-700 truncate max-w-[140px]">{item.name}</span>
                  </div>
                  <span className="font-mono font-semibold text-slate-800">
                    {item.liters.toLocaleString()} L ({item.value}%)
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Irrigation History Log Table (2 cols) */}
        <div className="lg:col-span-2 p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Irrigation Event History</h3>
              <p className="text-xs text-slate-500">Comprehensive audit record of all watering cycles</p>
            </div>

            <div className="flex items-center gap-1.5">
              {['all', 'active', 'auto', 'manual'].map(f => (
                <button
                  key={f}
                  onClick={() => setHistoryFilter(f)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold capitalize border transition-all ${
                    historyFilter === f
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 font-semibold uppercase text-[10px]">
                  <th className="pb-2.5">Field / Valve</th>
                  <th className="pb-2.5">Timestamp</th>
                  <th className="pb-2.5">Duration</th>
                  <th className="pb-2.5">Volume (L)</th>
                  <th className="pb-2.5">Trigger Source</th>
                  <th className="pb-2.5 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredActivities.map(act => (
                  <tr key={act.id} className="hover:bg-slate-50">
                    <td className="py-3 font-semibold text-slate-800">
                      <div>{act.field}</div>
                      <span className="text-[10px] font-mono text-slate-400">{act.valveId}</span>
                    </td>
                    <td className="py-3 text-slate-600">
                      {act.timestamp}
                    </td>
                    <td className="py-3 text-slate-700 font-medium">
                      {act.duration}
                    </td>
                    <td className="py-3 font-mono font-bold text-emerald-800">
                      {act.volumeLiters.toLocaleString()}
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
      </div>
    </div>
  );
}
