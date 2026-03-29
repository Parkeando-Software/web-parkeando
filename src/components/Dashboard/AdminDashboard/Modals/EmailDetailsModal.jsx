import React from 'react';
import { X, Mail, Calendar, User, AlertCircle, CheckCircle, Clock, RefreshCw } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@components/ui/dialog';
import { Badge } from '@components/ui/badge';
import { Button } from '@components/ui/button';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export default function EmailDetailsModal({ isOpen, onClose, email, onResend }) {
  if (!email) return null;

  const getStatusBadge = (status) => {
    switch (status) {
      case 'sent':
        return <Badge className="bg-green-500 hover:bg-green-600">Enviado</Badge>;
      case 'failed':
        return <Badge className="bg-red-500 hover:bg-red-600">Fallido</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-500 hover:bg-yellow-600">Pendiente</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getTypeLabel = (type) => {
    const types = {
      activate_account: 'Activación de Cuenta',
      reset_password: 'Restablecer Contraseña',
      delete_account_confirmation: 'Confirmar Eliminación',
      delete_account_cancellation: 'Cancelar Eliminación',
      contact_form: 'Formulario de Contacto',
      admin_custom: 'Mensaje de Admin'
    };
    return types[type] || type;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Mail className="w-5 h-5 text-blue-500" />
            Detalles del Email
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Header Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground uppercase">Estado</label>
              <div className="flex items-center gap-2">
                {getStatusBadge(email.status)}
                {email.status === 'failed' && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="h-6 text-xs gap-1"
                    onClick={() => onResend(email)}
                  >
                    <RefreshCw className="w-3 h-3" /> Reenviar
                  </Button>
                )}
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground uppercase">Dirección</label>
              <Badge variant={'secondary'}>
                {email.direction === 'incoming' ? '📥 Entrante' : '📤 Saliente'}
              </Badge>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground uppercase">Tipo</label>
              <p className="font-medium">{getTypeLabel(email.type)}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground uppercase">De</label>
              <p className="text-sm break-all">{email.sender_email}</p>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground uppercase">Para</label>
              <div className="flex flex-col">
                <p className="text-sm font-medium break-all">{email.recipient_email}</p>
                {email.user && (
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <User className="w-3 h-3" /> {email.user.name || email.user.username}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-muted-foreground uppercase">Asunto</label>
            <p className="text-base font-semibold">{email.subject}</p>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-muted-foreground uppercase">Fecha</label>
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span>
                {format(new Date(email.created_at), "d 'de' MMMM, yyyy", { locale: es })}
              </span>
              <Clock className="w-4 h-4 text-muted-foreground ml-2" />
              <span>
                {format(new Date(email.created_at), "HH:mm:ss")}
              </span>
            </div>
          </div>

          {/* Error Message if failed */}
          {email.status === 'failed' && email.error_message && (
            <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg border border-red-200 dark:border-red-800">
              <div className="flex items-center gap-2 text-red-600 dark:text-red-400 mb-1">
                <AlertCircle className="w-4 h-4" />
                <span className="font-medium text-sm">Error de envío</span>
              </div>
              <p className="text-xs text-red-600 dark:text-red-300 font-mono break-all">
                {email.error_message}
              </p>
            </div>
          )}

          {/* Metadata / Content */}
          {email.metadata && (
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground uppercase">Contenido / Metadata</label>
              <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg border border-border overflow-auto max-h-60">
                {email.metadata.message_body ? (
                  <div className="whitespace-pre-wrap text-sm font-mono">
                    {email.metadata.message_body}
                  </div>
                ) : email.type === 'contact_form' && email.metadata.name && email.metadata.message ? (
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs font-semibold text-muted-foreground uppercase">Nombre</label>
                      <p className="text-sm mt-1">{email.metadata.name}</p>
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-muted-foreground uppercase">Mensaje</label>
                      <p className="text-sm mt-1 whitespace-pre-wrap">{email.metadata.message}</p>
                    </div>
                  </div>
                ) : (
                  <pre className="text-xs font-mono">
                    {JSON.stringify(email.metadata, null, 2)}
                  </pre>
                )}
              </div>
            </div>
          )}

        </div>

        <div className="flex justify-end pt-4 border-t border-border">
          <Button variant="outline" onClick={onClose}>
            Cerrar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
