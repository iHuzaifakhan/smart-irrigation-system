import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import {
  initialFields,
  initialRecommendations,
  initialRecentActivities,
  weeklyWaterData,
  monthlyWaterData,
  fieldWaterDistribution
} from '../data/mockData';

const IrrigationContext = createContext();

export function IrrigationProvider({ children }) {
  // Load state from localStorage if available, or fall back to mock data
  const [fields, setFields] = useState(() => {
    try {
      const saved = localStorage.getItem('sim_fields');
      return saved ? JSON.parse(saved) : initialFields;
    } catch {
      return initialFields;
    }
  });

  const [systemMode, setSystemModeState] = useState(() => {
    try {
      return localStorage.getItem('sim_system_mode') || 'automatic';
    } catch {
      return 'automatic';
    }
  });

  const [recommendations, setRecommendations] = useState(() => {
    try {
      const saved = localStorage.getItem('sim_recommendations');
      return saved ? JSON.parse(saved) : initialRecommendations;
    } catch {
      return initialRecommendations;
    }
  });

  const [recentActivities, setRecentActivities] = useState(() => {
    try {
      const saved = localStorage.getItem('sim_activities');
      return saved ? JSON.parse(saved) : initialRecentActivities;
    } catch {
      return initialRecentActivities;
    }
  });

  const [waterUsedToday, setWaterUsedToday] = useState(18450);
  const [simulationActive, setSimulationActive] = useState(true);
  const [selectedFieldId, setSelectedFieldId] = useState(null);

  const [notifications, setNotifications] = useState([
    {
      id: 'notif-1',
      title: 'Low Moisture Detected',
      message: 'North Orchard moisture fell to 24%. Wilting point threshold breached.',
      type: 'warning',
      timestamp: '10 min ago',
      read: false
    },
    {
      id: 'notif-2',
      title: 'AI Scheduled Irrigation',
      message: 'Valve V-103 activated for East Parcel (Wheat) at 04:15 AM.',
      type: 'info',
      timestamp: '45 min ago',
      read: false
    },
    {
      id: 'notif-3',
      title: 'Efficiency Target Exceeded',
      message: 'Water conservation achieved 28% reduction compared to static timers.',
      type: 'success',
      timestamp: '2 hours ago',
      read: true
    }
  ]);

  const [toasts, setToasts] = useState([]);

  const [settings, setSettings] = useState(() => {
    try {
      const saved = localStorage.getItem('sim_settings');
      return saved ? JSON.parse(saved) : {
        unitSystem: 'metric', // 'metric' (°C, Liters, Hectares) or 'imperial' (°F, Gallons, Acres)
        notificationsEmail: true,
        notificationsPush: true,
        notificationsSms: false,
        dryTriggerThreshold: 30,
        saturatedCutoffThreshold: 65,
        aiOptimizationMode: 'smart-balanced',
        loraCheckInterval: 5,
        pumpMaxPressure: 4.8 // bar
      };
    } catch {
      return {
        unitSystem: 'metric',
        notificationsEmail: true,
        notificationsPush: true,
        notificationsSms: false,
        dryTriggerThreshold: 30,
        saturatedCutoffThreshold: 65,
        aiOptimizationMode: 'smart-balanced',
        loraCheckInterval: 5,
        pumpMaxPressure: 4.8
      };
    }
  });

  // Save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('sim_fields', JSON.stringify(fields));
    } catch (e) {
      console.warn('Failed to save fields to localStorage', e);
    }
  }, [fields]);

  useEffect(() => {
    try {
      localStorage.setItem('sim_system_mode', systemMode);
    } catch (e) {
      console.warn('Failed to save mode to localStorage', e);
    }
  }, [systemMode]);

  useEffect(() => {
    try {
      localStorage.setItem('sim_recommendations', JSON.stringify(recommendations));
    } catch (e) {
      console.warn('Failed to save recommendations to localStorage', e);
    }
  }, [recommendations]);

  useEffect(() => {
    try {
      localStorage.setItem('sim_activities', JSON.stringify(recentActivities));
    } catch (e) {
      console.warn('Failed to save activities to localStorage', e);
    }
  }, [recentActivities]);

  useEffect(() => {
    try {
      localStorage.setItem('sim_settings', JSON.stringify(settings));
    } catch (e) {
      console.warn('Failed to save settings to localStorage', e);
    }
  }, [settings]);

  // Toast helper
  const addToast = (title, message, type = 'info') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    const newToast = { id, title, message, type };
    setToasts(prev => [newToast, ...prev.slice(0, 4)]);

    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4500);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const addNotification = (title, message, type = 'info') => {
    const newNotif = {
      id: Date.now().toString(),
      title,
      message,
      type,
      timestamp: 'Just now',
      read: false
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  // Toggle mode
  const setSystemMode = (mode) => {
    setSystemModeState(mode);
    addToast(
      'System Mode Updated',
      `Switched to ${mode === 'automatic' ? 'Automatic (AI Decision)' : 'Manual (Operator Override)'} mode`,
      'info'
    );
  };

  // Turn sprinkler ON
  const startIrrigation = (fieldId, minutes = 30) => {
    setFields(prev => prev.map(field => {
      if (field.id === fieldId) {
        return {
          ...field,
          sprinklerActive: true,
          durationMinutes: minutes,
          timeRemainingSeconds: minutes * 60,
          lastIrrigated: 'Just started'
        };
      }
      return field;
    }));

    const targetField = fields.find(f => f.id === fieldId);
    const fieldName = targetField ? targetField.name : 'Selected Field';

    const newActivity = {
      id: `act-${Date.now()}`,
      field: fieldName,
      valveId: targetField?.valveId || 'V-10X',
      timestamp: 'Just now',
      duration: `${minutes} mins`,
      volumeLiters: Math.round(minutes * (targetField?.flowRate || 120)),
      mode: systemMode === 'automatic' ? 'Automatic (AI Scheduled)' : 'Manual Operator Override',
      status: 'Active',
      efficiencyScore: '98%'
    };

    setRecentActivities(prev => [newActivity, ...prev]);
    addToast('Irrigation Commenced', `Sprinkler activated for ${fieldName} (${minutes} mins)`, 'success');
    addNotification('Sprinkler Activated', `Valve opened for ${fieldName} for ${minutes} minutes.`, 'info');
  };

  // Turn sprinkler OFF
  const stopIrrigation = (fieldId) => {
    let stoppedField = null;

    setFields(prev => prev.map(field => {
      if (field.id === fieldId) {
        stoppedField = field;
        return {
          ...field,
          sprinklerActive: false,
          timeRemainingSeconds: 0,
          lastIrrigated: 'Just now'
        };
      }
      return field;
    }));

    if (stoppedField) {
      addToast('Sprinkler Stopped', `Irrigation halted for ${stoppedField.name}`, 'warning');
      addNotification('Irrigation Halted', `Manual stop command executed for ${stoppedField.name}.`, 'warning');

      setRecentActivities(prev => prev.map(act => {
        if (act.field === stoppedField.name && act.status === 'Active') {
          return { ...act, status: 'Completed' };
        }
        return act;
      }));
    }
  };

  // Toggle sprinkler
  const toggleSprinkler = (fieldId) => {
    const target = fields.find(f => f.id === fieldId);
    if (!target) return;
    if (target.sprinklerActive) {
      stopIrrigation(fieldId);
    } else {
      startIrrigation(fieldId, target.durationMinutes || 30);
    }
  };

  // Emergency Stop All
  const stopAllSprinklers = () => {
    const activeCount = fields.filter(f => f.sprinklerActive).length;
    if (activeCount === 0) {
      addToast('System Notice', 'No sprinklers are currently active.', 'info');
      return;
    }

    setFields(prev => prev.map(f => ({
      ...f,
      sprinklerActive: false,
      timeRemainingSeconds: 0,
      lastIrrigated: f.sprinklerActive ? 'Stopped just now' : f.lastIrrigated
    })));

    setRecentActivities(prev => prev.map(act => {
      if (act.status === 'Active') {
        return { ...act, status: 'Completed (Emergency Stop)' };
      }
      return act;
    }));

    addToast('Emergency Stop Executed', `All ${activeCount} active sprinkler valves closed immediately.`, 'alert');
    addNotification('Safety Cutoff Engaged', `Operator triggered master shut-off for all field actuators.`, 'warning');
  };

  // Apply AI Recommendation
  const applyRecommendation = (recId) => {
    const rec = recommendations.find(r => r.id === recId);
    if (!rec) return;

    if (rec.fieldId && rec.durationMinutes > 0) {
      startIrrigation(rec.fieldId, rec.durationMinutes);
    }

    setRecommendations(prev => prev.map(r => {
      if (r.id === recId) {
        return { ...r, status: 'Applied' };
      }
      return r;
    }));

    addToast('AI Recommendation Applied', `Executed action for ${rec.fieldName}: ${rec.suggestedAction}`, 'success');
    addNotification('AI Action Executed', `Applied recommendation for ${rec.fieldName}.`, 'success');
  };

  // Dismiss AI Recommendation
  const dismissRecommendation = (recId) => {
    setRecommendations(prev => prev.map(r => {
      if (r.id === recId) {
        return { ...r, status: 'Dismissed' };
      }
      return r;
    }));
    addToast('Recommendation Dismissed', 'Insight archived by operator.', 'info');
  };

  // Update field custom settings
  const updateFieldSettings = (fieldId, partial) => {
    setFields(prev => prev.map(f => f.id === fieldId ? { ...f, ...partial } : f));
    addToast('Field Settings Updated', 'Changes saved successfully.', 'success');
  };

  // Sandbox simulation triggers
  const triggerDroughtSimulation = () => {
    setFields(prev => prev.map(f => {
      if (f.id === 'f1' || f.id === 'f5') {
        return {
          ...f,
          moisture: Math.max(18, f.moisture - 7),
          soilTemp: +(f.soilTemp + 1.2).toFixed(1),
          airTemp: +(f.airTemp + 1.8).toFixed(1),
          humidity: Math.max(28, f.humidity - 8)
        };
      }
      return f;
    }));
    addToast('Simulated Drought Triggered', 'High evapotranspiration event simulated on Fields NO-01 & DP-05.', 'warning');
    addNotification('Drought Condition Alert', 'Simulated heat wave dropped soil moisture below safety thresholds.', 'warning');
  };

  const triggerRainSimulation = () => {
    setFields(prev => prev.map(f => ({
      ...f,
      moisture: Math.min(85, f.moisture + 18),
      sprinklerActive: false,
      timeRemainingSeconds: 0,
      humidity: Math.min(95, f.humidity + 25),
      airTemp: Math.max(16, +(f.airTemp - 3.5).toFixed(1))
    })));
    addToast('Simulated Rainfall Event', '18mm precipitation recorded. All active sprinklers suppressed.', 'info');
    addNotification('Rainfall Detected', 'Sensors recorded precipitation event; scheduled irrigations deferred.', 'info');
  };

  const resetAllData = () => {
    setFields(initialFields);
    setRecommendations(initialRecommendations);
    setRecentActivities(initialRecentActivities);
    setSystemModeState('automatic');
    setWaterUsedToday(18450);
    localStorage.removeItem('sim_fields');
    localStorage.removeItem('sim_system_mode');
    localStorage.removeItem('sim_recommendations');
    localStorage.removeItem('sim_activities');
    localStorage.removeItem('sim_settings');
    addToast('Sandbox Reset', 'All sensor telemetry, controls, and logs restored to baseline.', 'info');
  };

  // Live simulation ticker
  useEffect(() => {
    if (!simulationActive) return;

    const interval = setInterval(() => {
      // Advance active irrigation countdowns and increment water consumption
      setFields(prevFields => {
        let anyChanges = false;
        const updated = prevFields.map(field => {
          if (field.sprinklerActive) {
            anyChanges = true;
            const newSeconds = Math.max(0, field.timeRemainingSeconds - 5);
            // Soil moisture increases while irrigating
            const newMoisture = Math.min(field.maxMoisture + 5, +(field.moisture + 0.15).toFixed(1));

            // Check if timer ended
            if (newSeconds === 0 && field.timeRemainingSeconds > 0) {
              return {
                ...field,
                sprinklerActive: false,
                timeRemainingSeconds: 0,
                moisture: newMoisture,
                lastIrrigated: 'Just completed'
              };
            }

            return {
              ...field,
              timeRemainingSeconds: newSeconds,
              moisture: newMoisture
            };
          } else {
            // Subtle natural sensor jitter (±0.05% moisture, ±0.1°C)
            const jitter = (Math.random() - 0.5) * 0.08;
            const nextMoisture = +(field.moisture + jitter).toFixed(1);
            return {
              ...field,
              moisture: Math.max(10, Math.min(90, nextMoisture))
            };
          }
        });

        return anyChanges ? updated : prevFields;
      });

      // Update water used today based on active sprinklers
      setWaterUsedToday(prev => {
        const activeCount = fields.filter(f => f.sprinklerActive).length;
        if (activeCount > 0) {
          return prev + (activeCount * 8);
        }
        return prev;
      });

    }, 3000);

    return () => clearInterval(interval);
  }, [simulationActive, fields]);

  // Derived state calculations
  const totalFields = fields.length;
  const activeSprinklersCount = fields.filter(f => f.sprinklerActive).length;
  const averageMoisture = Math.round(
    fields.reduce((acc, curr) => acc + curr.moisture, 0) / (totalFields || 1)
  );

  const selectedField = fields.find(f => f.id === selectedFieldId) || null;

  return (
    <IrrigationContext.Provider
      value={{
        fields,
        systemMode,
        setSystemMode,
        toggleSprinkler,
        startIrrigation,
        stopIrrigation,
        stopAllSprinklers,
        recommendations,
        applyRecommendation,
        dismissRecommendation,
        recentActivities,
        waterUsedToday,
        weeklyWaterData,
        monthlyWaterData,
        fieldWaterDistribution,
        notifications,
        markAllNotificationsRead,
        clearNotifications,
        toasts,
        removeToast,
        addToast,
        settings,
        setSettings,
        simulationActive,
        setSimulationActive,
        triggerDroughtSimulation,
        triggerRainSimulation,
        resetAllData,
        totalFields,
        activeSprinklersCount,
        averageMoisture,
        selectedFieldId,
        setSelectedFieldId,
        selectedField,
        updateFieldSettings
      }}
    >
      {children}
    </IrrigationContext.Provider>
  );
}

export function useIrrigation() {
  const context = useContext(IrrigationContext);
  if (!context) {
    throw new Error('useIrrigation must be used within an IrrigationProvider');
  }
  return context;
}
