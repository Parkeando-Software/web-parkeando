import React from 'react';
import { motion } from 'framer-motion';
import { UserPlus, MapPin, Trophy, Star } from 'lucide-react';
import { Button } from '@components/ui/button';

export default function QuickActions({ onNavigate, onCreateUser, onCreateParking, onCreateRaffle, onCreateReview }) {
  const actions = [
    { 
      icon: <UserPlus className="w-5 h-5" />, 
      label: 'Nuevo Usuario', 
      color: 'bg-emerald-500 hover:bg-emerald-600',
      action: onCreateUser
    },
    { 
      icon: <MapPin className="w-5 h-5" />, 
      label: 'Generar Plaza', 
      color: 'bg-blue-500 hover:bg-blue-600',
      action: onCreateParking
    },
    { 
      icon: <Trophy className="w-5 h-5" />, 
      label: 'Crear Nuevo Sorteo', 
      color: 'bg-orange-500 hover:bg-orange-600',
      action: onCreateRaffle
    },
    { 
      icon: <Star className="w-5 h-5" />, 
      label: 'Crear Reseña', 
      color: 'bg-purple-500 hover:bg-purple-600',
      action: onCreateReview
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {actions.map((action, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 }}
        >
          <Button
            onClick={action.action}
            className={`w-full ${action.color} text-white h-auto py-4 flex flex-col items-center gap-2 shadow-lg hover:shadow-xl transition-all`}
          >
            {action.icon}
            <span className="text-sm font-medium">{action.label}</span>
          </Button>
        </motion.div>
      ))}
    </div>
  );
}
