import React, { useState } from 'react';
import {
  Sprout,
  Droplets,
  Thermometer,
  Wind,
  Layers,
  Search,
  Filter,
  Play,
  Square,
  AlertTriangle,
  CheckCircle2,
  BatteryCharging,
  Radio,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { useIrrigation } from '../../context/IrrigationContext';

export default function FieldMonitoringPage() {
  const {
    fields,
    setSelectedFieldId,
    toggleSprinkler,
    systemMode
  } = useIrrigation();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all'); // 'all', 'low', 'optimal', 'high', 'active'

  const getMoistureCategory = (moisture) => {
    if (moisture < 30) return 'low';
    if (moisture > 60) return 'high';
    return 'optimal';
  };

  const getMoistureBadge = (moisture) => {
    if (moisture < 30) {
      return {
        label: 'Low Moisture',
        badgeClass: 'bg-amber-100 text-amber-800 border-amber-300',
        barColor: 'bg-amber-500',
        note: 'Requires watering'
      };
    }
    if (moisture > 60) {
      return {
        label: 'High Moisture',
        badgeClass: 'bg-blue-100 text-blue-800 border-blue-300',
        barColor: 'bg-blue-500',
        note: 'Saturated root zone'
      };
    }
    return {
      label: 'Optimal Moisture',
      badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      barColor: 'bg-emerald-600',
      note: 'Ideal growth condition'
    };
  };

  const filteredFields = fields.filter(field => {
    const matchesSearch =
      field.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      field.crop.toLowerCase().includes(searchQuery.toLowerCase()) ||
      field.code.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (statusFilter === 'all') return true;
    if (statusFilter === 'active') return field.sprinklerActive;
    return getMoistureCategory(field.moisture) === statusFilter;
  });

  const lowCount = fields.filter(f => f.moisture < 30).length;
  const optimalCount = fields.filter(f => f.moisture >= 30 && f.moisture <= 60).length;
  const highCount = fields.filter(f => f.moisture > 60).length;
  const activeCount = fields.filter(f => f.sprinklerActive).length;

  return (
    <div className="space-y-6">
      {/* Header Description & Summary Pills */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
        <div>
          <h2 className="text-base font-bold text-slate-900">Comprehensive Field Telemetry</h2>
          <p className="text-xs text-slate-500 mt-1">
            Real-time multi-depth capacitance sensor readings, micro-climate measurements, and individual parcel valve status.
          </p>
        </div>

        {/* Quick Filter Counters */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
              statusFilter === 'all'
                ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
            }`}
          >
            All ({fields.length})
          </button>
          <button
            onClick={() => setStatusFilter('low')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
              statusFilter === 'low'
                ? 'bg-amber-600 text-white border-amber-600 shadow-xs'
                : 'bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100'
            }`}
          >
            Low Moisture ({lowCount})
          </button>
          <button
            onClick={() => setStatusFilter('optimal')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
              statusFilter === 'optimal'
                ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs'
                : 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
            }`}
          >
            Optimal ({optimalCount})
          </button>
          <button
            onClick={() => setStatusFilter('high')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
              statusFilter === 'high'
                ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                : 'bg-blue-50 text-blue-800 border-blue-200 hover:bg-blue-100'
            }`}
          >
            High / Saturated ({highCount})
          </button>
          <button
            onClick={() => setStatusFilter('active')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
              statusFilter === 'active'
                ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                : 'bg-emerald-50/50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
            }`}
          >
            Active Sprinklers ({activeCount})
          </button>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search by field name, crop type (e.g. Apples, Maize, Wheat), or parcel code..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 shadow-xs"
        />
      </div>

      {/* Fields Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredFields.map(field => {
          const badge = getMoistureBadge(field.moisture);

          return (
            <div
              key={field.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between overflow-hidden group"
            >
              {/* Card Header */}
              <div className="p-5 border-b border-slate-100">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-slate-500 px-2 py-0.5 rounded bg-slate-100 border border-slate-200">
                      {field.code}
                    </span>
                    <h3 className="text-sm font-bold text-slate-900 mt-1.5 group-hover:text-emerald-800 transition-colors">
                      {field.name}
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {field.crop} • {field.hectares} ha
                    </p>
                  </div>

                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${badge.badgeClass}`}>
                    {badge.label}
                  </span>
                </div>

                {/* Moisture Gauge Bar */}
                <div className="mt-4">
                  <div className="flex items-baseline justify-between text-xs mb-1.5">
                    <span className="text-slate-500 font-medium">Volumetric Water Content:</span>
                    <span className="font-extrabold text-slate-900 text-sm">
                      {field.moisture}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                    <div
                      className={`h-2.5 rounded-full transition-all duration-500 ${badge.barColor}`}
                      style={{ width: `${Math.min(100, field.moisture)}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                    <span>Dry (&lt;30%)</span>
                    <span>Target: {field.targetMoisture}%</span>
                    <span>Saturated (&gt;60%)</span>
                  </div>
                </div>
              </div>

              {/* Sensor Telemetry Row */}
              <div className="px-5 py-3.5 bg-slate-50/70 grid grid-cols-3 gap-2 text-center border-b border-slate-100 text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 block font-medium">Soil Temp</span>
                  <span className="font-bold text-slate-800 mt-0.5 block">{field.soilTemp}°C</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block font-medium">Ambient Temp</span>
                  <span className="font-bold text-slate-800 mt-0.5 block">{field.airTemp}°C</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block font-medium">Humidity</span>
                  <span className="font-bold text-slate-800 mt-0.5 block">{field.humidity}%</span>
                </div>
              </div>

              {/* Hardware Health & Valve Status */}
              <div className="p-5 space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-600">
                  <div className="flex items-center gap-1.5">
                    <BatteryCharging className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Battery: <strong>{field.batteryLevel}%</strong></span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Radio className="w-3.5 h-3.5 text-blue-600" />
                    <span>Node: <strong>{field.sensorHealth}</strong></span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-100/70 border border-slate-200 text-xs">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${field.sprinklerActive ? 'bg-emerald-500 animate-ping' : 'bg-slate-400'}`} />
                    <span className="font-medium text-slate-700">
                      Sprinkler Valve {field.valveId}:
                    </span>
                  </div>
                  <span className={`font-bold ${field.sprinklerActive ? 'text-emerald-700' : 'text-slate-500'}`}>
                    {field.sprinklerActive ? 'Actively Spraying' : 'Closed'}
                  </span>
                </div>

                {/* Actions: View Details vs Quick Sprinkler Toggle */}
                <div className="flex items-center gap-2 pt-1">
                  <button
                    onClick={() => setSelectedFieldId(field.id)}
                    className="flex-1 py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>Detailed View</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => toggleSprinkler(field.id)}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold shadow-xs transition-colors flex items-center justify-center gap-1.5 ${
                      field.sprinklerActive
                        ? 'bg-rose-600 hover:bg-rose-700 text-white'
                        : 'bg-emerald-700 hover:bg-emerald-800 text-white'
                    }`}
                  >
                    {field.sprinklerActive ? (
                      <>
                        <Square className="w-3 h-3 fill-white" />
                        <span>Stop</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-3 h-3 fill-white" />
                        <span>Spray</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredFields.length === 0 && (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
          <Sprout className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <h4 className="text-sm font-bold text-slate-700">No matching fields found</h4>
          <p className="text-xs text-slate-400 mt-1">Try adjusting your filter or search keywords</p>
          <button
            onClick={() => { setSearchQuery(''); setStatusFilter('all'); }}
            className="mt-4 px-4 py-2 rounded-lg bg-emerald-700 text-white text-xs font-semibold"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}
