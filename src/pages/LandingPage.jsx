import React from 'react';
import { Link } from 'react-router-dom';
import {
  Droplets,
  Sprout,
  Cpu,
  BarChart2,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Sliders,
  Layers,
  Sparkles,
  Radio,
  Gauge,
  Users,
  Compass,
  AlertCircle,
  HelpCircle,
  Activity
} from 'lucide-react';
import { projectTeam, responsibleTechPillars } from '../data/mockData';

export default function LandingPage() {
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-emerald-100 selection:text-emerald-900">
      {/* Top Banner: University Sandbox */}
      <div className="bg-emerald-950 text-emerald-200 text-xs py-2 px-4 text-center font-medium border-b border-emerald-900">
        <span className="inline-flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          University Digital Transformation Sandbox • Academic Prototype Demonstration • Agricultural IoT & AI
        </span>
      </div>

      {/* Navigation Bar */}
      <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-700 flex items-center justify-center text-white shadow-md shadow-emerald-800/20">
              <Droplets className="w-5 h-5" />
            </div>
            <div>
              <span className="text-base font-bold text-slate-900 tracking-tight block">SmartIrrigation</span>
              <span className="text-[10px] text-emerald-700 font-semibold tracking-wider uppercase block">Agriculture Sandbox</span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-600">
            <button onClick={() => scrollToSection('benefits')} className="hover:text-emerald-700 transition-colors">
              Benefits
            </button>
            <button onClick={() => scrollToSection('how-it-works')} className="hover:text-emerald-700 transition-colors">
              How It Works
            </button>
            <button onClick={() => scrollToSection('emerging-tech')} className="hover:text-emerald-700 transition-colors">
              Emerging Tech
            </button>
            <button onClick={() => scrollToSection('responsible-tech')} className="hover:text-emerald-700 transition-colors">
              Responsible Tech
            </button>
            <button onClick={() => scrollToSection('team')} className="hover:text-emerald-700 transition-colors">
              Project Team
            </button>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-md shadow-emerald-900/10 transition-all hover:translate-y-[-1px]"
            >
              <span>Explore Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28 bg-gradient-to-b from-emerald-50/40 via-white to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            {/* Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100/80 border border-emerald-200 text-emerald-800 text-xs font-medium mb-6">
              <Sprout className="w-3.5 h-3.5 text-emerald-700" />
              <span>Digital Transformation in Precision Agriculture</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Smarter Irrigation. <br />
              <span className="text-emerald-700">Sustainable Agriculture.</span>
            </h1>

            <p className="mt-6 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
              A university sandbox platform demonstrating how low-power IoT soil sensors and AI-assisted analytics optimize field watering cycles, eliminate runoff waste, and empower agriculturalists with data-driven decision making.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
              <Link
                to="/dashboard"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-bold shadow-lg shadow-emerald-900/15 transition-all flex items-center justify-center gap-2 group"
              >
                <span>Explore Dashboard</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button
                onClick={() => scrollToSection('how-it-works')}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 text-sm font-semibold transition-colors flex items-center justify-center gap-2"
              >
                <span>How It Works</span>
              </button>
            </div>

            {/* Quick Metrics highlight */}
            <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto text-left">
              <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-xs">
                <span className="text-[11px] font-semibold uppercase text-slate-400">Water Conservation</span>
                <div className="text-2xl font-bold text-emerald-700 mt-0.5">28% Saved</div>
                <p className="text-[10px] text-slate-500 mt-1">vs traditional timer clocks</p>
              </div>
              <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-xs">
                <span className="text-[11px] font-semibold uppercase text-slate-400">Sensor Probes</span>
                <div className="text-2xl font-bold text-slate-900 mt-0.5">24 Active</div>
                <p className="text-[10px] text-slate-500 mt-1">Multi-depth root-zone FDR</p>
              </div>
              <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-xs">
                <span className="text-[11px] font-semibold uppercase text-slate-400">Decision Model</span>
                <div className="text-2xl font-bold text-slate-900 mt-0.5">AI-Assisted</div>
                <p className="text-[10px] text-slate-500 mt-1">ET0 Evapotranspiration</p>
              </div>
              <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-xs">
                <span className="text-[11px] font-semibold uppercase text-slate-400">Human Control</span>
                <div className="text-2xl font-bold text-emerald-700 mt-0.5">100% Override</div>
                <p className="text-[10px] text-slate-500 mt-1">Operator sovereign safety</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 bg-slate-50/60 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs uppercase tracking-widest font-bold text-emerald-700">Core Value Proposition</h2>
            <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-2">
              Engineered to Solve Real Agricultural Water Challenges
            </h3>
            <p className="text-sm text-slate-600 mt-3 leading-relaxed">
              Traditional calendar-based irrigation wastes up to 40% of fresh water through runoff and over-saturation. Our smart system links soil data directly to valve actuation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Benefit 1 */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-md transition-shadow">
              <div className="w-11 h-11 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4">
                <Droplets className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-slate-900">Reduce Water Wastage</h4>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Dynamically limits water volume to match exact root uptake needs, preventing deep percolation losses and surface soil nutrient leaching.
              </p>
            </div>

            {/* Benefit 2 */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-md transition-shadow">
              <div className="w-11 h-11 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center mb-4">
                <Layers className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-slate-900">Monitor Soil Conditions</h4>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Captures multi-depth volumetric water content at 10cm, 30cm, and 60cm, tracking soil temperature and humidity across all parcel zones.
              </p>
            </div>

            {/* Benefit 3 */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-md transition-shadow">
              <div className="w-11 h-11 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4">
                <Sliders className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-slate-900">Automate Irrigation</h4>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Executes precision watering schedules automatically during low-evaporation hours (pre-dawn or dusk), with seamless instant manual overrides.
              </p>
            </div>

            {/* Benefit 4 */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-md transition-shadow">
              <div className="w-11 h-11 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-slate-900">Improve Decision-Making</h4>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Translates complex agronomic telemetry into clear, prioritized recommendations, preventing both crop water stress and unnecessary pumping costs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs uppercase tracking-widest font-bold text-emerald-700">Closed-Loop Architecture</h2>
            <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-2">
              From Soil Sensing to Actuator Control
            </h3>
            <p className="text-sm text-slate-600 mt-3 leading-relaxed">
              The platform connects the physical agronomic environment with digital analytics through a continuous four-stage telemetry pipeline.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            {/* Step 1 */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 relative group hover:border-emerald-300 transition-colors">
              <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full inline-block mb-4">
                Stage 01
              </span>
              <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-700 mb-3 shadow-xs">
                <Radio className="w-5 h-5 text-emerald-700" />
              </div>
              <h4 className="text-base font-bold text-slate-900">IoT Sensors</h4>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Capacitive FDR probes buried across fields broadcast root moisture, soil temp, and atmospheric vapor deficit over long-range LoRaWAN.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 relative group hover:border-emerald-300 transition-colors">
              <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full inline-block mb-4">
                Stage 02
              </span>
              <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-700 mb-3 shadow-xs">
                <BarChart2 className="w-5 h-5 text-emerald-700" />
              </div>
              <h4 className="text-base font-bold text-slate-900">Digital Dashboard</h4>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Raw packets are ingested, calibrated, and surfaced in real-time KPI cards, historical trend charts, and parcel status indicators.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 relative group hover:border-emerald-300 transition-colors">
              <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full inline-block mb-4">
                Stage 03
              </span>
              <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-700 mb-3 shadow-xs">
                <Sparkles className="w-5 h-5 text-emerald-700" />
              </div>
              <h4 className="text-base font-bold text-slate-900">AI Analytics</h4>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Heuristic models compare current soil moisture with crop evapotranspiration (ET0) and weather forecasts to generate actionable watering decisions.
              </p>
            </div>

            {/* Step 4 */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 relative group hover:border-emerald-300 transition-colors">
              <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full inline-block mb-4">
                Stage 04
              </span>
              <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-700 mb-3 shadow-xs">
                <Droplets className="w-5 h-5 text-emerald-700" />
              </div>
              <h4 className="text-base font-bold text-slate-900">Automated Sprinklers</h4>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Solenoid valves receive actuation pulses to dispense precisely measured liter volumes, self-terminating once saturation target is reached.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Emerging Technology Section */}
      <section id="emerging-tech" className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs uppercase tracking-widest font-bold text-emerald-400">Digital Transformation</h2>
            <h3 className="text-3xl font-extrabold text-white tracking-tight mt-2">
              Emerging Technologies in Modern Agriculture
            </h3>
            <p className="text-sm text-slate-400 mt-3 leading-relaxed">
              How the convergence of edge hardware, low-power telemetry, and machine learning models elevates traditional farming into precision agriculture.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-2xl bg-slate-800/80 border border-slate-700">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  <Cpu className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-bold text-white">IoT Sensors & LoRa Edge Telemetry</h4>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed mb-4">
                Agricultural fields present harsh environments with limited cellular coverage. Our architecture relies on low-power, wide-area networking (LoRaWAN) nodes capable of operating for years on solar and lithium cells.
              </p>
              <ul className="space-y-2.5 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span><strong>Capacitive Soil Probes:</strong> High-frequency impedance measurement resilient to salinity changes.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span><strong>Sub-GHz Signal Penetration:</strong> 10+ km transmission range through dense crop canopies and terrain.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span><strong>Edge Node Heartbeats:</strong> Continuous health diagnostics monitoring battery voltage and signal RSSI.</span>
                </li>
              </ul>
            </div>

            <div className="p-8 rounded-2xl bg-slate-800/80 border border-slate-700">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-xl bg-teal-500/20 text-teal-400 border border-teal-500/30">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-bold text-white">AI-Assisted Evapotranspiration Analytics</h4>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed mb-4">
                Instead of rigid threshold timers, AI algorithms synthesize soil moisture with solar radiation, vapor pressure deficit (VPD), and crop coefficient factors (Kc) to determine the exact dynamic water requirement.
              </p>
              <ul className="space-y-2.5 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-400 mt-0.5 flex-shrink-0" />
                  <span><strong>Crop-Specific Phenology:</strong> Tailors root absorption models to maize, wheat, apples, or vineyards.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-400 mt-0.5 flex-shrink-0" />
                  <span><strong>Predictive Weather Suppression:</strong> Defers irrigation if precipitation probability exceeds 70%.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-400 mt-0.5 flex-shrink-0" />
                  <span><strong>Explainable Recommendations:</strong> Every action discloses its agronomic reasoning and confidence score.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Responsible Technology Section */}
      <section id="responsible-tech" className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-200 text-slate-800 text-xs font-semibold mb-3">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>Ethical & Robust Implementation</span>
            </div>
            <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Responsible Technology Considerations
            </h3>
            <p className="text-sm text-slate-600 mt-3 leading-relaxed">
              Automated agricultural systems cannot afford silent failures or opaque black-box models. We build safeguards directly into the operational architecture.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {responsibleTechPillars.map(pillar => (
              <div key={pillar.id} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                    {pillar.badge}
                  </span>
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                </div>
                <h4 className="text-base font-bold text-slate-900">{pillar.title}</h4>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  {pillar.description}
                </p>
                <div className="mt-4 pt-4 border-t border-slate-100">
                  <ul className="space-y-1.5">
                    {pillar.points.map((pt, i) => (
                      <li key={i} className="text-xs text-slate-700 flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 flex-shrink-0" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Academic Transparency Note */}
          <div className="mt-8 p-4 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
            <div className="text-xs text-amber-900">
              <strong className="font-semibold">AI Reliability Disclaimer:</strong> Recommendations produced by this prototype represent simulated decision-support models. In live agricultural deployments, recommendations must never be treated as infallible ground truth and must always remain subject to agronomist oversight and manual review.
            </div>
          </div>
        </div>
      </section>

      {/* Project Team Section */}
      <section id="team" className="py-20 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold mb-3 border border-emerald-100">
              <Users className="w-3.5 h-3.5 text-emerald-700" />
              <span>University Sandbox Collaborators</span>
            </div>
            <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Project Team & Responsibilities
            </h3>
            <p className="text-sm text-slate-600 mt-3 leading-relaxed">
              Developed as part of the Digital Transformation Sandbox, bringing together multi-disciplinary roles across engineering, process analysis, and ethics.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {projectTeam.map((member) => (
              <div
                key={member.name}
                className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center hover:border-emerald-300 hover:bg-emerald-50/20 transition-all shadow-xs"
              >
                <div className="w-16 h-16 rounded-2xl bg-emerald-700 text-white font-bold text-lg flex items-center justify-center mx-auto mb-4 shadow-md shadow-emerald-900/10">
                  {member.avatar}
                </div>
                <h4 className="text-base font-bold text-slate-900">{member.name}</h4>
                <div className="text-xs font-semibold text-emerald-700 mt-0.5">{member.role}</div>
                <div className="text-[11px] font-mono text-slate-500 uppercase tracking-wider mt-1">
                  {member.responsibility}
                </div>
                <p className="text-xs text-slate-600 mt-3 leading-relaxed border-t border-slate-200/80 pt-3">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-900 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-900">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white">
                <Droplets className="w-5 h-5" />
              </div>
              <div>
                <span className="text-sm font-bold text-white block">Smart Irrigation Management System</span>
                <span className="text-[10px] text-slate-400 block">Digital Transformation Sandbox • Front-end Prototype</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 font-medium text-slate-300">
              <Link to="/dashboard" className="hover:text-emerald-400 transition-colors">Dashboard</Link>
              <Link to="/dashboard/fields" className="hover:text-emerald-400 transition-colors">Field Monitoring</Link>
              <Link to="/dashboard/controls" className="hover:text-emerald-400 transition-colors">Irrigation Control</Link>
              <Link to="/dashboard/ai-insights" className="hover:text-emerald-400 transition-colors">AI Insights</Link>
              <Link to="/dashboard/water-analytics" className="hover:text-emerald-400 transition-colors">Water Analytics</Link>
            </div>

            <div>
              <Link
                to="/dashboard"
                className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold shadow-sm transition-colors"
              >
                Launch App
              </Link>
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500">
            <p>© {new Date().getFullYear()} University Digital Transformation Sandbox. All rights reserved.</p>
            <p>Designed strictly for academic demonstration • No real actuators connected.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
