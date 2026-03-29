import React from "react";
import { X, Mail, Calendar, Clock, AlertTriangle, User, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@components/ui/button";
import { Badge } from "@components/ui/badge";
import { formatDateTime, getStatusBadgeColor, getStatusLabel } from "@utils/adminHelpers";

export default function DeleteRequestDetailsModal({ isOpen, onClose, request, onExecute, onCancel }) {
  if (!isOpen || !request) return null;

  const deleteRequest = request.delete_request;
  const user = request.user;
  const daysRemaining = request.days_remaining;
  const autoDeleteDate = request.auto_delete_date;

  const canExecute = deleteRequest.status === "processing" && deleteRequest.confirmed_at;
  const canCancel = deleteRequest.status === "pending" || deleteRequest.status === "processing";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-background rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-2xl font-bold">Detalles de Solicitud de Eliminación</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-accent rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Request Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Información de la Solicitud</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{deleteRequest.user_email}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-5 h-5 flex items-center justify-center">
                  <div className={`w-3 h-3 rounded-full ${
                    deleteRequest.status === 'completed' ? 'bg-green-500' :
                    deleteRequest.status === 'cancelled' ? 'bg-red-500' :
                    deleteRequest.status === 'processing' ? 'bg-blue-500' :
                    'bg-yellow-500'
                  }`}></div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Estado</p>
                  <Badge className={getStatusBadgeColor(deleteRequest.status)}>
                    {getStatusLabel(deleteRequest.status)}
                  </Badge>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Fecha de Solicitud</p>
                  <p className="font-medium">{formatDateTime(deleteRequest.created_at)}</p>
                </div>
              </div>

              {deleteRequest.confirmed_at ? (
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <div>
                    <p className="text-sm text-muted-foreground">Confirmada el</p>
                    <p className="font-medium">{formatDateTime(deleteRequest.confirmed_at)}</p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <XCircle className="w-5 h-5 text-red-500" />
                  <div>
                    <p className="text-sm text-red-600 dark:text-red-400 font-medium">
                      Aún no confirmada por el usuario
                    </p>
                  </div>
                </div>
              )}

              {deleteRequest.completed_at && (
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <div>
                    <p className="text-sm text-muted-foreground">Completada el</p>
                    <p className="font-medium">{formatDateTime(deleteRequest.completed_at)}</p>
                  </div>
                </div>
              )}

              {deleteRequest.cancelled_at && (
                <div className="flex items-center gap-3">
                  <XCircle className="w-5 h-5 text-red-500" />
                  <div>
                    <p className="text-sm text-muted-foreground">Cancelada el</p>
                    <p className="font-medium">{formatDateTime(deleteRequest.cancelled_at)}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Auto-delete info */}
          {deleteRequest.status === "processing" && deleteRequest.confirmed_at && (
            <div className="border-t border-border pt-6">
              <h3 className="text-lg font-semibold mb-4">Eliminación Automática</h3>
              <div className="bg-orange-500/10 rounded-lg p-4 border border-orange-500/20">
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-orange-500 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-semibold text-orange-700 dark:text-orange-400 mb-1">
                      {daysRemaining !== null ? (
                        daysRemaining === 0 ? (
                          <span className="flex items-center gap-2">
                            <AlertTriangle className="w-4 h-4" />
                            Plazo vencido
                          </span>
                        ) : (
                          `${daysRemaining} días restantes`
                        )
                      ) : (
                        "Calculando..."
                      )}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Fecha de eliminación automática: {autoDeleteDate ? formatDateTime(autoDeleteDate) : "-"}
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                      La cuenta se eliminará automáticamente 30 días después de la confirmación.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* User Info */}
          {user && (
            <div className="border-t border-border pt-6">
              <h3 className="text-lg font-semibold mb-4">Información del Usuario</h3>
              <div className="bg-accent/50 rounded-lg p-4 space-y-2">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-muted-foreground" />
                  <span className="font-medium">{user.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{user.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">Registrado: {formatDateTime(user.created_at)}</span>
                </div>
              </div>
            </div>
          )}

          {!user && deleteRequest.status !== "completed" && (
            <div className="border-t border-border pt-6">
              <div className="bg-yellow-500/10 rounded-lg p-4 border border-yellow-500/20">
                <p className="text-sm text-yellow-700 dark:text-yellow-400">
                  <strong>Nota:</strong> No se encontró un usuario asociado a este email.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t border-border">
          <Button variant="outline" onClick={onClose}>
            Cerrar
          </Button>
          
          {canCancel && (
            <Button
              variant="destructive"
              onClick={onCancel}
              className="flex items-center gap-2"
            >
              <XCircle className="w-4 h-4" />
              Cancelar Solicitud
            </Button>
          )}
          
          {canExecute && (
            <Button
              onClick={onExecute}
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700"
            >
              <CheckCircle className="w-4 h-4" />
              Ejecutar Eliminación
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
