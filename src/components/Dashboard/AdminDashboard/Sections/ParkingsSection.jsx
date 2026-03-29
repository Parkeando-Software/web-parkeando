import React from 'react';
import { motion } from 'framer-motion';
import ParkingManagement from '../ParkingManagement';

export default function ParkingsSection({ initialAction, clearAction }) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-foreground">Gestión de Parkings</h2>
        <p className="text-muted-foreground">Administra las notificaciones de parking y plazas disponibles</p>
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        <ParkingManagement initialAction={initialAction} clearAction={clearAction} />
      </motion.div>
    </div>
  );
}
