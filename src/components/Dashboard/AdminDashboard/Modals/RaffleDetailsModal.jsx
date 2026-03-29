import React, { useState, useEffect } from "react";
import { X, Trophy, Calendar, Users, Gift, User, Ticket, XCircle, RotateCcw } from "lucide-react";
import { Button } from "@components/ui/button";
import { Badge } from "@components/ui/badge";
import { Input } from "@components/ui/input";
import { useSwal } from "@hooks/useSwal";
import * as adminRaffleService from "@services/adminRaffleService";
import { handleApiError, formatDate, getStatusBadgeColor, getStatusLabel } from "@utils/adminHelpers";
import ExecuteRaffleModal from "./ExecuteRaffleModal";

export default function RaffleDetailsModal({ isOpen, onClose, raffle, onSuccess }) {
  const swal = useSwal();
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showExecuteModal, setShowExecuteModal] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      if (!isOpen || !raffle) return;
      
      setLoading(true);
      try {
        const response = await adminRaffleService.getRaffleById(raffle.id);
        setDetails(response);
      } catch (error) {
        swal.fire({
          title: "Error",
          text: handleApiError(error),
          icon: "error",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [isOpen, raffle]);

  const handleExecuteSuccess = () => {
    setShowExecuteModal(false);
    // Refresh details
    const fetchDetails = async () => {
      try {
        const response = await adminRaffleService.getRaffleById(raffle.id);
        setDetails(response);
        // Call parent onSuccess to refresh the list
        if (onSuccess) {
          onSuccess();
        }
      } catch (error) {
        console.error("Error refreshing details:", error);
      }
    };
    fetchDetails();
  };

  const handleCloseRaffle = async () => {
    const result = await swal.fire({
      title: "¿Cerrar sorteo?",
      text: `¿Estás seguro de que deseas cerrar el sorteo "${raffle.title}"? No se podrán agregar más participantes.`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí, cerrar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      try {
        await adminRaffleService.closeRaffle(raffle.id);
        swal.fire({
          title: "Sorteo cerrado",
          text: "El sorteo ha sido cerrado exitosamente.",
          icon: "success",
          timer: 2000,
        });
        // Refresh details
        const response = await adminRaffleService.getRaffleById(raffle.id);
        setDetails(response);
        // Call parent onSuccess to refresh the list
        if (onSuccess) {
          onSuccess();
        }
      } catch (error) {
        swal.fire({
          title: "Error",
          text: handleApiError(error),
          icon: "error",
        });
      }
    }
  };

  const handleReopenRaffle = async () => {
    const result = await swal.fire({
      title: "¿Reabrir sorteo?",
      text: `¿Estás seguro de que deseas reabrir el sorteo "${raffle.title}"? Se podrán agregar más participantes.`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí, reabrir",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      try {
        await adminRaffleService.reopenRaffle(raffle.id);
        swal.fire({
          title: "Sorteo reabierto",
          text: "El sorteo ha sido reabierto exitosamente.",
          icon: "success",
          timer: 2000,
        });
        // Refresh details
        const response = await adminRaffleService.getRaffleById(raffle.id);
        setDetails(response);
        // Call parent onSuccess to refresh the list
        if (onSuccess) {
          onSuccess();
        }
      } catch (error) {
        swal.fire({
          title: "Error",
          text: handleApiError(error),
          icon: "error",
        });
      }
    }
  };

  if (!isOpen || !raffle) return null;

  const filteredParticipants = details?.participants_by_user?.filter(p =>
    p.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.email?.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-background rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-linear-to-br from-yellow-500 to-orange-500 flex items-center justify-center">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">{raffle.title}</h2>
              <Badge className={
                raffle.status === 'active' 
                  ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                  : raffle.status === 'closed' && !raffle.executed_at
                  ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400'
                  : 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400'
              }>
                {raffle.status === 'active' 
                  ? 'Activo' 
                  : raffle.status === 'closed' && !raffle.executed_at
                  ? 'Pendiente de ejecución'
                  : 'Completado'}
              </Badge>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-accent rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : (
            <>
              {/* Raffle Info */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Información del Sorteo</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Período</p>
                      <p className="font-medium">
                        {formatDate(details?.raffle.start_date)} - {formatDate(details?.raffle.end_date)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Total Participantes</p>
                      <p className="font-medium text-2xl">{details?.total_participants || 0}</p>
                    </div>
                  </div>

                  {details?.raffle.description && (
                    <div className="md:col-span-2 flex items-start gap-3">
                      <Gift className="w-5 h-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-sm text-muted-foreground">Descripción</p>
                        <p className="font-medium">{details.raffle.description}</p>
                      </div>
                    </div>
                  )}

                  {details?.raffle.image_number && (
                    <div className="md:col-span-2">
                      <p className="text-sm text-muted-foreground mb-2">Imagen del Premio</p>
                      <div className="bg-accent/50 rounded-lg p-4 border border-border flex justify-center">
                        <img
                          src={`https://api.parkeando.es/awards/gift_${details.raffle.image_number}.png`}
                          alt={`Premio ${details.raffle.title}`}
                          className="w-40 h-40 object-contain"
                        />
                      </div>
                    </div>
                  )}

                  {details?.raffle.winner && (
                    <div className="md:col-span-2 bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                      <div className="flex items-center gap-3">
                        <Trophy className="w-6 h-6 text-green-500" />
                        <div>
                          <p className="text-sm text-green-700 dark:text-green-400 font-semibold">Ganador</p>
                          <p className="font-bold text-lg">{details.raffle.winner.username}</p>
                          <p className="text-sm text-muted-foreground">
                            Número ganador: #{details.raffle.winner_number}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {details?.days_remaining !== null && details?.days_remaining !== undefined && raffle.status === 'active' && (
                    <div className="md:col-span-2 bg-orange-500/10 rounded-lg p-4 border border-orange-500/20">
                      <p className="text-sm text-orange-700 dark:text-orange-400 font-semibold">
                        Días restantes: {details.days_remaining} días
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Participants */}
              <div className="border-t border-border pt-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Participantes por Usuario</h3>
                  <Input
                    type="text"
                    placeholder="Buscar participante..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-64"
                  />
                </div>

                {filteredParticipants.length > 0 ? (
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {filteredParticipants.map((participant) => (
                      <div
                        key={participant.user_id}
                        className="bg-accent/50 rounded-lg p-4 border border-border"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-linear-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold">
                              {participant.username?.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <p className="font-semibold">{participant.username}</p>
                              <p className="text-sm text-muted-foreground">{participant.email}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center gap-2">
                              <Ticket className="w-4 h-4 text-muted-foreground" />
                              <span className="font-bold text-lg">{participant.tickets_count}</span>
                            </div>
                            <p className="text-xs text-muted-foreground">tickets</p>
                          </div>
                        </div>
                        <div className="mt-3 flex flex-wrap gap-1">
                          {participant.ticket_numbers?.map((ticketNum) => (
                            <span
                              key={ticketNum}
                              className="px-2 py-1 bg-primary/10 text-primary rounded text-xs font-medium"
                            >
                              #{ticketNum}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-muted-foreground">
                    {searchTerm ? "No se encontraron participantes" : "No hay participantes aún"}
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-between gap-3 p-6 border-t border-border">
          <div className="flex gap-2">
            {/* Close Button */}
            {details && details.raffle.status === 'active' && (
              <Button 
                onClick={handleCloseRaffle}
                variant="outline"
                className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white"
              >
                <XCircle className="w-4 h-4 mr-2" />
                Cerrar Sorteo
              </Button>
            )}
            
            {/* Reopen Button */}
            {details && details.raffle.status === 'closed' && !details.raffle.executed_at && 
             new Date(details.raffle.end_date) >= new Date().setHours(0, 0, 0, 0) && (
              <Button 
                onClick={handleReopenRaffle}
                variant="outline"
                className="border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Reabrir Sorteo
              </Button>
            )}
          </div>
          
          <div className="flex gap-2">
            {/* Execute Button */}
            {details && !details.raffle.executed_at && 
             (details.raffle.status === 'closed' || 
              (details.raffle.status === 'active' && new Date(details.raffle.end_date) < new Date())) && (
              <Button 
                onClick={() => setShowExecuteModal(true)}
                className="bg-green-600 hover:bg-green-700"
              >
                Ejecutar Sorteo
              </Button>
            )}
            <Button onClick={onClose}>Cerrar</Button>
          </div>
        </div>
      </div>

      {/* Execute Raffle Modal */}
      {showExecuteModal && details && (
        <ExecuteRaffleModal
          isOpen={showExecuteModal}
          onClose={() => setShowExecuteModal(false)}
          raffle={details.raffle}
          onSuccess={handleExecuteSuccess}
        />
      )}
    </div>
  );
}
