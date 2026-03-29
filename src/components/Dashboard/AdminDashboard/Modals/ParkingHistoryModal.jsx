import React, { useState, useEffect } from "react";
import { X, MapPin, Clock, Calendar } from "lucide-react";
import { Button } from "@components/ui/button";
import { Badge } from "@components/ui/badge";
import DataTable from "../DataTable";
import { useSwal } from "@hooks/useSwal";
import * as adminParkingService from "@services/adminParkingService";
import { handleApiError, formatDateTime } from "@utils/adminHelpers";

export default function ParkingHistoryModal({ isOpen, onClose, userId }) {
  const swal = useSwal();
  const [history, setHistory] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    per_page: 20,
    total: 0,
  });

  const [filters, setFilters] = useState({
    type: "",
  });

  const fetchHistory = async (page = 1) => {
    setLoading(true);
    try {
      const params = {
        page,
        per_page: pagination.per_page,
        sort_by: 'created_at',
        sort_order: 'desc',
        ...filters,
      };

      Object.keys(params).forEach(key => {
        if (params[key] === "" || params[key] === undefined) {
          delete params[key];
        }
      });

      const response = await adminParkingService.getUserParkingHistory(userId, params);
      setHistory(response.history.data);
      setUser(response.user);
      setPagination({
        current_page: response.history.current_page,
        last_page: response.history.last_page,
        per_page: response.history.per_page,
        total: response.history.total,
      });
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

  useEffect(() => {
    if (isOpen && userId) {
      fetchHistory(1);
    }
  }, [isOpen, userId, filters]);

  const columns = [
    {
      header: "Tipo",
      key: "type",
      render: (value) => (
        <Badge variant={value === "released" ? "default" : "secondary"}>
          {value === "released" ? "Liberada" : "Ocupada"}
        </Badge>
      ),
    },
    {
      header: "Ubicación",
      key: "location",
      render: (value, row) => (
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-blue-500" />
          <span className="text-sm">
            {row.latitude?.toFixed(6)}, {row.longitude?.toFixed(6)}
          </span>
        </div>
      ),
    },
    {
      header: "Fecha",
      key: "created_at",
      render: (value) => (
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm">{formatDateTime(value)}</span>
        </div>
      ),
    },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-linear-to-br from-slate-50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-border">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-2xl font-bold">Historial de Aparcamiento</h2>
            {user && (
              <p className="text-sm text-muted-foreground mt-1">
                {user.name} ({user.email})
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-accent rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filters */}
        <div className="p-6 border-b border-border">
          <div className="flex flex-wrap gap-3">
            <select
              value={filters.type}
              onChange={(e) => setFilters({ ...filters, type: e.target.value })}
              className="px-3 py-2 rounded-lg border border-input bg-background text-sm"
            >
              <option value="">Todos los tipos</option>
              <option value="released">Liberada</option>
              <option value="occupied">Ocupada</option>
            </select>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : (
            <>
              <DataTable columns={columns} data={history} />

              {/* Pagination */}
              {pagination.last_page > 1 && (
                <div className="flex justify-center items-center gap-2 mt-6">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => fetchHistory(pagination.current_page - 1)}
                    disabled={pagination.current_page === 1}
                  >
                    Anterior
                  </Button>
                  <span className="text-sm text-muted-foreground">
                    Página {pagination.current_page} de {pagination.last_page}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => fetchHistory(pagination.current_page + 1)}
                    disabled={pagination.current_page === pagination.last_page}
                  >
                    Siguiente
                  </Button>
                </div>
              )}

              {history.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  No hay registros de historial
                </div>
              )}
            </>
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
