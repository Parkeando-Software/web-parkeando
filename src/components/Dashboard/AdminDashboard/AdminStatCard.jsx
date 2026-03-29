import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';

export default function AdminStatCard({ icon, label, value, trend, trendValue, color = 'bg-gradient-to-br from-blue-500 to-blue-600', onClick }) {
  const isPositive = trend === 'up';
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClick}
      className={`bg-gradient-to-br from-slate-50 to-white dark:from-slate-800 dark:to-slate-900 border border-border rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 ${onClick ? 'cursor-pointer' : ''}`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-muted-foreground text-sm font-medium mb-2">{label}</p>
          <motion.h3
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="text-3xl font-bold text-foreground mb-2"
          >
            {value}
          </motion.h3>
          
          {trendValue && (
            <div className={`flex items-center gap-1 text-sm ${isPositive ? 'text-emerald-500' : 'text-red-500'}`}>
              {isPositive ? (
                <TrendingUp className="w-4 h-4" />
              ) : (
                <TrendingDown className="w-4 h-4" />
              )}
              <span className="font-medium">{trendValue}</span>
            </div>
          )}
        </div>
        
        <div className={`${color} p-3 rounded-lg shadow-md`}>
          {icon}
        </div>
      </div>
    </motion.div>
  );
}
