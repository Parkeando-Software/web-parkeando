import React, { useState, useEffect } from "react";
import { X, Trophy, AlertTriangle, Calendar, Ticket, CheckCircle } from "lucide-react";
import { Button } from "@components/ui/button";
import { useSwal } from "@hooks/useSwal";
import * as adminRaffleService from "@services/adminRaffleService";
import { handleApiError } from "@utils/adminHelpers";

export default function ExecuteRaffleModal({ isOpen, onClose, raffle, onSuccess }) {
  const swal = useSwal();
  const [loading, setLoading] = useState(false);
  const [canExecute, setCanExecute] = useState(false);
  const [daysRemaining, setDaysRemaining] = useState(0);

  useEffect(() => {
    if (raffle) {
      const endDate = new Date(raffle.end_date);
      const now = new Date();
      const diffTime = endDate - now;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      setDaysRemaining(diffDays);
      setCanExecute(diffDays <= 0);
    }
  }, [raffle]);

  const handleExecute = async () => {
    const result = await swal.fire({
      title: "¿Generar Ganador?",
      html: `
        <p>Se seleccionará un ganador aleatorio entre todos los participantes.</p>
        <p class="text-red-600 mt-2"><strong>Esta acción no se puede deshacer.</strong></p>
      `,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí, generar ganador",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#16a34a",
    });

    if (!result.isConfirmed) return;

    setLoading(true);

    try {
      const response = await adminRaffleService.executeRaffle(raffle.id, {});

      await swal.fire({
        title: "¡Tenemos un Ganador!",
        html: `
          <div class="text-center">
            <div class="mb-4 flex justify-center">
              <div class="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center">
                <svg class="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-2">${response.winner.name}</h3>
            <p class="text-gray-500 mb-4">${response.winner.email}</p>
            <div class="bg-green-50 rounded-lg p-3 inline-block">
              <p class="text-green-800 font-medium flex items-center gap-2">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                </svg>
                Ticket #${response.ticket_number}
              </p>
            </div>
          </div>
        `,
        icon: null,
        confirmButtonText: "Genial",
        confirmButtonColor: "#16a34a",
      });

      onSuccess();
      onClose();
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

  if (!isOpen || !raffle) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-background rounded-xl shadow-xl max-w-md w-full overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border bg-muted/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-linear-to-br from-yellow-500 to-orange-500 flex items-center justify-center shadow-lg">
              <Trophy className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Sorteo Aleatorio</h2>
              <p className="text-xs text-muted-foreground">Generar ganador automáticamente</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-accent rounded-lg transition-colors text-muted-foreground hover:text-foreground"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          <div className="text-center space-y-2">
            <h3 className="font-semibold text-lg">{raffle.title}</h3>
            <p className="text-sm text-muted-foreground">
              {canExecute 
                ? "El periodo del sorteo ha finalizado. Ya puedes generar un ganador."
                : `El sorteo aún está activo. Faltan ${daysRemaining} días para finalizar.`}
            </p>
          </div>

          {!canExecute && (
            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 flex gap-3 items-start">
              <Calendar className="w-5 h-5 text-yellow-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="text-sm font-medium text-yellow-700 dark:text-yellow-400">
                  Sorteo en curso
                </p>
                <p className="text-xs text-yellow-600/80 dark:text-yellow-400/80">
                  Debes esperar a que finalice la fecha del sorteo ({new Date(raffle.end_date).toLocaleDateString()}) para poder ejecutarlo.
                </p>
              </div>
            </div>
          )}

          {canExecute && (
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 flex gap-3 items-start">
              <CheckCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="text-sm font-medium text-blue-700 dark:text-blue-400">
                  Listo para ejecutar
                </p>
                <p className="text-xs text-blue-600/80 dark:text-blue-400/80">
                  Al hacer clic en el botón, el sistema seleccionará aleatoriamente un ganador entre todos los participantes.
                </p>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col gap-3 pt-2">
            <Button
              onClick={handleExecute}
              disabled={!canExecute || loading}
              className="w-full bg-linear-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg shadow-green-900/20 h-11 text-base"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Generando ganador...</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Ticket className="w-5 h-5" />
                  <span>Generar Ganador Aleatorio</span>
                </div>
              )}
            </Button>
            
            <Button 
              variant="outline" 
              onClick={onClose}
              disabled={loading}
              className="w-full"
            >
              Cancelar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

