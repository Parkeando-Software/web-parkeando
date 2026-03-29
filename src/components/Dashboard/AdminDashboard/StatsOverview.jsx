import React, { useState, useEffect } from 'react';
import { Users, MapPin, Trophy, Trash2, Car, Download, Server } from 'lucide-react';
import AdminStatCard from './AdminStatCard';
import * as adminUserService from '@services/adminUserService';
import * as adminParkingService from '@services/adminParkingService';
import * as adminRaffleService from '@services/adminRaffleService';
import * as adminDeleteRequestService from '@services/adminDeleteRequestService';
import api from '@config/api';
import apiRoutes from '@config/apiRoutes';

export default function StatsOverview({ onSectionChange }) {
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    pendingDeleteRequests: 0,
    occupiedParkings: 0,    
    releasedParkings: 0,
    totalRaffles: 0,
    totalVehicles: 0,
    totalDownloads: '0',
    serverStatus: 'OFF',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Check server status independently to not block other stats if it fails
        let serverStatus = 'OFF';
        try {
          await api.get(apiRoutes.admin.serverStatus());
          serverStatus = 'ON';
        } catch (e) {
          console.error('Server status check failed:', e);
          serverStatus = 'OFF';
        }

        const [
          usersRes, 
          activeUsersRes,
          deleteRequestsRes,
          occupiedParkingsRes, 
          releasedParkingsRes,
          rafflesRes,
          vehicleStatsRes,
          appStoreStatsRes
        ] = await Promise.all([
          adminUserService.getUsers({ per_page: 1 }),
          adminUserService.getUsers({ account_activated: 1, per_page: 1 }),
          adminDeleteRequestService.getDeleteRequests({ status: 'processing', per_page: 1 }),
          adminParkingService.getParkings({ type: 'occupied', per_page: 1 }), 
          adminParkingService.getParkings({ type: 'released', per_page: 1 }),
          adminRaffleService.getRaffles({ per_page: 1 }),
          adminUserService.getVehicleStats(),
          api.get(apiRoutes.admin.appStore.stats())
        ]);

        setStats({
          totalUsers: usersRes.total || 0,
          activeUsers: activeUsersRes.total || 0,
          pendingDeleteRequests: deleteRequestsRes.total || 0,
          occupiedParkings: occupiedParkingsRes.total || 0, 
          releasedParkings: releasedParkingsRes.total || 0,
          totalRaffles: rafflesRes.total || 0,
          totalVehicles: vehicleStatsRes.total_vehicles || 0,
          totalDownloads: appStoreStatsRes.data.total_downloads || '0',
          serverStatus,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statsConfig = [
    {
      icon: <Server className="w-6 h-6 text-white" />,
      label: 'Estado Servidor',
      value: loading ? '...' : stats.serverStatus,
      color: stats.serverStatus === 'ON' ? 'bg-gradient-to-br from-green-500 to-green-600' : 'bg-gradient-to-br from-red-500 to-red-600',
    },
    {
      icon: <Users className="w-6 h-6 text-white" />,
      label: 'Total Usuarios',
      value: loading ? '...' : stats.totalUsers.toLocaleString(),
      color: 'bg-gradient-to-br from-blue-500 to-blue-600',
    },
    {
      icon: <Car className="w-6 h-6 text-white" />,
      label: 'Total Vehículos',
      value: loading ? '...' : stats.totalVehicles.toLocaleString(),
      color: 'bg-gradient-to-br from-cyan-500 to-cyan-600',
    },
    {
      icon: <Download className="w-6 h-6 text-white" />,
      label: 'Total Descargas',
      value: loading ? '...' : stats.totalDownloads,
      color: 'bg-gradient-to-br from-violet-500 to-violet-600',
    },
    {
      icon: <Trash2 className="w-6 h-6 text-white" />,
      label: 'Solicitudes Pendientes',
      value: loading ? '...' : stats.pendingDeleteRequests.toLocaleString(),
      color: 'bg-gradient-to-br from-red-500 to-red-600',
    },
    {
      icon: <MapPin className="w-6 h-6 text-white" />,
      label: 'Plazas Ocupadas',
      value: loading ? '...' : stats.occupiedParkings.toLocaleString(),
      color: 'bg-gradient-to-br from-orange-500 to-orange-600',
    },
    {
      icon: <MapPin className="w-6 h-6 text-white" />,
      label: 'Plazas Liberadas',
      value: loading ? '...' : stats.releasedParkings.toLocaleString(),
      color: 'bg-gradient-to-br from-emerald-500 to-emerald-600',
    },
    {
      icon: <Trophy className="w-6 h-6 text-white" />,
      label: 'Total Sorteos',
      value: loading ? '...' : stats.totalRaffles.toLocaleString(),
      color: 'bg-gradient-to-br from-yellow-500 to-orange-600',
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statsConfig.map((stat, index) => (
        <AdminStatCard key={index} {...stat} />
      ))}
    </div>
  );
}
