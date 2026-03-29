import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Trophy, Plus, Calendar, Users, Gift, Eye, XCircle, CheckCircle, Clock, RotateCcw } from "lucide-react";
import { Button } from "@components/ui/button";
import { Badge } from "@components/ui/badge";
import DataTable from "../DataTable";
import { useSwal } from "@hooks/useSwal";
import * as adminRaffleService from "@services/adminRaffleService";
import { handleApiError, getStatusBadgeColor, getStatusLabel, formatDate } from "@utils/adminHelpers";
import RaffleFormModal from "../Modals/RaffleFormModal";
import RaffleDetailsModal from "../Modals/RaffleDetailsModal";
import ExecuteRaffleModal from "../Modals/ExecuteRaffleModal";

export default function SorteosSection() {
  const swal = useSwal();
  const [raffles, setRaffles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    active: 0,
    total_participants: 0,
    completed: 0,
    pending_execution: 0,
  });
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    per_page: 15,
    total: 0,
  });

  // Filters
  const [filters, setFilters] = useState({
    status: "",
    sort_by: "created_at",
    sort_order: "desc",
  });

  // Modals state
  const [showRaffleForm, setShowRaffleForm] = useState(false);
  const [showRaffleDetails, setShowRaffleDetails] = useState(false);
  const [showExecuteRaffle, setShowExecuteRaffle] = useState(false);
  const [selectedRaffle, setSelectedRaffle] = useState(null);

  // Fetch raffles
  const fetchRaffles = async (page = 1) => {
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

      const response = await adminRaffleService.getRaffles(params);
      setRaffles(response.data);
      setPagination({
        current_page: response.current_page,
        last_page: response.last_page,
        per_page: response.per_page,
        total: response.total,
      });

      // Calculate stats
      const activeCount = response.data.filter(r => r.status === 'active').length;
      const completedCount = response.data.filter(r => r.status === 'completed').length;
      const pendingExecutionCount = response.data.filter(r => r.status === 'closed' && !r.executed_at).length;
      const totalParticipants = response.data.reduce((sum, r) => sum + (r.participants_count || 0), 0);

      setStats({
        active: activeCount,
        total_participants: totalParticipants,
        completed: completedCount,
        pending_execution: pendingExecutionCount,
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

  // Initial load and when filters change
  useEffect(() => {
    fetchRaffles(1);
  }, [filters]);

  // Handle create raffle
  const handleCreateRaffle = () => {
    setShowRaffleForm(true);
  };

  // Handle view details
  const handleViewDetails = (raffle) => {
    setSelectedRaffle(raffle);
    setShowRaffleDetails(true);
  };

  // Handle close raffle
  const handleCloseRaffle = async (raffle) => {
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
        fetchRaffles(pagination.current_page);
      } catch (error) {
        swal.fire({
          title: "Error",
          text: handleApiError(error),
          icon: "error",
        });
      }
    }
  };

  // Handle reopen raffle
  const handleReopenRaffle = async (raffle) => {
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
        fetchRaffles(pagination.current_page);
      } catch (error) {
        swal.fire({
          title: "Error",
          text: handleApiError(error),
          icon: "error",
        });
      }
    }
  };

  // Handle execute raffle
  const handleExecuteRaffle = (raffle) => {
    setSelectedRaffle(raffle);
    setShowExecuteRaffle(true);
  };

  // Table columns
  const columns = [
    {
      header: "Sorteo",
      key: "title",
      render: (value, row) => (
        <div>
          <p className="font-medium">{value}</p>
          {row.description && (
            <p className="text-xs text-muted-foreground line-clamp-1">{row.description}</p>
          )}
        </div>
      ),
    },
    {
      header: "Participantes",
      key: "participants_count",
      render: (value) => (
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-muted-foreground" />
          <span className="font-medium">{value || 0}</span>
        </div>
      ),
    },
    {
      header: "Estado",
      key: "status",
      render: (value, row) => {
        let label = 'Activo';
        let colorClass = getStatusBadgeColor('active');
        
        if (row.status === 'active') {
          label = 'Activo';
          colorClass = 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
        } else if (row.status === 'closed' && !row.executed_at) {
          label = 'Pendiente de ejecución';
          colorClass = 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400';
        } else if (row.status === 'completed' || row.executed_at) {
          label = 'Completado';
          colorClass = 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400';
        }
        
        return (
          <Badge className={colorClass}>
            {label}
          </Badge>
        );
      },
    },
    {
      header: "Período",
      key: "start_date",
      render: (value, row) => (
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-muted-foreground" />
          <div className="text-sm">
            <p>{formatDate(row.start_date)}</p>
            <p className="text-muted-foreground">{formatDate(row.end_date)}</p>
          </div>
        </div>
      ),
    },
    {
      header: "Días Restantes",
      key: "days_remaining",
      render: (value, row) => {
        if (row.status !== 'active') {
          return <span className="text-muted-foreground">-</span>;
        }
        
        if (value === null || value === undefined) {
          return <span className="text-muted-foreground">-</span>;
        }
        
        if (value <= 0) {
          return (
            <div className="flex items-center gap-2 text-red-600">
              <Clock className="w-4 h-4" />
              <span className="font-semibold">Finalizado</span>
            </div>
          );
        }
        
        return (
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-orange-500" />
            <span className="font-medium">{value} días</span>
          </div>
        );
      },
    },
    {
      header: "Ganador",
      key: "winner",
      render: (value, row) => (
        <div>
          {row.winner ? (
            <>
              <p className="font-medium text-sm">{row.winner.name}</p>
              <p className="text-xs text-muted-foreground">#{row.winner_number}</p>
            </>
          ) : (
            <span className="text-muted-foreground text-sm">Sin ganador</span>
          )}
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
              handleViewDetails(row);
            }}
            className="p-2 hover:bg-accent rounded-lg transition-colors"
            title="Ver detalles"
          >
            <Eye className="w-4 h-4 text-blue-500" />
          </button>
          
          {row.status === 'active' && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleCloseRaffle(row);
              }}
              className="p-2 hover:bg-accent rounded-lg transition-colors"
              title="Cerrar sorteo"
            >
              <XCircle className="w-4 h-4 text-orange-500" />
            </button>
          )}
          
          {/* Reopen Button */}
          {row.status === 'closed' && !row.executed_at && new Date(row.end_date) >= new Date().setHours(0, 0, 0, 0) && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleReopenRaffle(row);
              }}
              className="p-2 hover:bg-accent rounded-lg transition-colors"
              title="Reabrir sorteo"
            >
              <RotateCcw className="w-4 h-4 text-blue-500" />
            </button>
          )}
          
          {/* Execute Button */}
          {!row.executed_at && (row.status === 'closed' || (row.status === 'active' && new Date(row.end_date) < new Date())) && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleExecuteRaffle(row);
              }}
              className="p-2 hover:bg-accent rounded-lg transition-colors"
              title="Ejecutar sorteo"
            >
              <CheckCircle className="w-4 h-4 text-green-500" />
            </button>
          )}
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Gestión de Sorteos</h2>
            <p className="text-muted-foreground">Administra los sorteos de la aplicación</p>
          </div>
          <Button onClick={handleCreateRaffle} className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Crear Sorteo
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-linear-to-br from-yellow-500/10 to-orange-500/10 rounded-xl p-6 border border-yellow-500/20"
          >
            <div className="flex items-center justify-between mb-2">
              <Trophy className="w-8 h-8 text-yellow-500" />
              <span className="text-2xl font-bold text-foreground">{stats.active}</span>
            </div>
            <p className="text-sm text-muted-foreground">Sorteos Activos</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-linear-to-br from-blue-500/10 to-purple-500/10 rounded-xl p-6 border border-blue-500/20"
          >
            <div className="flex items-center justify-between mb-2">
              <Users className="w-8 h-8 text-blue-500" />
              <span className="text-2xl font-bold text-foreground">{stats.total_participants}</span>
            </div>
            <p className="text-sm text-muted-foreground">Participantes Totales</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-linear-to-br from-green-500/10 to-emerald-500/10 rounded-xl p-6 border border-green-500/20"
          >
            <div className="flex items-center justify-between mb-2">
              <Gift className="w-8 h-8 text-green-500" />
              <span className="text-2xl font-bold text-foreground">{stats.completed}</span>
            </div>
            <p className="text-sm text-muted-foreground">Sorteos Realizados</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-linear-to-br from-orange-500/10 to-amber-500/10 rounded-xl p-6 border border-orange-500/20"
          >
            <div className="flex items-center justify-between mb-2">
              <Clock className="w-8 h-8 text-orange-500" />
              <span className="text-2xl font-bold text-foreground">{stats.pending_execution}</span>
            </div>
            <p className="text-sm text-muted-foreground">Pendientes de Ejecutar</p>
          </motion.div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3">
          <select
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            className="px-3 py-2 rounded-lg border border-input bg-background text-sm"
          >
            <option value="">Todos los estados</option>
            <option value="active">Activo</option>
            <option value="closed">Pendiente de ejecución</option>
            <option value="completed">Completado</option>
          </select>

          <select
            value={filters.sort_by}
            onChange={(e) => setFilters({ ...filters, sort_by: e.target.value })}
            className="px-3 py-2 rounded-lg border border-input bg-background text-sm"
          >
            <option value="created_at">Fecha de creación</option>
            <option value="start_date">Fecha de inicio</option>
            <option value="end_date">Fecha de fin</option>
          </select>

          <select
            value={filters.sort_order}
            onChange={(e) => setFilters({ ...filters, sort_order: e.target.value })}
            className="px-3 py-2 rounded-lg border border-input bg-background text-sm"
          >
            <option value="desc">Descendente</option>
            <option value="asc">Ascendente</option>
          </select>
        </div>

        {/* Raffles Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : (
            <>
              <DataTable
                columns={columns}
                data={raffles}
                onRowClick={handleViewDetails}
              />

              {/* Pagination */}
              {pagination.last_page > 1 && (
                <div className="flex justify-center items-center gap-2 mt-6">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => fetchRaffles(pagination.current_page - 1)}
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
                    onClick={() => fetchRaffles(pagination.current_page + 1)}
                    disabled={pagination.current_page === pagination.last_page}
                  >
                    Siguiente
                  </Button>
                </div>
              )}
            </>
          )}
        </motion.div>
      </div>

      {/* Modals */}
      {showRaffleForm && (
        <RaffleFormModal
          isOpen={showRaffleForm}
          onClose={() => setShowRaffleForm(false)}
          onSuccess={() => {
            setShowRaffleForm(false);
            fetchRaffles(pagination.current_page);
          }}
        />
      )}

      {showRaffleDetails && selectedRaffle && (
        <RaffleDetailsModal
          isOpen={showRaffleDetails}
          onClose={() => setShowRaffleDetails(false)}
          raffle={selectedRaffle}
          onSuccess={() => fetchRaffles(pagination.current_page)}
        />
      )}

      {showExecuteRaffle && selectedRaffle && (
        <ExecuteRaffleModal
          isOpen={showExecuteRaffle}
          onClose={() => setShowExecuteRaffle(false)}
          raffle={selectedRaffle}
          onSuccess={() => {
            setShowExecuteRaffle(false);
            fetchRaffles(pagination.current_page);
          }}
        />
      )}
    </>
  );
}
