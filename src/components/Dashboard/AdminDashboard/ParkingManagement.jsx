import React, { useState, useEffect } from "react";
import { Search, MapPin, Trash2, Eye, Clock, Shield, History, Calendar } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@components/ui/card";
import { Input } from "@components/ui/input";
import { Button } from "@components/ui/button";
import { Badge } from "@components/ui/badge";
import DataTable from "./DataTable";
import { useSwal } from "@hooks/useSwal";
import * as adminParkingService from "@services/adminParkingService";
import { handleApiError, getStatusBadgeColor, getStatusLabel, formatDateTime } from "@utils/adminHelpers";
import ParkingHistoryModal from "./Modals/ParkingHistoryModal";

// --- Funciones Auxiliares ---
const getHistoryTypeBadgeColor = (type) => {
  switch (type) {
    case "released":
      return "bg-green-500 hover:bg-green-600 text-white";
    case "occupied":
      return "bg-red-500 hover:bg-red-600 text-white";
    default:
      return "bg-gray-500 hover:bg-gray-600 text-white";
  }
};

const getHistoryTypeLabel = (type) => {
  switch (type) {
    case "released":
      return "Liberada";
    case "occupied":
      return "Ocupada";
    default:
      return "N/A";
  }
};
// ----------------------------


export default function ParkingManagement({ initialAction, clearAction }) {
  const swal = useSwal();
  const [parkings, setParkings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    per_page: 15,
    total: 0,
  });
  
  const [filters, setFilters] = useState({
    type: "",
    date: "",
    from_date: "",
    to_date: "",
    sort_by: "created_at",
    sort_order: "desc",
    search_user: "",
  });

  const [searchInput, setSearchInput] = useState("");
  const [showHistory, setShowHistory] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const fetchParkings = async (page = 1) => {
    setLoading(true);
    try {
      const params = {
        page,
        per_page: pagination.per_page,
        ...filters,
      };
      
      Object.keys(params).forEach(key => {
        if (params[key] === "" || params[key] === undefined) {
          delete params[key];
        }
      });

      const response = await adminParkingService.getParkings(params); 
      setParkings(response.data); 
      setPagination({
        current_page: response.current_page,
        last_page: response.last_page,
        per_page: response.per_page,
        total: response.total,
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

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setFilters(prev => ({ ...prev, search_user: searchInput }));
    }, 500);

    return () => clearTimeout(timer);
  }, [searchInput]);

  useEffect(() => {
    fetchParkings(1);
  }, [filters]);

  // Abre Google Maps
  const handleViewOnMap = (latitude, longitude) => {
    const mapUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
    window.open(mapUrl, '_blank');
  };

  // Función de eliminación
  const handleDeleteNotification = async (row) => {
    const parkingHistoryId = row.id; 
    
    const result = await swal.fire({
      title: "¿Eliminar Plaza?",
      text: "Estás a punto de eliminar esta plaza de aparcamiento. ¿Deseas continuar?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      try {
        await adminParkingService.deleteParking(parkingHistoryId); 
        swal.fire({
          title: "Eliminada",
          text: "La plaza ha sido eliminada exitosamente.",
          icon: "success",
          timer: 2000,
        });
        fetchParkings(pagination.current_page);
      } catch (error) {
        swal.fire({
          title: "Error",
          text: handleApiError(error),
          icon: "error",
        });
      }
    }
  };

  // Handle view user history
  const handleViewHistory = (userId) => {
    setSelectedUserId(userId);
    setShowHistory(true);
  };

  // Table columns
  const columns = [
    {
      header: "Usuario",
      key: "user",
      render: (value, row) => (
        <div>
          <p className="font-medium">{row.user?.username || "N/A"}</p>
          <p className="text-xs text-muted-foreground">{row.user?.email || "N/A"}</p>
        </div>
      ),
    },
    {
      header: "Ubicación",
      key: "location",
      render: (value, row) => (
        <div 
          className="flex items-center gap-2 cursor-pointer hover:underline"
          onClick={(e) => {
            e.stopPropagation();
            if (row.latitude && row.longitude) {
              handleViewOnMap(row.latitude, row.longitude);
            }
          }}
        >
          <MapPin className="w-4 h-4 text-blue-500" />
          <div>
            <p className="text-sm font-medium">
              {row.latitude?.toFixed(6)}, {row.longitude?.toFixed(6)}
            </p>
          </div>
        </div>
      ),
    },
    {
      header: "Tipo de Registro",
      key: "type",
      render: (value) => (
        <Badge className={getHistoryTypeBadgeColor(value)}>
          {getHistoryTypeLabel(value)}
        </Badge>
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
    {
      header: "Acciones",
      key: "actions",
      render: (value, row) => (
        <div className="flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (row.latitude && row.longitude) {
                handleViewOnMap(row.latitude, row.longitude);
              }
            }}
            className="p-2 hover:bg-accent rounded-lg transition-colors"
            title="Ver ubicación en Google Maps"
          >
            <Eye className="w-4 h-4 text-blue-500" />
          </button>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleViewHistory(row.user_id); 
            }}
            className="p-2 hover:bg-accent rounded-lg transition-colors"
            title="Ver historial completo del usuario"
          >
            <History className="w-4 h-4 text-purple-500" />
          </button>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteNotification(row);
            }}
            className="p-2 hover:bg-accent rounded-lg transition-colors"
            title="Eliminar Notificación"
          >
            <Trash2 className="w-4 h-4 text-red-500" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <>
      <Card className="bg-linear-to-br from-slate-50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 border-border">
        <CardHeader>
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div>
              <CardTitle>Historial de Plazas de Aparcamiento</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Visualiza los registros de liberaciones/ocupaciones de plazas.
              </p>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-3 mt-4">
            {/* User Search */}
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Buscar por usuario..."
                className="pl-10"
              />
            </div>

            <select
              value={filters.type}
              onChange={(e) => setFilters({ ...filters, type: e.target.value })}
              className="px-3 py-2 rounded-lg border border-input bg-background text-sm"
            >
              <option value="">Todos los tipos</option>
              <option value="released">Liberada</option>
              <option value="occupied">Ocupada</option>
            </select>

            <Input
              type="date"
              value={filters.from_date}
              onChange={(e) => setFilters({ ...filters, from_date: e.target.value })}
              className="w-auto"
              placeholder="Desde"
            />

            <Input
              type="date"
              value={filters.to_date}
              onChange={(e) => setFilters({ ...filters, to_date: e.target.value })}
              className="w-auto"
              placeholder="Hasta"
            />

            <select
              value={filters.sort_order}
              onChange={(e) => setFilters({ ...filters, sort_order: e.target.value })}
              className="px-3 py-2 rounded-lg border border-input bg-background text-sm"
            >
              <option value="desc">Descendente</option>
              <option value="asc">Ascendente</option>
            </select>
          </div>
        </CardHeader>

        <CardContent>
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : (
            <>
              <DataTable
                columns={columns}
                data={parkings}
                onRowClick={(row) => {
                    if (row.latitude && row.longitude) {
                        handleViewOnMap(row.latitude, row.longitude);
                    }
                }} 
              />

              {/* Pagination */}
              {pagination.last_page > 1 && (
                <div className="flex justify-center items-center gap-2 mt-6">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => fetchParkings(pagination.current_page - 1)}
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
                    onClick={() => fetchParkings(pagination.current_page + 1)}
                    disabled={pagination.current_page === pagination.last_page}
                  >
                    Siguiente
                  </Button>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>

      {showHistory && selectedUserId && (
        <ParkingHistoryModal
          isOpen={showHistory}
          onClose={() => setShowHistory(false)}
          userId={selectedUserId}
        />
      )}
    </>
  );
}