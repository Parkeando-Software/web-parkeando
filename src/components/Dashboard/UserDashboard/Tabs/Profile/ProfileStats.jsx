import React from 'react';
import { Car, MapPin, TrendingUp } from "lucide-react";
import StatCard from '@components/Dashboard/UserDashboard/Tabs/Profile/StatCard';

export default function ProfileStats({ totalVehicles, releasedParkings, occupiedParkings }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <StatCard
        icon={<Car className="w-5 h-5 text-white" />}
        color="bg-emerald-500"
        label="Vehículos"
        value={totalVehicles}
      />
      <StatCard
        icon={<MapPin className="w-5 h-5 text-white" />}
        color="bg-[#0083E6]"
        label="Liberados"
        value={releasedParkings}
      />
      <StatCard
        icon={<TrendingUp className="w-5 h-5 text-white" />}
        color="bg-orange-500"
        label="Ocupados"
        value={occupiedParkings}
      />
    </div>
  );
}