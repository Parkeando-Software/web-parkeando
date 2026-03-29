import React, { useState } from "react";
import { X, DollarSign, TrendingUp } from "lucide-react";
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { Label } from "@components/ui/label";
import { useSwal } from "@hooks/useSwal";
import * as adminUserService from "@services/adminUserService";
import { handleApiError, formatPoints, formatReputation } from "@utils/adminHelpers";

export default function UpdatePointsModal({ isOpen, onClose, user, onSuccess }) {
  const swal = useSwal();
  const [loading, setLoading] = useState(false);
  const [points, setPoints] = useState(user?.customer?.points || 0);

  // Calculate new reputation based on points (0.1 per 10 points, max 10.0)
  const calculateNewReputation = (pointsValue) => {
    return Math.min(10.0, pointsValue / 100);
  };

  const newReputation = calculateNewReputation(points);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (points < 0) {
      swal.fire({
        title: "Error",
        text: "Los puntos no pueden ser negativos.",
        icon: "error",
      });
      return;
    }

    setLoading(true);

    try {
      const response = await adminUserService.updateUserPoints(user.id, points);
      
      swal.fire({
        title: "Puntos actualizados",
        html: `
          <p>Puntos anteriores: <strong>${formatPoints(response.old_points)}</strong></p>
          <p>Puntos nuevos: <strong>${formatPoints(response.new_points)}</strong></p>
          <p>Nueva reputación: <strong>${formatReputation(response.new_reputation)}</strong></p>
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
          <h2 className="text-2xl font-bold">Actualizar Puntos</h2>
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

          {/* Current Points */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-lg p-4 border border-purple-500/20">
              <div className="flex items-center gap-2 mb-1">
                <DollarSign className="w-4 h-4 text-purple-500" />
                <p className="text-xs text-muted-foreground">Puntos Actuales</p>
              </div>
              <p className="text-xl font-bold">{formatPoints(user.customer?.points || 0)}</p>
            </div>

            <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 rounded-lg p-4 border border-yellow-500/20">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="w-4 h-4 text-yellow-500" />
                <p className="text-xs text-muted-foreground">Reputación Actual</p>
              </div>
              <p className="text-xl font-bold">{formatReputation(user.customer?.reputation || 0)}</p>
            </div>
          </div>

          {/* New Points Input */}
          <div>
            <Label htmlFor="points">Nuevos Puntos</Label>
            <Input
              id="points"
              type="number"
              min="0"
              step="1"
              value={points}
              onChange={(e) => setPoints(parseInt(e.target.value) || 0)}
              className="text-lg font-semibold"
            />
            <p className="text-xs text-muted-foreground mt-1">
              La reputación se calculará automáticamente (+0.1 por cada 10 puntos, máximo 10.0)
            </p>
          </div>

          {/* Preview New Values */}
          <div className="bg-green-500/10 rounded-lg p-4 border border-green-500/20">
            <p className="text-sm font-semibold text-green-700 dark:text-green-400 mb-2">
              Vista Previa
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-muted-foreground">Nuevos Puntos</p>
                <p className="text-lg font-bold">{formatPoints(points)}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Nueva Reputación</p>
                <p className="text-lg font-bold">{formatReputation(newReputation)}</p>
              </div>
            </div>
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
