import React from 'react';
import { motion } from 'framer-motion';

export default function ActivityItem({ icon, title, description, time, iconBg = 'bg-blue-500', onClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      onClick={onClick}
      className="flex items-start gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors cursor-pointer"
    >
      <div className={`${iconBg} p-2 rounded-lg shrink-0`}>
        {icon}
      </div>
      
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground truncate">{title}</p>
        <p className="text-xs text-muted-foreground truncate">{description}</p>
      </div>
      
      <span className="text-xs text-muted-foreground shrink-0">{time}</span>
    </motion.div>
  );
}
