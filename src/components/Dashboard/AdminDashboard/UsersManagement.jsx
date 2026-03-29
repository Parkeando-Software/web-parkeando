import React, { useState, useEffect } from "react";
import { Search, Plus, Edit, Trash2, DollarSign, Star, Car, Eye } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@components/ui/card";
import { Input } from "@components/ui/input";
import { Button } from "@components/ui/button";
import { Badge } from "@components/ui/badge";
import DataTable from "./DataTable";
import { useSwal } from "@hooks/useSwal";
import * as adminUserService from "@services/adminUserService";
import { handleApiError, getRoleName, getRoleBadgeColor, formatPoints, formatReputation } from "@utils/adminHelpers";
import UserFormModal from "./Modals/UserFormModal";
import UserDetailsModal from "./Modals/UserDetailsModal";
import UpdatePointsModal from "./Modals/UpdatePointsModal";
import UpdateReputationModal from "./Modals/UpdateReputationModal";
import UserVehiclesModal from "./Modals/UserVehiclesModal";
import Avatar from "@components/Dashboard/UserDashboard/Tabs/Profile/Avatar";

export default function UsersManagement({ initialAction, clearAction }) {
  const swal = useSwal();
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    per_page: 15,
    total: 0,
  });
  
  // Filters
  const [filters, setFilters] = useState({
    role_id: "",
    account_activated: "",
    sort_by: "created_at",
    sort_order: "desc",
  });

  // Modals state
  const [showUserForm, setShowUserForm] = useState(false);
  const [showUserDetails, setShowUserDetails] = useState(false);
  const [showUpdatePoints, setShowUpdatePoints] = useState(false);
  const [showUpdateReputation, setShowUpdateReputation] = useState(false);
  const [showUserVehicles, setShowUserVehicles] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // Fetch users
  const fetchUsers = async (page = 1) => {
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

      const response = await adminUserService.getUsers(params);
      setUsers(response.data);
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
    fetchUsers(1);
  }, [filters]);

  // Handle initial action
  useEffect(() => {
    if (initialAction === 'create_user') {
      setSelectedUser(null);
      setIsEditing(false);
      setShowUserForm(true);
      if (clearAction) clearAction();
    }
  }, [initialAction, clearAction]);

  // Search with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm !== undefined) {
        fetchUsers(1);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Handle create user
  const handleCreateUser = () => {
    setSelectedUser(null);
    setIsEditing(false);
    setShowUserForm(true);
  };

  // Handle edit user
  const handleEditUser = (user) => {
    setSelectedUser(user);
    setIsEditing(true);
    setShowUserForm(true);
  };

  // Handle view user details
  const handleViewUser = async (user) => {
    try {
      const response = await adminUserService.getUserById(user.id);
      setSelectedUser(response);
      setShowUserDetails(true);
    } catch (error) {
      swal.fire({
        title: "Error",
        text: handleApiError(error),
        icon: "error",
      });
    }
  };

  // Handle delete user
  const handleDeleteUser = async (user) => {
    const result = await swal.fire({
      title: "¿Eliminar usuario?",
      text: `¿Estás seguro de que deseas eliminar a ${user.name}? Esta acción no se puede deshacer.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      try {
        await adminUserService.deleteUser(user.id);
        swal.fire({
          title: "Usuario eliminado",
          text: "El usuario ha sido eliminado exitosamente.",
          icon: "success",
          timer: 2000,
        });
        fetchUsers(pagination.current_page);
      } catch (error) {
        swal.fire({
          title: "Error",
          text: handleApiError(error),
          icon: "error",
        });
      }
    }
  };

  // Handle update points
  const handleUpdatePoints = (user) => {
    setSelectedUser(user);
    setShowUpdatePoints(true);
  };

  // Handle update reputation
  const handleUpdateReputation = (user) => {
    setSelectedUser(user);
    setShowUpdateReputation(true);
  };

  // Handle manage vehicles
  const handleManageVehicles = (user) => {
    setSelectedUser(user);
    setShowUserVehicles(true);
  };

  // Table columns
  const columns = [
    {
      header: "Usuario",
      key: "name",
      render: (value, row) => (
        <div className="flex items-center gap-3">
          <Avatar avatar={row.avatar ?? 0} size="md" />
          <div>
            <p className="font-medium">{row.username}</p>
            <p className="text-xs text-muted-foreground">{row.email}</p>
          </div>
        </div>
      ),
    },
    {
      header: "Rol",
      key: "role_id",
      render: (value, row) => (
        <Badge className={getRoleBadgeColor(row.role_id)}>
      {getRoleName(row.role_id)}
    </Badge>
      ),
    },
    {
      header: "Estado",
      key: "account_activated",
      render: (value, row) => (
        <Badge variant={row.account_activated ? "default" : "secondary"}>
          {row.account_activated ? "Activo" : "Inactivo"}
        </Badge>
      ),
    },
    {
      header: "Vehículos",
      key: "vehicles",
      render: (value, row) => (
        <div className="flex items-center gap-2">
          <Car className="w-4 h-4 text-muted-foreground" />
          <span>{row.vehicles?.length || 0}</span>
        </div>
      ),
    },
    {
      header: "Puntos",
      key: "customer",
      render: (value, row) => (
        <span className="font-medium">
          {row.customer ? formatPoints(row.customer.points) : "-"}
        </span>
      ),
    },
    {
      header: "Reputación",
      key: "reputation",
      render: (value, row) => (
        <div className="flex items-center gap-1">
          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
          <span className="font-medium">
            {row.customer ? formatReputation(row.customer.reputation) : "-"}
          </span>
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
              handleViewUser(row);
            }}
            className="p-2 hover:bg-accent rounded-lg transition-colors"
            title="Ver detalles"
          >
            <Eye className="w-4 h-4 text-blue-500" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleEditUser(row);
            }}
            className="p-2 hover:bg-accent rounded-lg transition-colors"
            title="Editar"
          >
            <Edit className="w-4 h-4 text-green-500" />
          </button>
          {row.customer && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleUpdatePoints(row);
                }}
                className="p-2 hover:bg-accent rounded-lg transition-colors"
                title="Actualizar puntos"
              >
                <DollarSign className="w-4 h-4 text-purple-500" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleUpdateReputation(row);
                }}
                className="p-2 hover:bg-accent rounded-lg transition-colors"
                title="Actualizar reputación"
              >
                <Star className="w-4 h-4 text-yellow-500" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleManageVehicles(row);
                }}
                className="p-2 hover:bg-accent rounded-lg transition-colors"
                title="Gestionar vehículos"
              >
                <Car className="w-4 h-4 text-blue-600" />
              </button>
            </>
          )}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteUser(row);
            }}
            className="p-2 hover:bg-accent rounded-lg transition-colors"
            title="Eliminar"
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
            <CardTitle>Gestión de Usuarios</CardTitle>
            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              {/* Search */}
              <div className="relative flex-1 lg:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Buscar usuarios..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              {/* Create button */}
              <Button onClick={handleCreateUser} className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Crear Usuario
              </Button>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-3 mt-4">
            <select
              value={filters.role_id}
              onChange={(e) => setFilters({ ...filters, role_id: e.target.value })}
              className="px-3 py-2 rounded-lg border border-input bg-background text-sm"
            >
              <option value="">Todos los roles</option>
              <option value="1">Usuario</option>
              <option value="2">Usuario Pro</option>
              <option value="3">Administrador</option>
              <option value="4">Súper Administrador</option>
            </select>

            <select
              value={filters.account_activated}
              onChange={(e) => setFilters({ ...filters, account_activated: e.target.value })}
              className="px-3 py-2 rounded-lg border border-input bg-background text-sm"
            >
              <option value="">Todos los estados</option>
              <option value="1">Activos</option>
              <option value="0">Inactivos</option>
            </select>

            <select
              value={filters.sort_by}
              onChange={(e) => setFilters({ ...filters, sort_by: e.target.value })}
              className="px-3 py-2 rounded-lg border border-input bg-background text-sm"
            >
              <option value="created_at">Fecha de creación</option>
              <option value="name">Nombre</option>
              <option value="email">Email</option>
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
                data={users}
                onRowClick={handleViewUser}
              />

              {/* Pagination */}
              {pagination.last_page > 1 && (
                <div className="flex justify-center items-center gap-2 mt-6">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => fetchUsers(pagination.current_page - 1)}
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
                    onClick={() => fetchUsers(pagination.current_page + 1)}
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

      {/* Modals */}
      {showUserForm && (
        <UserFormModal
          isOpen={showUserForm}
          onClose={() => setShowUserForm(false)}
          user={selectedUser}
          isEditing={isEditing}
          onSuccess={() => {
            setShowUserForm(false);
            fetchUsers(pagination.current_page);
          }}
        />
      )}

      {showUserDetails && selectedUser && (
        <UserDetailsModal
          isOpen={showUserDetails}
          onClose={() => setShowUserDetails(false)}
          user={selectedUser}
        />
      )}

      {showUpdatePoints && selectedUser && (
        <UpdatePointsModal
          isOpen={showUpdatePoints}
          onClose={() => setShowUpdatePoints(false)}
          user={selectedUser}
          onSuccess={() => {
            setShowUpdatePoints(false);
            fetchUsers(pagination.current_page);
          }}
        />
      )}

      {showUpdateReputation && selectedUser && (
        <UpdateReputationModal
          isOpen={showUpdateReputation}
          onClose={() => setShowUpdateReputation(false)}
          user={selectedUser}
          onSuccess={() => {
            setShowUpdateReputation(false);
            fetchUsers(pagination.current_page);
          }}
        />
      )}

      {showUserVehicles && selectedUser && (
        <UserVehiclesModal
          isOpen={showUserVehicles}
          onClose={() => setShowUserVehicles(false)}
          user={selectedUser}
        />
      )}
    </>
  );
}
