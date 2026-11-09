import React from 'react';
import { useIrrigation } from '../context/IrrigationContext';
import { CheckCircle2, AlertTriangle, Info, AlertCircle, X } from 'lucide-react';

export default function ToastContainer() {
  const { toasts, removeToast } = useIrrigation();

  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map(toast => {
        const getIcon = () => {
          switch (toast.type) {
            case 'success':
              return <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />;
            case 'warning':
              return <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0" />;
            case 'alert':
              return <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0" />;
            default:
              return <Info className="w-5 h-5 text-blue-600 flex-shrink-0" />;
          }
        };

        const getBorderColor = () => {
          switch (toast.type) {
            case 'success':
              return 'border-emerald-200 bg-white/95';
            case 'warning':
              return 'border-amber-200 bg-white/95';
            case 'alert':
              return 'border-rose-200 bg-white/95';
            default:
              return 'border-blue-200 bg-white/95';
          }
        };

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-3.5 rounded-xl border shadow-lg backdrop-blur-md transition-all duration-300 animate-in slide-in-from-bottom-2 ${getBorderColor()}`}
          >
            <div className="mt-0.5">{getIcon()}</div>
            <div className="flex-1 min-w-0">
              <h4 className="text-xs font-semibold text-slate-900 tracking-tight">{toast.title}</h4>
              <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">{toast.message}</p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-slate-600 p-0.5 rounded transition-colors"
              aria-label="Close notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
