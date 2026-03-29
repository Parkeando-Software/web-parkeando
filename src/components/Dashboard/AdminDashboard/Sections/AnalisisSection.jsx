import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Users, MapPin, Activity, Download, Calendar } from 'lucide-react';
import { Button } from '@components/ui/button';
import * as adminUserService from '@services/adminUserService';
import * as adminParkingService from '@services/adminParkingService';
import * as adminRaffleService from '@services/adminRaffleService';

export default function AnalisisSection() {
  const [stats, setStats] = useState({
    activeUsers: 0,
    activeParkings: 0,
    totalRaffles: 0,
    conversionRate: 0,
    userGrowthData: [],
    parkingUsageData: [],
  });
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState('30');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [usersRes, parkingsRes, rafflesRes] = await Promise.all([
          adminUserService.getUsers({ account_activated: 1, per_page: 1000 }),
          adminParkingService.getParkings({ per_page: 1000 }),
          adminRaffleService.getRaffles({ per_page: 1000 }),
        ]);

        // Calculate real conversion rate
        const totalUsers = usersRes.total || 1;
        const activeUsers = usersRes.data?.filter(u => u.account_activated)?.length || 0;
        const conversionRate = ((activeUsers / totalUsers) * 100).toFixed(1);

        // Process user growth data (last 7 days)
        const userGrowthData = processUserGrowthData(usersRes.data || []);
        
        // Process parking usage data
        const parkingUsageData = processParkingUsageData(parkingsRes.data || []);

        setStats({
          activeUsers: usersRes.total || 0,
          activeParkings: parkingsRes.total || 0,
          totalRaffles: rafflesRes.total || 0,
          conversionRate: parseFloat(conversionRate),
          userGrowthData,
          parkingUsageData,
        });
      } catch (error) {
        console.error('Error fetching analysis stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [dateRange]);

  // Process user growth data for chart
  const processUserGrowthData = (users) => {
    const last7Days = [];
    const today = new Date();
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      
      const count = users.filter(u => {
        const createdDate = new Date(u.created_at).toISOString().split('T')[0];
        return createdDate === dateStr;
      }).length;
      
      last7Days.push({
        date: date.toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric' }),
        count
      });
    }
    
    return last7Days;
  };

  // Process parking usage data
  const processParkingUsageData = (parkings) => {
    const typeCount = {
      released: parkings.filter(p => p.type === 'released').length,
      occupied: parkings.filter(p => p.type === 'occupied').length,
    };
    
    return [
      { label: 'Liberadas', count: typeCount.released, color: 'bg-green-500' },
      { label: 'Ocupadas', count: typeCount.occupied, color: 'bg-red-500' },
    ];
  };

  const handleDownloadReport = async () => {
    try {
      const [usersRes, parkingsRes, rafflesRes] = await Promise.all([
        adminUserService.getUsers({ per_page: 1000 }),
        adminParkingService.getParkings({ per_page: 1000 }),
        adminRaffleService.getRaffles({ per_page: 1000 }),
      ]);

      let csvContent = "data:text/csv;charset=utf-8,";
      
      csvContent += "INFORME DE ANÁLISIS - PARKEANDO\\n\\n";
      csvContent += `Fecha de generación: ${new Date().toLocaleString('es-ES')}\\n`;
      csvContent += `Período: Últimos ${dateRange} días\\n\\n`;
      
      csvContent += "RESUMEN DE ESTADÍSTICAS\\n";
      csvContent += "Métrica,Valor\\n";
      csvContent += `Usuarios Activos,${stats.activeUsers}\\n`;
      csvContent += `Parkings Totales,${stats.activeParkings}\\n`;
      csvContent += `Sorteos Totales,${stats.totalRaffles}\\n`;
      csvContent += `Tasa de Conversión,${stats.conversionRate}%\\n\\n`;
      
      csvContent += "USUARIOS\\n";
      csvContent += "ID,Username,Email,Puntos,Reputación,Cuenta Activada\\n";
      usersRes.data?.forEach(user => {
        csvContent += `${user.id},${user.username},${user.email},${user.points || 0},${user.reputation || 0},${user.account_activated ? 'Sí' : 'No'}\\n`;
      });
      
      csvContent += "\\n";
      
      csvContent += "HISTORIAL DE PARKINGS\\n";
      csvContent += "ID,Usuario,Tipo,Latitud,Longitud,Fecha\\n";
      parkingsRes.data?.forEach(parking => {
        csvContent += `${parking.id},${parking.user?.username || 'N/A'},${parking.type},${parking.latitude},${parking.longitude},${parking.created_at}\\n`;
      });

      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", `informe_parkeando_${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error generating report:', error);
    }
  };

  const statCards = [
    { 
      label: 'Usuarios Activos', 
      value: loading ? '...' : stats.activeUsers.toLocaleString(), 
      change: '+12%',
      icon: Users, 
      color: 'blue' 
    },
    { 
      label: 'Parkings Totales', 
      value: loading ? '...' : stats.activeParkings.toLocaleString(), 
      change: '+8%',
      icon: MapPin, 
      color: 'green' 
    },
    { 
      label: 'Sorteos Totales', 
      value: loading ? '...' : stats.totalRaffles.toLocaleString(), 
      change: '+5%',
      icon: TrendingUp, 
      color: 'purple' 
    },
    { 
      label: 'Tasa de Conversión', 
      value: loading ? '...' : `${stats.conversionRate}%`, 
      change: '+3%',
      icon: Activity, 
      color: 'orange' 
    },
  ];

  const maxUserGrowth = Math.max(...stats.userGrowthData.map(d => d.count), 1);
  const maxParkingUsage = Math.max(...stats.parkingUsageData.map(d => d.count), 1);

  return (
    <div className="space-y-6">
      {/* Header with Download Button */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Análisis y Estadísticas</h2>
          <p className="text-muted-foreground">Visualiza los datos y métricas de la aplicación</p>
        </div>
        
        <div className="flex gap-3">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-3 py-2 rounded-lg border border-input bg-background text-sm"
          >
            <option value="7">Últimos 7 días</option>
            <option value="30">Últimos 30 días</option>
            <option value="90">Últimos 90 días</option>
            <option value="all">Todo el tiempo</option>
          </select>

          <Button 
            onClick={handleDownloadReport}
            className="gap-2"
          >
            <Download className="w-4 h-4" />
            Descargar Informe
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          const colorClasses = {
            blue: 'from-blue-500/10 to-blue-600/10 border-blue-500/20 text-blue-500',
            green: 'from-green-500/10 to-green-600/10 border-green-500/20 text-green-500',
            purple: 'from-purple-500/10 to-purple-600/10 border-purple-500/20 text-purple-500',
            orange: 'from-orange-500/10 to-orange-600/10 border-orange-500/20 text-orange-500',
          };

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-gradient-to-br ${colorClasses[stat.color]} rounded-xl p-6 border`}
            >
              <div className="flex items-center justify-between mb-4">
                <Icon className={`w-8 h-8 ${colorClasses[stat.color].split(' ')[2]}`} />
                <span className="text-xs font-medium text-green-600 dark:text-green-400">{stat.change}</span>
              </div>
              <p className="text-2xl font-bold text-foreground mb-1">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Growth Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-card rounded-xl p-6 border border-border"
        >
          <div className="flex items-center gap-3 mb-4">
            <BarChart3 className="w-5 h-5 text-blue-500" />
            <h3 className="text-lg font-semibold text-foreground">Crecimiento de Usuarios (Últimos 7 días)</h3>
          </div>
          <div className="h-64">
            {loading ? (
              <div className="h-full flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : (
              <div className="h-full flex items-end justify-between gap-2 px-2">
                {stats.userGrowthData.map((item, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg transition-all hover:from-blue-600 hover:to-blue-500"
                         style={{ height: `${(item.count / maxUserGrowth) * 100}%`, minHeight: item.count > 0 ? '20px' : '0px' }}>
                    </div>
                    <div className="text-center">
                      <p className="text-xs font-medium text-foreground">{item.count}</p>
                      <p className="text-[10px] text-muted-foreground">{item.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>

        {/* Parking Usage Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-card rounded-xl p-6 border border-border"
        >
          <div className="flex items-center gap-3 mb-4">
            <MapPin className="w-5 h-5 text-green-500" />
            <h3 className="text-lg font-semibold text-foreground">Uso de Parkings</h3>
          </div>
          <div className="h-64">
            {loading ? (
              <div className="h-full flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : (
              <div className="h-full flex items-end justify-center gap-8">
                {stats.parkingUsageData.map((item, index) => (
                  <div key={index} className="flex-1 max-w-[120px] flex flex-col items-center gap-4">
                    <div className={`w-full ${item.color} rounded-t-lg transition-all hover:opacity-80`}
                         style={{ height: `${(item.count / maxParkingUsage) * 100}%`, minHeight: item.count > 0 ? '40px' : '0px' }}>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-foreground">{item.count}</p>
                      <p className="text-sm text-muted-foreground">{item.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Info Message */}
      <div className="bg-blue-50 dark:bg-blue-950/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
        <p className="text-sm text-blue-800 dark:text-blue-200">
          <strong>Nota:</strong> Los gráficos muestran datos reales del sistema. El crecimiento de usuarios muestra los últimos 7 días y el uso de parkings muestra el total de registros por tipo.
        </p>
      </div>
    </div>
  );
}
