import React, { useState } from 'react';
import {
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Info,
  Clock,
  ArrowRight,
  Droplets,
  Wind,
  Sun,
  ShieldCheck,
  Check,
  X,
  Sliders,
  Filter,
  Layers
} from 'lucide-react';
import { useIrrigation } from '../../context/IrrigationContext';

export default function AIInsightsPage() {
  const {
    recommendations,
    applyRecommendation,
    dismissRecommendation,
    setSelectedFieldId
  } = useIrrigation();

  const [priorityFilter, setPriorityFilter] = useState('all');

  const filteredRecs = recommendations.filter(r => {
    if (priorityFilter === 'all') return true;
    return r.priority.toLowerCase() === priorityFilter.toLowerCase();
  });

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'Critical':
        return 'bg-rose-100 text-rose-800 border-rose-300';
      case 'Warning':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'Optimal':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      default:
        return 'bg-blue-100 text-blue-800 border-blue-300';
    }
  };

  return (
    <div className="space-y-6">
      {/* Transparency & AI Disclaimer Banner */}
      <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 flex items-start gap-3.5">
        <div className="p-2 rounded-xl bg-amber-500 text-white flex-shrink-0 mt-0.5 shadow-xs">
          <Info className="w-4 h-4" />
        </div>
        <div className="text-xs text-amber-900 leading-relaxed">
          <h3 className="font-bold text-amber-950">Simulated AI-Assisted Decision Support Notice</h3>
          <p className="mt-0.5">
            The recommendations displayed below represent simulated algorithmic decisions derived from capacitive soil moisture probes, ambient psychrometric readings, and agronomic evapotranspiration equations. They serve strictly as educational decision-support heuristics and should not be treated as infallible ground truth.
          </p>
        </div>
      </div>

      {/* Environmental Parameters Card Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span className="font-semibold uppercase tracking-wider">Reference ET (ET0)</span>
            <Sun className="w-4 h-4 text-amber-500" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-slate-900">4.8 mm/day</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-2">Hargreaves-Penman model calculation</p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span className="font-semibold uppercase tracking-wider">Vapor Deficit (VPD)</span>
            <Wind className="w-4 h-4 text-blue-500" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-slate-900">1.32 kPa</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-2">Moderate transpirational pull</p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span className="font-semibold uppercase tracking-wider">Solar Radiation</span>
            <Sun className="w-4 h-4 text-amber-600" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-slate-900">22.4 MJ/m²</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-2">Clear sky canopy absorption</p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span className="font-semibold uppercase tracking-wider">Model Health</span>
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-emerald-700">95.4%</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-2">Historical heuristic calibration</p>
        </div>
      </div>

      {/* Filter and Overview Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
        <div>
          <h2 className="text-base font-bold text-slate-900">Active Agronomic Recommendations</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Generated by comparing multi-tier sensor telemetry against crop wilting thresholds.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Filter:
          </span>
          {['all', 'critical', 'warning', 'optimal'].map(filterKey => (
            <button
              key={filterKey}
              onClick={() => setPriorityFilter(filterKey)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize border transition-all ${
                priorityFilter === filterKey
                  ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              {filterKey}
            </button>
          ))}
        </div>
      </div>

      {/* Recommendations Cards List */}
      <div className="space-y-4">
        {filteredRecs.map(rec => (
          <div
            key={rec.id}
            className={`p-6 rounded-2xl border transition-all shadow-xs ${
              rec.status === 'Applied'
                ? 'bg-slate-50/70 border-slate-200 opacity-80'
                : rec.priority === 'Critical'
                ? 'bg-white border-rose-200 hover:border-rose-300'
                : 'bg-white border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
              <div className="flex-1 space-y-2">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase border ${getPriorityBadge(rec.priority)}`}>
                    {rec.priority} Priority
                  </span>
                  <button
                    onClick={() => setSelectedFieldId(rec.fieldId)}
                    className="text-xs font-bold text-slate-800 hover:text-emerald-700 underline underline-offset-2 flex items-center gap-1"
                  >
                    <span>{rec.fieldName}</span>
                    <span className="text-[10px] text-slate-400 font-normal">({rec.crop})</span>
                  </button>
                  <span className="text-slate-300">•</span>
                  <span className="text-xs text-slate-400 font-medium">{rec.timestamp}</span>
                  <span className="text-slate-300">•</span>
                  <span className="text-[10px] font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    {rec.confidenceScore}% Confidence
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 tracking-tight">
                  {rec.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed max-w-3xl">
                  {rec.reason}
                </p>

                {/* Telemetry context tags */}
                <div className="pt-2 flex flex-wrap gap-3 text-[11px] text-slate-500">
                  <span className="bg-slate-100 px-2.5 py-1 rounded-md">
                    ET Rate: <strong className="text-slate-700">{rec.evapotranspiration}</strong>
                  </span>
                  <span className="bg-slate-100 px-2.5 py-1 rounded-md">
                    Vapor Deficit: <strong className="text-slate-700">{rec.vaporPressureDeficit}</strong>
                  </span>
                  <span className="bg-slate-100 px-2.5 py-1 rounded-md">
                    Micro-climate: <strong className="text-slate-700">{rec.weatherContext}</strong>
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row md:flex-col gap-2 flex-shrink-0 self-end md:self-center">
                {rec.status === 'Pending' ? (
                  <>
                    <button
                      onClick={() => applyRecommendation(rec.id)}
                      className="px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow transition-all flex items-center justify-center gap-1.5"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Apply Recommendation</span>
                    </button>
                    <button
                      onClick={() => dismissRecommendation(rec.id)}
                      className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
                    >
                      <X className="w-3.5 h-3.5" />
                      <span>Dismiss</span>
                    </button>
                  </>
                ) : (
                  <div className="px-4 py-2 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Action Applied</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        {filteredRecs.length === 0 && (
          <div className="p-12 text-center bg-white rounded-2xl border border-slate-200">
            <Sparkles className="w-8 h-8 text-slate-300 mx-auto mb-2" />
            <h4 className="text-sm font-bold text-slate-700">No recommendations matching filter</h4>
            <p className="text-xs text-slate-400 mt-1">All fields are operating within expected parameters.</p>
          </div>
        )}
      </div>

      {/* How It Works & Agronomic Modeling Deep Dive */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
        <h3 className="text-sm font-bold text-slate-900">
          How Sensor Data Generates Irrigation Recommendations
        </h3>
        <p className="text-xs text-slate-600 leading-relaxed">
          The simulated AI engine uses a multi-factor agricultural heuristic inspired by the FAO-56 Penman-Monteith method. Instead of relying solely on surface moisture, it evaluates:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs pt-2">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div className="flex items-center gap-2 font-bold text-slate-800 mb-1.5">
              <Layers className="w-4 h-4 text-emerald-700" />
              <span>1. Multi-Depth Gradient</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Compares 10cm surface moisture against 30cm root-zone and 60cm subsoil. If deep soil is moist, irrigation is withheld to encourage deep root growth.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div className="flex items-center gap-2 font-bold text-slate-800 mb-1.5">
              <Sun className="w-4 h-4 text-amber-600" />
              <span>2. Vapor Pressure Deficit</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Calculates air drying power from temperature and relative humidity. High VPD indicates rapid water loss, prompting pre-emptive delivery.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div className="flex items-center gap-2 font-bold text-slate-800 mb-1.5">
              <ShieldCheck className="w-4 h-4 text-teal-600" />
              <span>3. Phenological Crop Stages</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Applies crop coefficient curves (Kc). For example, maize during tasseling has critical water demand, whereas vineyards near harvest benefit from controlled deficit.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
