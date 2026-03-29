import React, { useState } from 'react';
import { motion } from 'framer-motion';
import StatsOverview from '@components/Dashboard/AdminDashboard/StatsOverview';
import QuickActions from '@components/Dashboard/AdminDashboard/QuickActions';
import UsersManagement from '@components/Dashboard/AdminDashboard/UsersManagement';
import ParkingManagement from '@components/Dashboard/AdminDashboard/ParkingManagement';
import RecentActivity from '@components/Dashboard/AdminDashboard/RecentActivity';
import { ThemeToggle } from '@components/Landing/ThemeToggle';
import { useTheme } from '@context/ThemeContext';
import logo from '@assets/logo.png';
import { Link } from 'react-router-dom';
import { Bell, Search, LayoutDashboard, Users, MapPin, BarChart3, Settings } from 'lucide-react';
import { Input } from '@components/ui/input';

export default function AdminDashboardDemo() {
  const { theme } = useTheme();
  const [activeSection, setActiveSection] = useState('dashboard');

  const menuItems = [
    { id: 'dashboard', icon: <LayoutDashboard className="w-5 h-5" />, label: 'Dashboard' },
    { id: 'users', icon: <Users className="w-5 h-5" />, label: 'Usuarios' },
    { id: 'parkings', icon: <MapPin className="w-5 h-5" />, label: 'Parkings' },
    { id: 'analytics', icon: <BarChart3 className="w-5 h-5" />, label: 'Análisis' },
    { id: 'settings', icon: <Settings className="w-5 h-5" />, label: 'Configuración' },
  ];

  return (
    <div className={`min-h-screen bg-gradient-to-br ${
      theme === 'dark'
        ? 'from-slate-900 via-slate-800 to-slate-900'
        : 'from-blue-50 via-white to-purple-50'
    } transition-colors duration-300`}>
      {/* Header */}
      <header className="fixed w-full z-50 bg-white dark:bg-slate-900 border-b border-border shadow-sm">
        <div className="h-20 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="Logo" className="w-12 h-12" />
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-foreground">Admin Panel</h1>
              <p className="text-xs text-muted-foreground">Parkeando Dashboard</p>
            </div>
          </Link>

          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Buscar usuarios, parkings..."
                className="pl-10 w-full"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <button className="relative p-2 hover:bg-accent rounded-lg transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-semibold">
              A
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <aside className="hidden lg:block fixed left-0 top-20 h-[calc(100vh-5rem)] w-64 bg-card border-r border-border p-4">
        <nav className="space-y-2">
          {menuItems.map((item, index) => (
            <motion.button
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                activeSection === item.id
                  ? 'bg-blue-500 text-white shadow-lg scale-105'
                  : 'hover:bg-accent text-foreground'
              }`}
            >
              {item.icon}
              <span className="font-medium">{item.label}</span>
            </motion.button>
          ))}
        </nav>

        <div className="absolute bottom-4 left-4 right-4">
          <div className="p-4 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-lg border border-blue-500/20">
            <p className="text-sm font-medium text-foreground mb-1">¿Necesitas ayuda?</p>
            <p className="text-xs text-muted-foreground mb-3">Consulta nuestra documentación</p>
            <button className="w-full px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded-lg transition-colors">
              Ver Guía
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-64 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              Panel de Administración
            </h1>
            <p className="text-muted-foreground">
              Bienvenido al panel de control de Parkeando
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <StatsOverview />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <QuickActions />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <UsersManagement />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <ParkingManagement />
              </motion.div>
            </div>

            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="sticky top-24"
              >
                <RecentActivity />
              </motion.div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
