import React, { useState } from "react";
import { X, Star } from "lucide-react";
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { Label } from "@components/ui/label";
import { useSwal } from "@hooks/useSwal";
import * as adminUserService from "@services/adminUserService";
import { handleApiError, formatReputation } from "@utils/adminHelpers";

export default function UpdateReputationModal({ isOpen, onClose, user, onSuccess }) {
  const swal = useSwal();
  const [loading, setLoading] = useState(false);
  const [reputation, setReputation] = useState(user?.customer?.reputation || 0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (reputation < 0 || reputation > 10) {
      swal.fire({
        title: "Error",
        text: "La reputación debe estar entre 0 y 10.",
        icon: "error",
      });
      return;
    }

    setLoading(true);

    try {
      const response = await adminUserService.updateUserReputation(user.id, reputation);
      
      swal.fire({
        title: "Reputación actualizada",
        html: `
          <p>Reputación anterior: <strong>${formatReputation(response.old_reputation)}</strong></p>
          <p>Reputación nueva: <strong>${formatReputation(response.new_reputation)}</strong></p>
        `,
        icon: "success",
        timer: 3000,
      });

      onSuccess();
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

  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-background rounded-xl shadow-xl max-w-md w-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-2xl font-bold">Actualizar Reputación</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-accent rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* User Info */}
          <div className="bg-accent/50 rounded-lg p-4">
            <p className="font-semibold">{user.name}</p>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>

          {/* Current Reputation */}
          <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 rounded-lg p-6 border border-yellow-500/20">
            <div className="flex items-center gap-2 mb-2">
              <Star className="w-5 h-5 text-yellow-500" />
              <p className="text-sm text-muted-foreground">Reputación Actual</p>
            </div>
            <p className="text-3xl font-bold">{formatReputation(user.customer?.reputation || 0)}</p>
          </div>

          {/* New Reputation Input */}
          <div>
            <Label htmlFor="reputation">Nueva Reputación (0-10)</Label>
            <Input
              id="reputation"
              type="number"
              min="0"
              max="10"
              step="0.1"
              value={reputation}
              onChange={(e) => setReputation(parseFloat(e.target.value) || 0)}
              className="text-lg font-semibold"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Valor entre 0.0 y 10.0
            </p>
          </div>

          {/* Preview */}
          <div className="bg-green-500/10 rounded-lg p-4 border border-green-500/20">
            <p className="text-sm font-semibold text-green-700 dark:text-green-400 mb-2">
              Vista Previa
            </p>
            <div className="flex items-center gap-2">
              <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
              <p className="text-2xl font-bold">{formatReputation(reputation)}</p>
            </div>
          </div>

          {/* Warning */}
          <div className="bg-yellow-500/10 rounded-lg p-4 border border-yellow-500/20">
            <p className="text-sm text-yellow-700 dark:text-yellow-400">
              <strong>Nota:</strong> Normalmente la reputación se calcula automáticamente 
              basándose en los puntos. Usa esta opción solo para ajustes manuales específicos.
            </p>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t border-border">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Actualizando..." : "Actualizar"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
