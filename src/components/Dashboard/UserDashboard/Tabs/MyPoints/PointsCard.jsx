import React from 'react';
import { Diamond } from 'lucide-react';

export default function PointsCard({ points }) {
  return (
    <div className="md:col-span-1 bg-linear-to-br from-[#0083E6] to-[#005ba1] text-white p-6 rounded-xl shadow-lg transform hover:scale-[1.02] transition duration-300">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold opacity-80">Puntos Disponibles</p>
        <Diamond size={24} className="opacity-90" />
      </div>
      <p className="text-5xl font-bold mt-2">
        {points.toLocaleString()}
      </p>
      <p className="text-xs mt-2 opacity-70">
        Acumulados por liberar plazas
      </p>
    </div>
  );
}
