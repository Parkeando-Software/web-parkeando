import React, { useState, useEffect, useRef } from "react";
import { Bell, X, Check, Trash2, Mail, Trophy, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import userNotificationService from "@services/userNotificationService";
import { format } from "date-fns";
import { es } from "date-fns/locale";

export default function DashboardNotificationIcon({ mobile = false }) {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef(null);

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const [notifsRes, countRes] = await Promise.all([
        userNotificationService.getNotifications(1),
        userNotificationService.getUnreadCount()
      ]);
      setNotifications(notifsRes.data || []);
      setUnreadCount(countRes.count || 0);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
    
    // Poll every 60 seconds
    const interval = setInterval(fetchNotifications, 60000);
    return () => clearInterval(interval);
  }, []);

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMarkAsRead = async (id, e) => {
    e.stopPropagation();
    try {
      await userNotificationService.markAsRead(id);
      setNotifications(prev => prev.map(n => n.id === id ? { ...n, read_at: new Date().toISOString() } : n));
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (error) {
      console.error("Error marking as read:", error);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await userNotificationService.markAllAsRead();
      setNotifications(prev => prev.map(n => ({ ...n, read_at: new Date().toISOString() })));
      setUnreadCount(0);
    } catch (error) {
      console.error("Error marking all as read:", error);
    }
  };

  const handleDelete = async (id, e) => {
    e.stopPropagation();
    try {
      await userNotificationService.deleteNotification(id);
      setNotifications(prev => prev.filter(n => n.id !== id));
      // If it was unread, decrease count
      const notif = notifications.find(n => n.id === id);
      if (notif && !notif.read_at) {
        setUnreadCount(prev => Math.max(0, prev - 1));
      }
    } catch (error) {
      console.error("Error deleting notification:", error);
    }
  };

  const getIcon = (type) => {
    switch (type) {
      case 'email_received':
        return <Mail className="w-4 h-4 text-blue-500" />;
      case 'raffle_ticket_won':
      case 'raffle_won':
        return <Trophy className="w-4 h-4 text-yellow-500" />;
      case 'points_earned':
        return <Star className="w-4 h-4 text-purple-500" />;
      default:
        return <Bell className="w-4 h-4 text-gray-500" />;
    }
  };



  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition"
      >
        <Bell size={24} className="text-slate-800 dark:text-slate-400" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`absolute top-full mt-2 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden z-50 ${
              mobile 
                ? "left-1/2 -translate-x-1/2 w-[85vw] max-w-sm" 
                : "right-0 w-80 sm:w-96"
            }`}
          >
            <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
              <h3 className="font-semibold text-slate-800 dark:text-slate-200">
                Notificaciones
              </h3>
              {unreadCount > 0 && (
                <button 
                  onClick={handleMarkAllAsRead}
                  className="text-xs text-blue-500 hover:text-blue-600 font-medium"
                >
                  Marcar todo como leído
                </button>
              )}
            </div>

            <div className="max-h-[400px] overflow-y-auto">
              {loading && notifications.length === 0 ? (
                <div className="p-4 text-center text-sm text-slate-500">Cargando...</div>
              ) : notifications.length > 0 ? (
                <ul className="divide-y divide-slate-100 dark:divide-slate-700">
                  {notifications.map((notif) => (
                    <li
                      key={notif.id}
                      className={`p-4 transition-colors ${
                        !notif.read_at ? 'bg-blue-50/50 dark:bg-blue-900/10' : ''
                      }`}
                    >
                      <div className="flex gap-3">
                        <div className={`mt-1 p-2 rounded-full bg-slate-100 dark:bg-slate-800 shrink-0 h-fit`}>
                          {getIcon(notif.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start gap-2 mb-1">
                            <p className={`text-sm font-medium ${!notif.read_at ? 'text-slate-900 dark:text-white' : 'text-slate-700 dark:text-slate-300'}`}>
                              {notif.title}
                            </p>
                            <span className="text-[10px] text-slate-400 whitespace-nowrap">
                              {format(new Date(notif.created_at), "d MMM", { locale: es })}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mb-2">
                            {notif.message}
                          </p>
                          <div className="flex gap-2">
                            {!notif.read_at && (
                              <button
                                onClick={(e) => handleMarkAsRead(notif.id, e)}
                                className="flex items-center gap-1 px-2 py-1 text-xs bg-blue-100 hover:bg-blue-200 dark:bg-blue-900/30 dark:hover:bg-blue-900/50 text-blue-700 dark:text-blue-400 rounded transition-colors"
                                title="Marcar como leída"
                              >
                                <Check className="w-3 h-3" />
                                Marcar como leída
                              </button>
                            )}
                            <button
                              onClick={(e) => handleDelete(notif.id, e)}
                              className="flex items-center gap-1 px-2 py-1 text-xs bg-red-100 hover:bg-red-200 dark:bg-red-900/30 dark:hover:bg-red-900/50 text-red-700 dark:text-red-400 rounded transition-colors"
                              title="Eliminar"
                            >
                              <Trash2 className="w-3 h-3" />
                              Eliminar
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="p-8 text-center">
                  <Bell className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    No tienes notificaciones
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
