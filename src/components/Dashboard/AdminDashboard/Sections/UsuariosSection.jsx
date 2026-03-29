import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, UserX } from 'lucide-react';
import UsersManagement from '../UsersManagement';
import DeleteRequestsManagement from '../DeleteRequestsManagement';

export default function UsuariosSection({ initialAction, clearAction }) {
  const [activeTab, setActiveTab] = useState('users');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-foreground">Gestión de Usuarios</h2>
        <p className="text-muted-foreground">Administra los usuarios, roles y permisos de la plataforma</p>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-muted p-1 rounded-lg w-fit">
        <button
          onClick={() => setActiveTab('users')}
          className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'users'
              ? 'bg-background text-foreground shadow-sm'
              : 'text-muted-foreground hover:bg-background/50'
          }`}
        >
          <Users className="w-4 h-4" />
          Usuarios
        </button>
        <button
          onClick={() => setActiveTab('delete-requests')}
          className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'delete-requests'
              ? 'bg-background text-foreground shadow-sm'
              : 'text-muted-foreground hover:bg-background/50'
          }`}
        >
          <UserX className="w-4 h-4" />
          Solicitudes de Eliminación
        </button>
      </div>

      {/* Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        {activeTab === 'users' ? (
          <UsersManagement initialAction={initialAction} clearAction={clearAction} />
        ) : (
          <DeleteRequestsManagement />
        )}
      </motion.div>
    </div>
  );
}
