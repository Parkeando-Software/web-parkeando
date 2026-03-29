import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LayoutDashboard, Users, MapPin, BarChart3, Settings, Trophy, Store, Mail } from 'lucide-react';

export default function AdminSidebar({ activeSection, onSectionChange }) {
  const menuItems = [
    { id: 'dashboard', icon: <LayoutDashboard className="w-5 h-5" />, label: 'Dashboard' },
    { id: 'usuarios', icon: <Users className="w-5 h-5" />, label: 'Usuarios' },
    { id: 'parkings', icon: <MapPin className="w-5 h-5" />, label: 'Parkings' },
    { id: 'sorteos', icon: <Trophy className="w-5 h-5" />, label: 'Sorteos' },
    { id: 'emails', icon: <Mail className="w-5 h-5" />, label: 'Correo' },
    { id: 'appstore', icon: <Store className="w-5 h-5" />, label: 'App Store' },
    { id: 'analisis', icon: <BarChart3 className="w-5 h-5" />, label: 'Análisis' },
    { id: 'configuracion', icon: <Settings className="w-5 h-5" />, label: 'Configuración' },
  ];

  return (
    <aside className="hidden lg:block fixed left-0 top-20 h-[calc(100vh-5rem)] w-64 bg-card border-r border-border p-4">
      <nav className="space-y-2">
        {menuItems.map((item, index) => (
          <motion.button
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => onSectionChange(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all cursor-pointer ${
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

      {/* Sidebar Footer */}
      <div className="absolute bottom-4 left-4 right-4">
        <div className="p-4 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-lg border border-blue-500/20">
          <p className="text-sm font-medium text-foreground mb-1">¿Necesitas ayuda?</p>
          <p className="text-xs text-muted-foreground mb-3">Consulta nuestra documentación</p>
          <button 
            onClick={() => onSectionChange('guia')}
            className="w-full px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded-lg transition-colors cursor-pointer"
          >
            Ver Guía
          </button>
        </div>
      </div>
    </aside>
  );
}
