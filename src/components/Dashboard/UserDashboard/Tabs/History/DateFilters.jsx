import React from 'react';
import { Calendar } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const MONTH_NAMES = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

export default function DateFilters({
  availableYears,
  availableMonths,
  selectedYear,
  selectedMonth,
  onYearChange,
  onMonthChange,
}) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
      <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
        <Calendar size={20} />
        <span className="font-medium text-sm">Periodo:</span>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-3 flex-1">
        {/* Select de Año */}
        <div className="flex-1">
          <Select value={selectedYear?.toString() || ""} onValueChange={(value) => onYearChange(parseInt(value))}>
            <SelectTrigger className="bg-white dark:bg-slate-900">
              <SelectValue placeholder="Selecciona año" />
            </SelectTrigger>
            <SelectContent position="popper" side="bottom" align="start" sideOffset={4}>
              {availableYears.map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Select de Mes */}
        <div className="flex-1">
          <Select 
            value={selectedMonth?.toString() || ""} 
            onValueChange={(value) => onMonthChange(parseInt(value))}
            disabled={!selectedYear}
          >
            <SelectTrigger className="bg-white dark:bg-slate-900 disabled:opacity-50 disabled:cursor-not-allowed">
              <SelectValue placeholder={selectedYear ? "Selecciona mes" : "Primero selecciona año"} />
            </SelectTrigger>
            <SelectContent position="popper" side="bottom" align="start" sideOffset={4}>
              {availableMonths.map((month) => (
                <SelectItem key={month} value={month.toString()}>
                  {MONTH_NAMES[month - 1]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
