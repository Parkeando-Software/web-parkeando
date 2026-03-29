import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useTheme } from "@context/ThemeContext";
import { motion } from "framer-motion";
import { Gift, Trophy, Calendar, Clock, Ticket, Award, History } from "lucide-react";
import api from "@config/api";
import apiRoutes from "@config/apiRoutes";

// Utility function to format ticket numbers with 6 digits
const formatTicketNumber = (number) => {
  return String(number).padStart(6, '0');
};

export default function Lottery() {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const [loading, setLoading] = useState(true);
  const [activeRaffle, setActiveRaffle] = useState(null);
  const [userTickets, setUserTickets] = useState([]);
  const [raffleHistory, setRaffleHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    fetchRaffleData();
  }, []);

  const fetchRaffleData = async () => {
    try {
      setLoading(true);
      
      // Fetch active raffle
      const activeResponse = await api.get(apiRoutes.raffles.index());
      setActiveRaffle(activeResponse.data.active_raffle);
      setUserTickets(activeResponse.data.user_tickets || []);
      
      // Fetch raffle history
      const historyResponse = await api.get(apiRoutes.raffles.history());
      setRaffleHistory(historyResponse.data.history || []);
    } catch (error) {
      console.error("Error fetching raffle data:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric' 
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0083E6]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          <Gift className="text-[#0083E6]" size={28} />
          {t('dashboard.tabs.lottery.title', 'Sorteos')}
        </h2>
        {raffleHistory.length > 0 && (
          <button
            onClick={() => setShowHistory(!showHistory)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
              showHistory
                ? "bg-[#0083E6] text-white"
                : theme === "dark"
                ? "bg-slate-800 text-slate-300 hover:bg-slate-700"
                : "bg-white text-slate-600 border hover:bg-slate-100"
            }`}
          >
            <History size={18} />
            {showHistory ? t('dashboard.tabs.lottery.hideHistory', 'Ocultar Histórico') : t('dashboard.tabs.lottery.showHistory', 'Ver Histórico')}
          </button>
        )}
      </div>

      {/* Active Raffle Section */}
      {!showHistory && (
        <div>
          {activeRaffle ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`rounded-2xl p-6 ${
                theme === "dark"
                  ? "bg-linear-to-br from-slate-800 to-slate-900 border border-slate-700"
                  : "bg-linear-to-br from-white to-blue-50 border border-blue-100"
              }`}
            >
              <div className="grid md:grid-cols-2 gap-6">
                {/* Left: Raffle Info */}
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Trophy className="text-yellow-500 mt-1" size={32} />
                    <div>
                      <h3 className="text-2xl font-bold text-[#0083E6] dark:text-blue-400">
                        {activeRaffle.title}
                      </h3>
                      <p className={`mt-2 ${theme === "dark" ? "text-slate-300" : "text-slate-600"}`}>
                        {activeRaffle.description}
                      </p>
                    </div>
                  </div>

                  {/* Raffle Details */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar size={16} className="text-[#0083E6]" />
                      <span className={theme === "dark" ? "text-slate-300" : "text-slate-600"}>
                        {t('dashboard.tabs.lottery.period', 'Período')}: {formatDate(activeRaffle.start_date)} - {formatDate(activeRaffle.end_date)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock size={16} className="text-[#0083E6]" />
                      <span className={theme === "dark" ? "text-slate-300" : "text-slate-600"}>
                        {t('dashboard.tabs.lottery.daysRemaining', 'Días restantes')}: <strong>{activeRaffle.days_remaining}</strong>
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Ticket size={16} className="text-[#0083E6]" />
                      <span className={theme === "dark" ? "text-slate-300" : "text-slate-600"}>
                        {t('dashboard.tabs.lottery.totalParticipants', 'Total participantes')}: <strong>{activeRaffle.participants_count}</strong>
                      </span>
                    </div>
                  </div>

                  {/* Prize Image */}
                  {activeRaffle.image_path && (
                    <div className="mt-4">
                      <img
                        src={activeRaffle.image_path}
                        alt={activeRaffle.title}
                        className="w-full max-w-xs rounded-lg shadow-lg"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                </div>

                {/* Right: User Tickets */}
                <div>
                  <div className={`rounded-xl p-4 ${
                    theme === "dark" ? "bg-slate-700/50" : "bg-white/80"
                  }`}>
                    <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <Award className="text-[#0083E6]" size={20} />
                      {t('dashboard.tabs.lottery.yourTickets', 'Tus Números')}
                    </h4>
                    
                    {userTickets.length > 0 ? (
                      <div>
                        <p className={`text-sm mb-3 ${theme === "dark" ? "text-slate-300" : "text-slate-600"}`}>
                          {t('dashboard.tabs.lottery.ticketCount', `Tienes ${userTickets.length} números para este sorteo`)}
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 max-h-64 overflow-y-auto">
                          {userTickets.map((ticket, index) => (
                            <div
                              key={index}
                              className={`text-center py-2 px-3 rounded-lg font-mono font-bold text-lg ${
                                theme === "dark"
                                  ? "bg-slate-600 text-yellow-400"
                                  : "bg-blue-100 text-blue-700"
                              }`}
                            >
                              {formatTicketNumber(ticket)}
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <p className={`text-sm ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}>
                        {t('dashboard.tabs.lottery.noTickets', 'Aún no tienes números para este sorteo. ¡Libera plazas para participar!')}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`rounded-2xl p-8 text-center ${
                theme === "dark"
                  ? "bg-slate-800 border border-slate-700"
                  : "bg-white border border-slate-200"
              }`}
            >
              <Gift className="mx-auto mb-4 text-slate-400" size={48} />
              <h3 className="text-xl font-semibold mb-2">
                {t('dashboard.tabs.lottery.noActiveRaffle', 'No hay sorteos activos')}
              </h3>
              <p className={theme === "dark" ? "text-slate-400" : "text-slate-500"}>
                {t('dashboard.tabs.lottery.noActiveRaffleDesc', 'En este momento no hay ningún sorteo en curso. ¡Vuelve pronto!')}
              </p>
            </motion.div>
          )}
        </div>
      )}

      {/* Raffle History Section */}
      {showHistory && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <History className="text-[#0083E6]" size={24} />
            {t('dashboard.tabs.lottery.historyTitle', 'Histórico de Sorteos')}
          </h3>

          {raffleHistory.length > 0 ? (
            <div className="space-y-4">
              {raffleHistory.map((raffle) => (
                <motion.div
                  key={raffle.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={`rounded-xl p-5 ${
                    theme === "dark"
                      ? "bg-linear-to-br from-slate-800 to-slate-900 border border-slate-700"
                      : "bg-linear-to-br from-white to-slate-50 border border-slate-200"
                  }`}
                >
                  <div className="grid md:grid-cols-3 gap-4">
                    {/* Raffle Info */}
                    <div className="md:col-span-2">
                      <h4 className="text-lg font-bold text-[#0083E6] dark:text-blue-400 mb-2">
                        {raffle.title}
                      </h4>
                      <p className={`text-sm mb-3 ${theme === "dark" ? "text-slate-300" : "text-slate-600"}`}>
                        {raffle.description}
                      </p>
                      
                      <div className="space-y-1 text-sm">
                        <div className="flex items-center gap-2">
                          <Calendar size={14} className="text-[#0083E6]" />
                          <span className={theme === "dark" ? "text-slate-400" : "text-slate-500"}>
                            {formatDate(raffle.start_date)} - {formatDate(raffle.end_date)}
                          </span>
                        </div>
                        
                        {raffle.winner && (
                          <div className="flex items-center gap-2 mt-2">
                            <Trophy size={16} className="text-yellow-500" />
                            <span className={`font-semibold ${raffle.user_won ? "text-green-500" : theme === "dark" ? "text-slate-300" : "text-slate-700"}`}>
                              {raffle.user_won 
                                ? `🎉 ${t('dashboard.tabs.lottery.youWon', '¡Ganaste!')} - Número: ${formatTicketNumber(raffle.winner_number)}`
                                : `${t('dashboard.tabs.lottery.winner', 'Ganador')}: ${raffle.winner.name} - Número: ${formatTicketNumber(raffle.winner_number)}`
                              }
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* User Tickets */}
                    <div>
                      {raffle.user_participated ? (
                        <div className={`rounded-lg p-3 ${
                          theme === "dark" ? "bg-slate-700/50" : "bg-slate-100"
                        }`}>
                          <p className={`text-xs font-semibold mb-2 ${theme === "dark" ? "text-slate-300" : "text-slate-600"}`}>
                            {t('dashboard.tabs.lottery.yourNumbers', 'Tus números')} ({raffle.user_tickets.length})
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {raffle.user_tickets.slice(0, 6).map((ticket, idx) => (
                              <span
                                key={idx}
                                className={`text-xs font-mono px-2 py-1 rounded ${
                                  ticket === raffle.winner_number && raffle.user_won
                                    ? "bg-green-500 text-white font-bold"
                                    : theme === "dark"
                                    ? "bg-slate-600 text-slate-200"
                                    : "bg-white text-slate-700"
                                }`}
                              >
                                {formatTicketNumber(ticket)}
                              </span>
                            ))}
                            {raffle.user_tickets.length > 6 && (
                              <span className={`text-xs px-2 py-1 ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}>
                                +{raffle.user_tickets.length - 6}
                              </span>
                            )}
                          </div>
                        </div>
                      ) : (
                        <p className={`text-xs ${theme === "dark" ? "text-slate-500" : "text-slate-400"}`}>
                          {t('dashboard.tabs.lottery.didNotParticipate', 'No participaste')}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className={`rounded-xl p-8 text-center ${
              theme === "dark" ? "bg-slate-800" : "bg-white border border-slate-200"
            }`}>
              <History className="mx-auto mb-3 text-slate-400" size={40} />
              <p className={theme === "dark" ? "text-slate-400" : "text-slate-500"}>
                {t('dashboard.tabs.lottery.noHistory', 'No hay sorteos completados aún')}
              </p>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}
