import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from "@context/AuthContext";
import api from "@/config/api";
import apiRoutes from "@/config/apiRoutes";
import PointsCard from '@components/Dashboard/UserDashboard/Tabs/MyPoints/PointsCard';
import ReputationCard from '@components/Dashboard/UserDashboard/Tabs/MyPoints/ReputationCard';
import QuickActions from '@components/Dashboard/UserDashboard/Tabs/MyPoints/QuickActions';
import PointsHistory from '@components/Dashboard/UserDashboard/Tabs/MyPoints/PointsHistory';
import { formatDate } from '@utils/formatDate';

export default function MyPoints() {
  const { user, isLoading } = useAuth();
  const [pointsHistory, setPointsHistory] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(true);
  const [showHistory, setShowHistory] = useState(false);
  const [showAllHistory, setShowAllHistory] = useState(false);
  const historyRef = useRef(null);
  
  const currentPoints = user?.customer?.points ?? 0;
  const currentReputation = user?.customer?.reputation ?? 5.0;
  
  // Fetch points history
  useEffect(() => {
    const fetchPointsHistory = async () => {
      try {
        setLoadingHistory(true);
        const response = await api.get(apiRoutes.pointsHistory.index());
        setPointsHistory(response.data || []);
      } catch (error) {
        console.error("Error al cargar historial de puntos:", error);
        setPointsHistory([]);
      } finally {
        setLoadingHistory(false);
      }
    };

    fetchPointsHistory();
  }, []);

  // Scroll to history section
  const scrollToHistory = () => {
    setShowHistory(true);
    setShowAllHistory(true);
    setTimeout(() => {
      historyRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  // Hide history section
  const handleHideHistory = () => {
    setShowHistory(false);
    setShowAllHistory(false);
  };
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-48">
        <p className="text-slate-500 dark:text-slate-400">Cargando datos...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-700 pb-4">
        Mis Puntos y Reputación
      </h1>

      {/* Tarjetas de Saldo, Reputación y Acciones Rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <PointsCard points={currentPoints} />
        <ReputationCard reputation={currentReputation} />
        <QuickActions onViewHistory={scrollToHistory} />
      </div>

      {/* Historial de Puntos - Solo mostrar si showHistory es true */}
      {showHistory && (
        <PointsHistory
          history={pointsHistory}
          loading={loadingHistory}
          showAll={showAllHistory}
          onToggleShowAll={setShowAllHistory}
          formatDate={formatDate}
          historyRef={historyRef}
          onHide={handleHideHistory}
        />
      )}
    </div>
  );
}