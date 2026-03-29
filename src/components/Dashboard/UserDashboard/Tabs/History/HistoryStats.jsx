import React from "react";
import {
  History as HistoryIcon,
  SquareParking,
  LocateFixed,
} from "lucide-react";
import StatCard from "@components/Dashboard/UserDashboard/Tabs/History/StatCard";

export default function HistoryStats({
  total,
  released,
  occupied,
  filter,
  setFilter,
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <StatCard
        label="Total Movimientos"
        count={total}
        icon={<HistoryIcon size={24} />}
        active={filter === "all"}
        onClick={() => setFilter("all")}
        color="violet"
      />
      <StatCard
        label="Plazas Liberadas"
        count={released}
        icon={<LocateFixed size={24} />}
        active={filter === "released"}
        onClick={() => setFilter("released")}
        color="blue"
      />
      <StatCard
        label="Plazas Ocupadas"
        count={occupied}
        icon={<SquareParking size={24} />}
        active={filter === "occupied"}
        onClick={() => setFilter("occupied")}
        color="green"
      />
    </div>
  );
}
