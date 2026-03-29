import React from 'react';
import { motion } from 'framer-motion';
import { LayoutDashboard, Users, MapPin, BarChart3, Settings, X, Power, User, Trophy, BookOpen, Store, Mail } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@context/AuthContext';
import api from '@/config/api';
import apiRoutes from '@/config/apiRoutes';

export default function AdminMobileMenu({ isOpen, onClose, activeSection, onSectionChange }) {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const menuItems = [
    { id: 'dashboard', icon: <LayoutDashboard className="w-5 h-5" />, label: 'Dashboard' },
    { id: 'usuarios', icon: <Users className="w-5 h-5" />, label: 'Usuarios' },
    { id: 'parkings', icon: <MapPin className="w-5 h-5" />, label: 'Parkings' },
    { id: 'sorteos', icon: <Trophy className="w-5 h-5" />, label: 'Sorteos' },
    { id: 'emails', icon: <Mail className="w-5 h-5" />, label: 'Correo' },
    { id: 'appstore', icon: <Store className="w-5 h-5" />, label: 'App Store' },
    { id: 'analisis', icon: <BarChart3 className="w-5 h-5" />, label: 'Análisis' },
    { id: 'configuracion', icon: <Settings className="w-5 h-5" />, label: 'Configuración' },
    { id: 'guia', icon: <BookOpen className="w-5 h-5" />, label: 'Guía' },
  ];

  const handleLogout = async () => {
    try {
      await api.post(apiRoutes.logout());
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    } finally {
      logout();
      navigate('/login');
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/50 z-50 lg:hidden"
      />

      {/* Menu */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed right-0 top-0 h-full w-80 bg-card border-l border-border shadow-2xl z-50 lg:hidden flex flex-col"
      >
        {/* Header */}
        <div className="p-6 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg">
              A
            </div>
            <div>
              <p className="font-semibold text-foreground">Administrador</p>
              <p className="text-xs text-muted-foreground">admin@parkeando.com</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-accent rounded-lg transition-colors"
            aria-label="Cerrar menú"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 overflow-y-auto p-4 pb-32 space-y-2">
          {menuItems.map((item, index) => (
            <motion.button
              key={item.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => {
                onSectionChange(item.id);
                onClose();
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all cursor-pointer ${
                activeSection === item.id
                  ? 'bg-blue-500 text-white shadow-lg'
                  : 'hover:bg-accent text-foreground'
              }`}
            >
              {item.icon}
              <span className="font-medium">{item.label}</span>
            </motion.button>
          ))}
        </nav>

        {/* Logout Button */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border space-y-2">
          {/* Enlace al panel de usuario */}
          <Link
            to="/user"
            onClick={onClose}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-blue-500 hover:bg-blue-600 text-white transition-colors cursor-pointer"
          >
            <User className="w-5 h-5" />
            <span className="font-medium">Panel Usuario</span>
          </Link>
          
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-red-500 hover:bg-red-600 text-white transition-colors cursor-pointer"
          >
            <Power className="w-5 h-5" />
            <span className="font-medium">Cerrar sesión</span>
          </button>
        </div>
      </motion.div>
    </>
  );
}
