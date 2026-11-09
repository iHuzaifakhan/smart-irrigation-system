// Mock Data for Smart Irrigation Management System
// University Digital Transformation Sandbox Project

export const initialFields = [
  {
    id: 'f1',
    name: 'North Orchard - Apples',
    code: 'NO-01',
    crop: 'Honeycrisp Apples',
    hectares: 14.5,
    soilType: 'Sandy Loam',
    moisture: 24, // Low (< 30%)
    targetMoisture: 45,
    minMoisture: 30,
    maxMoisture: 60,
    soilTemp: 20.4,
    airTemp: 24.2,
    humidity: 41,
    sprinklerActive: false,
    durationMinutes: 30,
    timeRemainingSeconds: 0,
    flowRate: 110, // L/min
    valveId: 'V-101',
    sensorHealth: 'Optimal',
    batteryLevel: 94,
    signalStrength: 'Strong (LoRa -78 dBm)',
    lastIrrigated: '18 hours ago (2,400 L)',
    depthReadings: {
      topsoil10cm: 21,
      rootZone30cm: 24,
      subsoil60cm: 29
    },
    history24h: [
      { time: '00:00', moisture: 31, temp: 18.2 },
      { time: '03:00', moisture: 30, temp: 17.5 },
      { time: '06:00', moisture: 29, temp: 17.8 },
      { time: '09:00', moisture: 28, temp: 21.0 },
      { time: '12:00', moisture: 26, temp: 24.5 },
      { time: '15:00', moisture: 25, temp: 25.1 },
      { time: '18:00', moisture: 24, temp: 22.8 },
      { time: '21:00', moisture: 24, temp: 20.4 }
    ]
  },
  {
    id: 'f2',
    name: 'South Valley - Maize',
    code: 'SV-02',
    crop: 'Field Corn / Maize',
    hectares: 28.0,
    soilType: 'Silt Loam',
    moisture: 48, // Optimal (30-60%)
    targetMoisture: 50,
    minMoisture: 32,
    maxMoisture: 65,
    soilTemp: 21.8,
    airTemp: 25.6,
    humidity: 46,
    sprinklerActive: false,
    durationMinutes: 45,
    timeRemainingSeconds: 0,
    flowRate: 180,
    valveId: 'V-102',
    sensorHealth: 'Optimal',
    batteryLevel: 98,
    signalStrength: 'Strong (LoRa -72 dBm)',
    lastIrrigated: '6 hours ago (4,860 L)',
    depthReadings: {
      topsoil10cm: 46,
      rootZone30cm: 48,
      subsoil60cm: 52
    },
    history24h: [
      { time: '00:00', moisture: 54, temp: 19.1 },
      { time: '03:00', moisture: 53, temp: 18.4 },
      { time: '06:00', moisture: 52, temp: 18.9 },
      { time: '09:00', moisture: 51, temp: 22.3 },
      { time: '12:00', moisture: 50, temp: 26.0 },
      { time: '15:00', moisture: 49, temp: 26.8 },
      { time: '18:00', moisture: 48, temp: 23.5 },
      { time: '21:00', moisture: 48, temp: 21.8 }
    ]
  },
  {
    id: 'f3',
    name: 'East Parcel - Wheat',
    code: 'EP-03',
    crop: 'Hard Red Winter Wheat',
    hectares: 35.2,
    soilType: 'Clay Loam',
    moisture: 37, // Optimal
    targetMoisture: 42,
    minMoisture: 28,
    maxMoisture: 55,
    soilTemp: 19.6,
    airTemp: 23.8,
    humidity: 50,
    sprinklerActive: true,
    durationMinutes: 30,
    timeRemainingSeconds: 980, // active countdown
    flowRate: 150,
    valveId: 'V-103',
    sensorHealth: 'Optimal',
    batteryLevel: 89,
    signalStrength: 'Moderate (LoRa -86 dBm)',
    lastIrrigated: 'In progress (1,800 L delivered)',
    depthReadings: {
      topsoil10cm: 39,
      rootZone30cm: 37,
      subsoil60cm: 35
    },
    history24h: [
      { time: '00:00', moisture: 40, temp: 17.5 },
      { time: '03:00', moisture: 39, temp: 16.9 },
      { time: '06:00', moisture: 38, temp: 17.2 },
      { time: '09:00', moisture: 37, temp: 20.4 },
      { time: '12:00', moisture: 35, temp: 24.1 },
      { time: '15:00', moisture: 34, temp: 24.9 },
      { time: '18:00', moisture: 35, temp: 22.0 },
      { time: '21:00', moisture: 37, temp: 19.6 }
    ]
  },
  {
    id: 'f4',
    name: 'West Terrace - Vineyards',
    code: 'WT-04',
    crop: 'Cabernet Sauvignon Vines',
    hectares: 12.0,
    soilType: 'Gravelly Loam',
    moisture: 68, // High / Saturated (> 60%)
    targetMoisture: 40,
    minMoisture: 25,
    maxMoisture: 55,
    soilTemp: 22.1,
    airTemp: 26.5,
    humidity: 62,
    sprinklerActive: false,
    durationMinutes: 20,
    timeRemainingSeconds: 0,
    flowRate: 95,
    valveId: 'V-104',
    sensorHealth: 'Optimal',
    batteryLevel: 99,
    signalStrength: 'Strong (LoRa -69 dBm)',
    lastIrrigated: '48 hours ago (1,140 L)',
    depthReadings: {
      topsoil10cm: 72,
      rootZone30cm: 68,
      subsoil60cm: 64
    },
    history24h: [
      { time: '00:00', moisture: 74, temp: 20.0 },
      { time: '03:00', moisture: 73, temp: 19.2 },
      { time: '06:00', moisture: 72, temp: 19.8 },
      { time: '09:00', moisture: 71, temp: 23.4 },
      { time: '12:00', moisture: 70, temp: 27.1 },
      { time: '15:00', moisture: 69, temp: 27.9 },
      { time: '18:00', moisture: 68, temp: 24.8 },
      { time: '21:00', moisture: 68, temp: 22.1 }
    ]
  },
  {
    id: 'f5',
    name: 'Delta Plot - Soybeans',
    code: 'DP-05',
    crop: 'High-Yield Soybeans',
    hectares: 22.4,
    soilType: 'Alluvial Silt',
    moisture: 27, // Low (< 30%)
    targetMoisture: 48,
    minMoisture: 30,
    maxMoisture: 62,
    soilTemp: 22.7,
    airTemp: 26.0,
    humidity: 39,
    sprinklerActive: true,
    durationMinutes: 40,
    timeRemainingSeconds: 1420, // active countdown
    flowRate: 140,
    valveId: 'V-105',
    sensorHealth: 'Optimal',
    batteryLevel: 92,
    signalStrength: 'Strong (LoRa -75 dBm)',
    lastIrrigated: 'In progress (1,260 L delivered)',
    depthReadings: {
      topsoil10cm: 25,
      rootZone30cm: 27,
      subsoil60cm: 32
    },
    history24h: [
      { time: '00:00', moisture: 34, temp: 20.1 },
      { time: '03:00', moisture: 33, temp: 19.4 },
      { time: '06:00', moisture: 32, temp: 19.8 },
      { time: '09:00', moisture: 30, temp: 23.5 },
      { time: '12:00', moisture: 29, temp: 27.0 },
      { time: '15:00', moisture: 28, temp: 27.5 },
      { time: '18:00', moisture: 27, temp: 24.6 },
      { time: '21:00', moisture: 27, temp: 22.7 }
    ]
  },
  {
    id: 'f6',
    name: 'Green Pasture - Alfalfa',
    code: 'GP-06',
    crop: 'Certified Organic Alfalfa',
    hectares: 18.0,
    soilType: 'Loamy Sand',
    moisture: 52, // Optimal
    targetMoisture: 50,
    minMoisture: 32,
    maxMoisture: 60,
    soilTemp: 21.0,
    airTemp: 24.7,
    humidity: 48,
    sprinklerActive: false,
    durationMinutes: 30,
    timeRemainingSeconds: 0,
    flowRate: 130,
    valveId: 'V-106',
    sensorHealth: 'Optimal',
    batteryLevel: 96,
    signalStrength: 'Strong (LoRa -74 dBm)',
    lastIrrigated: '14 hours ago (3,900 L)',
    depthReadings: {
      topsoil10cm: 50,
      rootZone30cm: 52,
      subsoil60cm: 55
    },
    history24h: [
      { time: '00:00', moisture: 58, temp: 18.8 },
      { time: '03:00', moisture: 57, temp: 18.0 },
      { time: '06:00', moisture: 56, temp: 18.5 },
      { time: '09:00', moisture: 55, temp: 21.9 },
      { time: '12:00', moisture: 54, temp: 25.2 },
      { time: '15:00', moisture: 53, temp: 25.8 },
      { time: '18:00', moisture: 52, temp: 23.1 },
      { time: '21:00', moisture: 52, temp: 21.0 }
    ]
  }
];

export const initialRecommendations = [
  {
    id: 'rec-1',
    fieldId: 'f1',
    fieldName: 'North Orchard - Apples',
    crop: 'Honeycrisp Apples',
    priority: 'Critical',
    title: 'Field A requires immediate irrigation due to low soil moisture',
    reason: 'Soil root-zone moisture has declined to 24% (threshold: 30%). Evapotranspiration is elevated due to 24.2°C ambient temperature and dry wind. Fruit sizing stage requires consistent hydration.',
    suggestedAction: 'Activate micro-sprinkler cycle for 35 minutes (3,850 Liters)',
    durationMinutes: 35,
    timestamp: '14 min ago',
    status: 'Pending',
    confidenceScore: 96,
    evapotranspiration: '5.2 mm/day',
    vaporPressureDeficit: '1.42 kPa',
    weatherContext: 'Dry & Sunny, 0% rain chance next 18h'
  },
  {
    id: 'rec-2',
    fieldId: 'f2',
    fieldName: 'South Valley - Maize',
    crop: 'Field Corn / Maize',
    priority: 'Optimal',
    title: 'Field B has sufficient moisture. Irrigation is not currently required',
    reason: 'Soil moisture is steady at 48%, well within the 32%-65% target band. Subsoil moisture at 60cm remains healthy at 52%. Delaying irrigation prevents water logging and saves 5,400 L.',
    suggestedAction: 'Hold scheduled cycle. Next AI evaluation scheduled for 18:00.',
    durationMinutes: 0,
    timestamp: '32 min ago',
    status: 'Pending',
    confidenceScore: 92,
    evapotranspiration: '4.6 mm/day',
    vaporPressureDeficit: '1.18 kPa',
    weatherContext: 'Clear skies, mild humidity'
  },
  {
    id: 'rec-3',
    fieldId: 'f5',
    fieldName: 'Delta Plot - Soybeans',
    crop: 'High-Yield Soybeans',
    priority: 'Warning',
    title: 'Field C may experience water stress if moisture levels continue to decline',
    reason: 'Moisture is hovering at 27%. Sprinkler valve V-105 is currently running. Recommend extending current run by 15 minutes to reach saturated root depth of 30cm.',
    suggestedAction: 'Maintain active cycle and verify root-zone infiltration rate.',
    durationMinutes: 15,
    timestamp: '48 min ago',
    status: 'Pending',
    confidenceScore: 89,
    evapotranspiration: '4.9 mm/day',
    vaporPressureDeficit: '1.35 kPa',
    weatherContext: 'Moderate afternoon breeze'
  },
  {
    id: 'rec-4',
    fieldId: 'f4',
    fieldName: 'West Terrace - Vineyards',
    crop: 'Cabernet Sauvignon Vines',
    priority: 'Notice',
    title: 'Field D moisture exceeds optimal ceiling; suppress automated cycles',
    reason: 'Moisture measured at 68% following heavy dew and slow percolation in gravelly loam. Cabernet vines require controlled deficit irrigation during veraison to maximize grape quality.',
    suggestedAction: 'Suppress all scheduled irrigations for next 48 hours.',
    durationMinutes: 0,
    timestamp: '2 hours ago',
    status: 'Applied',
    confidenceScore: 95,
    evapotranspiration: '3.8 mm/day',
    vaporPressureDeficit: '0.94 kPa',
    weatherContext: 'Cool morning maritime fog'
  }
];

export const initialRecentActivities = [
  {
    id: 'act-1',
    field: 'East Parcel - Wheat',
    valveId: 'V-103',
    timestamp: 'Today, 04:15 AM',
    duration: '30 mins',
    volumeLiters: 4500,
    mode: 'Automatic (AI Scheduled)',
    status: 'Active',
    efficiencyScore: '97%'
  },
  {
    id: 'act-2',
    field: 'Delta Plot - Soybeans',
    valveId: 'V-105',
    timestamp: 'Today, 04:00 AM',
    duration: '40 mins',
    volumeLiters: 5600,
    mode: 'Automatic (AI Scheduled)',
    status: 'Active',
    efficiencyScore: '94%'
  },
  {
    id: 'act-3',
    field: 'South Valley - Maize',
    valveId: 'V-102',
    timestamp: 'Yesterday, 10:30 PM',
    duration: '27 mins',
    volumeLiters: 4860,
    mode: 'Automatic (Moisture Trigger)',
    status: 'Completed',
    efficiencyScore: '98%'
  },
  {
    id: 'act-4',
    field: 'Green Pasture - Alfalfa',
    valveId: 'V-106',
    timestamp: 'Yesterday, 02:20 PM',
    duration: '30 mins',
    volumeLiters: 3900,
    mode: 'Manual Override',
    status: 'Completed',
    efficiencyScore: '91%'
  },
  {
    id: 'act-5',
    field: 'North Orchard - Apples',
    valveId: 'V-101',
    timestamp: 'Yesterday, 06:00 AM',
    duration: '22 mins',
    volumeLiters: 2420,
    mode: 'Automatic (Pre-Dawn AI)',
    status: 'Completed',
    efficiencyScore: '99%'
  }
];

export const weeklyWaterData = [
  { day: 'Mon', actualWater: 19400, baselineWater: 27500, saved: 8100 },
  { day: 'Tue', actualWater: 16800, baselineWater: 26000, saved: 9200 },
  { day: 'Wed', actualWater: 22100, baselineWater: 29000, saved: 6900 },
  { day: 'Thu', actualWater: 14500, baselineWater: 25000, saved: 10500 },
  { day: 'Fri', actualWater: 21300, baselineWater: 28500, saved: 7200 },
  { day: 'Sat', actualWater: 17900, baselineWater: 26500, saved: 8600 },
  { day: 'Sun (Today)', actualWater: 18450, baselineWater: 27000, saved: 8550 }
];

export const monthlyWaterData = [
  { month: 'Jan', actual: 412000, baseline: 580000, efficiency: 91 },
  { month: 'Feb', actual: 398000, baseline: 540000, efficiency: 92 },
  { month: 'Mar', actual: 480000, baseline: 660000, efficiency: 89 },
  { month: 'Apr', actual: 520000, baseline: 720000, efficiency: 94 },
  { month: 'May', actual: 590000, baseline: 810000, efficiency: 95 },
  { month: 'Jun', actual: 640000, baseline: 890000, efficiency: 93 }
];

export const fieldWaterDistribution = [
  { name: 'South Valley (Maize)', value: 28, liters: 5166, fill: '#059669' },
  { name: 'East Parcel (Wheat)', value: 24, liters: 4428, fill: '#10b981' },
  { name: 'Delta Plot (Soybeans)', value: 20, liters: 3690, fill: '#34d399' },
  { name: 'Green Pasture (Alfalfa)', value: 14, liters: 2583, fill: '#6ee7b7' },
  { name: 'North Orchard (Apples)', value: 9, liters: 1660, fill: '#a7f3d0' },
  { name: 'West Terrace (Vineyards)', value: 5, liters: 923, fill: '#047857' }
];

export const irrigationSchedule = [
  {
    time: '05:00 AM',
    field: 'North Orchard - Apples',
    duration: '35 min',
    mode: 'Automatic',
    status: 'Scheduled',
    reason: 'Soil moisture trigger (<30%)'
  },
  {
    time: '06:15 AM',
    field: 'East Parcel - Wheat',
    duration: '25 min',
    mode: 'Automatic',
    status: 'Running',
    reason: 'Pre-dawn transpiration cycle'
  },
  {
    time: '08:30 AM',
    field: 'Delta Plot - Soybeans',
    duration: '40 min',
    mode: 'Automatic',
    status: 'Running',
    reason: 'Post-flowering water demand'
  },
  {
    time: '07:00 PM',
    field: 'Green Pasture - Alfalfa',
    duration: '30 min',
    mode: 'Scheduled',
    status: 'Upcoming',
    reason: 'Cool evening absorption window'
  },
  {
    time: '08:45 PM',
    field: 'South Valley - Maize',
    duration: '20 min',
    mode: 'Conditional',
    status: 'Pending Sensor Check',
    reason: 'If moisture drops below 40%'
  }
];

export const projectTeam = [
  {
    name: 'Zonaira Khan',
    role: 'Project Lead',
    responsibility: 'Coordination and timeline',
    bio: 'Oversees overall project architecture, milestone tracking, cross-functional integration, and sandbox sandbox delivery.',
    avatar: 'ZK'
  },
  {
    name: 'Maliha Zareen',
    role: 'Process Analyst',
    responsibility: 'Problem, workflow and requirements',
    bio: 'Researched agricultural water waste challenges, modeled field irrigation operational workflows, and mapped user requirements.',
    avatar: 'MZ'
  },
  {
    name: 'Abdullah Pervaiz Khan',
    role: 'Prototype Lead',
    responsibility: 'Digital tools, prototype and testing',
    bio: 'Engineered frontend dashboard components, interactive simulation logic, state management, and responsive UI implementation.',
    avatar: 'AK'
  },
  {
    name: 'Ryaan Khawaja Saud',
    role: 'Data/Ethics & Presentation Lead',
    responsibility: 'Data, responsible technology and presentation',
    bio: 'Formulated telemetry schemas, verified agronomic calculations, authored responsible tech guardrails, and led presentation structure.',
    avatar: 'RS'
  }
];

export const responsibleTechPillars = [
  {
    id: 'security',
    title: 'Data Security & Integrity',
    badge: 'Protection',
    description: 'Protecting on-field IoT telemetry against tampering, unauthorized actuator triggering, or spoofed sensor packets. Field telemetry transmitted over encrypted low-power LoRaWAN with hardware trust validation.',
    points: [
      'Encrypted node-to-gateway transport (AES-128 / TLS)',
      'Local edge validation before actuator commands are committed',
      'Role-based operator access preventing unauthorized overrides',
      'Zero transmission of proprietary farm yield data to external clouds'
    ]
  },
  {
    id: 'accuracy',
    title: 'Sensor Accuracy & Calibration',
    badge: 'Validation',
    description: 'Ensuring multi-depth capacitance sensors and psychrometers are cross-referenced to prevent false watering triggers caused by mineral salinity drift, air gaps, or soil settling.',
    points: [
      'Dual-depth cross-checking (10cm topsoil vs 30cm root zone)',
      'Automated drift detection flagging erratic sensor values',
      'Scheduled recalibration reminders for soil probe pins',
      'Hardware status heartbeat and battery voltage telemetry'
    ]
  },
  {
    id: 'reliability',
    title: 'AI Reliability & Transparency',
    badge: 'Decision Support',
    description: 'AI recommendations are treated strictly as decision-support heuristics, not infallible ground truth. Machine learning models provide confidence percentages and explicit agronomic justifications.',
    points: [
      'Explainable AI reasoning showing VPD, ET0, and weather factors',
      'Confidence scoring with explicit safety thresholds',
      'Graceful degradation: fallback to scheduled timers if sensors disconnect',
      'Clear UI labeling identifying simulated models from ground reality'
    ]
  },
  {
    id: 'oversight',
    title: 'Human Oversight & Safety Override',
    badge: 'Human-in-the-Loop',
    description: 'Agriculturalists maintain sovereign executive control. At any time, human operators can revoke automated scheduling, engage manual valve controls, or trigger an emergency master cutoff.',
    points: [
      'Instantaneous one-click emergency shutoff for all active valves',
      'Manual override authority superseding automated AI algorithms',
      'Configurable dry/saturated safety cutoffs preventing pipe bursts',
      'Detailed audit log tracking who or what initiated each irrigation event'
    ]
  }
];
