import React from "react";
import { X, Mail, Phone, Calendar, Car, Star, DollarSign, Shield } from "lucide-react";
import { Button } from "@components/ui/button";
import { Badge } from "@components/ui/badge";
import { formatDateTime, getRoleName, formatPoints, formatReputation } from "@utils/adminHelpers";

export default function UserDetailsModal({ isOpen, onClose, user }) {
  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-background rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-linear-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-2xl">
              {(user.username || "?").charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="text-2xl font-bold">{user.name || user.username}</h2>
              <p className="text-muted-foreground">@{user.username}</p>
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
          {/* Basic Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Información Básica</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{user.email}</p>
                </div>
              </div>

              {user.phone && (
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Teléfono</p>
                    <p className="font-medium">{user.phone}</p>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Rol</p>
                  <Badge variant={user.role_id === 1 ? "destructive" : "default"}>
                    {getRoleName(user.role_id)}
                  </Badge>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Registrado</p>
                  <p className="font-medium">{formatDateTime(user.created_at)}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-5 h-5 flex items-center justify-center">
                  <div className={`w-3 h-3 rounded-full ${user.account_activated ? 'bg-green-500' : 'bg-red-500'}`}></div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Estado</p>
                  <Badge variant={user.account_activated ? "default" : "secondary"}>
                    {user.account_activated ? "Activo" : "Inactivo"}
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Customer Info */}
          {user.customer && (
            <div className="border-t border-border pt-6">
              <h3 className="text-lg font-semibold mb-4">Información de Cliente</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-linear-to-br from-purple-500/10 to-blue-500/10 rounded-xl p-4 border border-purple-500/20">
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign className="w-5 h-5 text-purple-500" />
                    <p className="text-sm text-muted-foreground">Puntos</p>
                  </div>
                  <p className="text-2xl font-bold">{formatPoints(user.customer.points)}</p>
                </div>

                <div className="bg-linear-to-br from-yellow-500/10 to-orange-500/10 rounded-xl p-4 border border-yellow-500/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="w-5 h-5 text-yellow-500" />
                    <p className="text-sm text-muted-foreground">Reputación</p>
                  </div>
                  <p className="text-2xl font-bold">{formatReputation(user.customer.reputation)}</p>
                </div>

                {user.customer.city && (
                  <div className="bg-linear-to-br from-green-500/10 to-emerald-500/10 rounded-xl p-4 border border-green-500/20">
                    <div className="flex items-center gap-2 mb-2">
                      <p className="text-sm text-muted-foreground">Ciudad</p>
                    </div>
                    <p className="text-2xl font-bold">{user.customer.city}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Vehicles */}
          {user.vehicles && user.vehicles.length > 0 && (
            <div className="border-t border-border pt-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Car className="w-5 h-5" />
                Vehículos ({user.vehicles.length})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {user.vehicles.map((vehicle) => (
                  <div
                    key={vehicle.id}
                    className="bg-accent/50 rounded-lg p-4 border border-border"
                  >
                    <p className="font-semibold text-lg">{vehicle.license_plate}</p>
                    <p className="text-sm text-muted-foreground">
                      {vehicle.brand} {vehicle.model}
                    </p>
                    {vehicle.color && (
                      <p className="text-sm text-muted-foreground">Color: {vehicle.color}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Parking History Count */}
          {user.parking_history && user.parking_history.length > 0 && (
            <div className="border-t border-border pt-6">
              <h3 className="text-lg font-semibold mb-2">Historial de Aparcamiento</h3>
              <p className="text-muted-foreground">
                Total de registros: {user.parking_history.length}
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t border-border">
          <Button onClick={onClose}>Cerrar</Button>
        </div>
      </div>
    </div>
  );
}
