import React, { useState, useEffect } from "react";
import { Search, Eye, CheckCircle, XCircle, Clock, AlertTriangle } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@components/ui/card";
import { Input } from "@components/ui/input";
import { Button } from "@components/ui/button";
import { Badge } from "@components/ui/badge";
import DataTable from "./DataTable";
import { useSwal } from "@hooks/useSwal";
import * as adminDeleteRequestService from "@services/adminDeleteRequestService";
import { handleApiError, getStatusBadgeColor, getStatusLabel, formatDateTime } from "@utils/adminHelpers";
import DeleteRequestDetailsModal from "./Modals/DeleteRequestDetailsModal";

export default function DeleteRequestsManagement() {
  const swal = useSwal();
  const [searchTerm, setSearchTerm] = useState("");
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    per_page: 15,
    total: 0,
  });
  
  // Filters
  const [filters, setFilters] = useState({
    status: "",
    confirmed: "",
    sort_by: "created_at",
    sort_order: "desc",
  });

  // Modals state
  const [showDetails, setShowDetails] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  // Fetch delete requests
  const fetchRequests = async (page = 1) => {
    setLoading(true);
    try {
      const params = {
        page,
        per_page: pagination.per_page,
        search: searchTerm || undefined,
        ...filters,
      };
      
      // Remove empty filters
      Object.keys(params).forEach(key => {
        if (params[key] === "" || params[key] === undefined) {
          delete params[key];
        }
      });

      const response = await adminDeleteRequestService.getDeleteRequests(params);
      setRequests(response.data);
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

  // Initial load and when filters change
  useEffect(() => {
    fetchRequests(1);
  }, [filters]);

  // Search with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm !== undefined) {
        fetchRequests(1);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Handle view details
  const handleViewDetails = async (request) => {
    try {
      const response = await adminDeleteRequestService.getDeleteRequestById(request.id);
      setSelectedRequest(response);
      setShowDetails(true);
    } catch (error) {
      swal.fire({
        title: "Error",
        text: handleApiError(error),
        icon: "error",
      });
    }
  };

  // Handle execute deletion
  const handleExecute = async (request) => {
    const result = await swal.fire({
      title: "¿Ejecutar eliminación?",
      html: `
        <p>¿Estás seguro de que deseas eliminar la cuenta de <strong>${request.user_email}</strong>?</p>
        <p class="text-red-600 mt-2"><strong>Esta acción no se puede deshacer.</strong></p>
      `,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar cuenta",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#dc2626",
    });

    if (result.isConfirmed) {
      try {
        await adminDeleteRequestService.executeDeleteRequest(request.id);
        swal.fire({
          title: "Cuenta eliminada",
          text: "La cuenta ha sido eliminada exitosamente.",
          icon: "success",
          timer: 2000,
        });
        fetchRequests(pagination.current_page);
      } catch (error) {
        swal.fire({
          title: "Error",
          text: handleApiError(error),
          icon: "error",
        });
      }
    }
  };

  // Handle cancel request
  const handleCancel = async (request) => {
    const result = await swal.fire({
      title: "¿Cancelar solicitud?",
      text: `¿Estás seguro de que deseas cancelar la solicitud de ${request.user_email}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí, cancelar solicitud",
      cancelButtonText: "No",
    });

    if (result.isConfirmed) {
      try {
        await adminDeleteRequestService.cancelDeleteRequest(request.id);
        swal.fire({
          title: "Solicitud cancelada",
          text: "La solicitud ha sido cancelada exitosamente.",
          icon: "success",
          timer: 2000,
        });
        fetchRequests(pagination.current_page);
      } catch (error) {
        swal.fire({
          title: "Error",
          text: handleApiError(error),
          icon: "error",
        });
      }
    }
  };

  // Table columns
  const columns = [
    {
      header: "Email",
      key: "user_email",
      render: (value) => (
        <div className="font-medium">{value}</div>
      ),
    },
    {
      header: "Estado",
      key: "status",
      render: (value) => (
        <Badge className={getStatusBadgeColor(value)}>
          {getStatusLabel(value)}
        </Badge>
      ),
    },
    {
      header: "Confirmada",
      key: "confirmed_at",
      render: (value) => (
        <div className="flex items-center gap-2">
          {value ? (
            <>
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span className="text-sm">{formatDateTime(value)}</span>
            </>
          ) : (
            <>
              <XCircle className="w-4 h-4 text-red-500" />
              <span className="text-sm text-muted-foreground">No confirmada</span>
            </>
          )}
        </div>
      ),
    },
    {
      header: "Días Restantes",
      key: "days_remaining",
      render: (value, row) => {
        if (row.status !== "processing" || !row.confirmed_at) {
          return <span className="text-muted-foreground">-</span>;
        }
        
        if (value === null) return <span className="text-muted-foreground">-</span>;
        
        if (value === 0) {
          return (
            <div className="flex items-center gap-2 text-red-600">
              <AlertTriangle className="w-4 h-4" />
              <span className="font-semibold">Vencido</span>
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
      header: "Fecha Solicitud",
      key: "created_at",
      render: (value) => (
        <span className="text-sm">{formatDateTime(value)}</span>
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
          
          {row.status === "processing" && row.confirmed_at && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleExecute(row);
              }}
              className="p-2 hover:bg-accent rounded-lg transition-colors"
              title="Ejecutar eliminación"
            >
              <CheckCircle className="w-4 h-4 text-green-500" />
            </button>
          )}
          
          {(row.status === "pending" || row.status === "processing") && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleCancel(row);
              }}
              className="p-2 hover:bg-accent rounded-lg transition-colors"
              title="Cancelar solicitud"
            >
              <XCircle className="w-4 h-4 text-red-500" />
            </button>
          )}
        </div>
      ),
    },
  ];

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div>
              <CardTitle>Solicitudes de Eliminación de Cuenta</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Gestiona las solicitudes de eliminación de cuenta de los usuarios
              </p>
            </div>
            <div className="relative w-full lg:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Buscar por email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-3 mt-4">
            <select
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              className="px-3 py-2 rounded-lg border border-input bg-background text-sm"
            >
              <option value="">Todos los estados</option>
              <option value="pending">Pendiente</option>
              <option value="processing">En Proceso</option>
              <option value="completed">Completado</option>
              <option value="cancelled">Cancelado</option>
            </select>

            <select
              value={filters.confirmed}
              onChange={(e) => setFilters({ ...filters, confirmed: e.target.value })}
              className="px-3 py-2 rounded-lg border border-input bg-background text-sm"
            >
              <option value="">Todas</option>
              <option value="1">Confirmadas</option>
              <option value="0">No confirmadas</option>
            </select>

            <select
              value={filters.sort_by}
              onChange={(e) => setFilters({ ...filters, sort_by: e.target.value })}
              className="px-3 py-2 rounded-lg border border-input bg-background text-sm"
            >
              <option value="created_at">Fecha de solicitud</option>
              <option value="confirmed_at">Fecha de confirmación</option>
              <option value="user_email">Email</option>
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
                data={requests}
                onRowClick={handleViewDetails}
              />

              {/* Pagination */}
              {pagination.last_page > 1 && (
                <div className="flex justify-center items-center gap-2 mt-6">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => fetchRequests(pagination.current_page - 1)}
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
                    onClick={() => fetchRequests(pagination.current_page + 1)}
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

      {/* Details Modal */}
      {showDetails && selectedRequest && (
        <DeleteRequestDetailsModal
          isOpen={showDetails}
          onClose={() => setShowDetails(false)}
          request={selectedRequest}
          onExecute={() => {
            setShowDetails(false);
            handleExecute(selectedRequest.delete_request);
          }}
          onCancel={() => {
            setShowDetails(false);
            handleCancel(selectedRequest.delete_request);
          }}
        />
      )}
    </>
  );
}
