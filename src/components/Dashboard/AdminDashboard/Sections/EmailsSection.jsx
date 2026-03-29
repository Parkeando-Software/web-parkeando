import React, { useState, useEffect } from "react";
import { Search, Mail, Filter, RefreshCw, Send, AlertCircle, CheckCircle, Clock } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@components/ui/card";
import { Input } from "@components/ui/input";
import { Button } from "@components/ui/button";
import { Badge } from "@components/ui/badge";
import DataTable from "../DataTable";
import { useSwal } from "@hooks/useSwal";
import adminEmailService from "@services/adminEmailService";
import { handleApiError } from "@utils/adminHelpers";
import EmailDetailsModal from "../Modals/EmailDetailsModal";
import SendEmailModal from "../Modals/SendEmailModal";
import { format } from "date-fns";
import { es } from "date-fns/locale";

export default function EmailsSection() {
  const swal = useSwal();
  const [searchTerm, setSearchTerm] = useState("");
  const [emails, setEmails] = useState([]);
  const [stats, setStats] = useState({ total: 0, outgoing: 0, incoming: 0 });
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    per_page: 15,
    total: 0,
  });
  
  // Filters
  const [activeTab, setActiveTab] = useState("all"); // all, incoming, outgoing
  const [filters, setFilters] = useState({
    type: "",
    status: "",
  });

  // Modals state
  const [showDetails, setShowDetails] = useState(false);
  const [showSendEmail, setShowSendEmail] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState(null);

  // Fetch emails
  const fetchEmails = async (page = 1) => {
    setLoading(true);
    try {
      const params = {
        page,
        per_page: pagination.per_page,
        search: searchTerm || undefined,
        direction: activeTab === "all" ? undefined : activeTab,
        ...filters,
      };
      
      // Remove empty filters
      Object.keys(params).forEach(key => {
        if (params[key] === "" || params[key] === undefined) {
          delete params[key];
        }
      });

      const response = await adminEmailService.getEmails(params);
      setEmails(response.data);
      setPagination({
        current_page: response.current_page,
        last_page: response.last_page,
        per_page: response.per_page,
        total: response.total,
      });
    } catch (error) {
      console.error(error);
      swal.fire({
        title: "Error",
        text: "Error al cargar los emails",
        icon: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  // Fetch stats
  const fetchStats = async () => {
    try {
      const response = await adminEmailService.getStats();
      setStats(response);
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  // Initial load and when filters/tab change
  useEffect(() => {
    fetchEmails(1);
    fetchStats();
  }, [filters, activeTab]);

  // Search with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm !== undefined) {
        fetchEmails(1);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const handleViewEmail = (email) => {
    setSelectedEmail(email);
    setShowDetails(true);
  };

  const handleResendEmail = async (email) => {
    try {
      await adminEmailService.resendEmail(email.id);
      swal.fire({
        title: "Reenviado",
        text: "El email ha sido reenviado correctamente",
        icon: "success",
        timer: 1500
      });
      fetchEmails(pagination.current_page);
      fetchStats();
      if (showDetails) setShowDetails(false);
    } catch (error) {
      swal.fire({
        title: "Error",
        text: handleApiError(error),
        icon: "error",
      });
    }
  };

  // Table columns
  const columns = [
    {
      header: "Dirección",
      key: "direction",
      render: (value, row) => (
        <Badge 
          variant={row.direction === 'incoming' ? 'default' : 'secondary'} 
          className={`text-xs ${row.direction === 'incoming' ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 hover:bg-purple-200' : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 hover:bg-blue-200'}`}
        >
          {row.direction === 'incoming' ? 'Entrante' : 'Saliente'}
        </Badge>
      ),
    },
    {
      header: activeTab === 'incoming' ? "Remitente" : "Destinatario",
      key: activeTab === 'incoming' ? "sender_email" : "recipient_email",
      render: (value, row) => (
        <div className="flex flex-col">
          <span className="font-medium text-sm">
            {activeTab === 'incoming' ? row.sender_email : row.recipient_email}
          </span>
          {row.user && (
            <span className="text-xs text-muted-foreground">{row.user.name || row.user.username}</span>
          )}
        </div>
      ),
    },
    {
      header: "Asunto",
      key: "subject",
      render: (value, row) => (
        <span className="text-sm truncate max-w-[200px] block" title={row.subject}>
          {row.subject}
        </span>
      ),
    },
    {
      header: "Tipo",
      key: "type",
      render: (value, row) => {
        const types = {
          activate_account: 'Activación',
          reset_password: 'Password Reset',
          delete_account_confirmation: 'Eliminar Cuenta',
          delete_account_cancellation: 'Cancelar Elim.',
          contact_form: 'Contacto',
          admin_custom: 'Admin'
        };
        return <Badge variant="outline" className="text-xs whitespace-nowrap">{types[row.type] || row.type}</Badge>;
      },
    },
    {
      header: "Estado",
      key: "status",
      render: (value, row) => {
        const statusConfig = {
          sent: { color: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400", icon: CheckCircle, label: "OK" },
          failed: { color: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400", icon: AlertCircle, label: "Error" },
          pending: { color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400", icon: Clock, label: "Pendiente" },
        };
        const config = statusConfig[row.status] || statusConfig.pending;
        const Icon = config.icon;
        
        return (
          <Badge className={`${config.color} border-none flex items-center gap-1 w-fit`}>
            <Icon className="w-3 h-3" />
            {config.label}
          </Badge>
        );
      },
    },
    {
      header: "Fecha",
      key: "created_at",
      render: (value, row) => (
        <span className="text-xs text-muted-foreground whitespace-nowrap">
          {format(new Date(row.created_at), "d MMM yyyy, HH:mm", { locale: es })}
        </span>
      ),
    },
    {
      header: "Acciones",
      key: "actions",
      render: (value, row) => (
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              handleViewEmail(row);
            }}
            title="Ver detalles"
          >
            <Mail className="w-4 h-4 text-indigo-700" />
          </Button>
          {row.status === 'failed' && (
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                handleResendEmail(row);
              }}
              title="Reenviar"
            >
              <RefreshCw className="w-4 h-4 text-orange-500" />
            </Button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Emails</p>
              <h3 className="text-2xl font-bold text-indigo-700 dark:text-indigo-400">{stats.total}</h3>
            </div>
            <div className="p-3 bg-black/10 dark:bg-indigo-700/10 rounded-full">
              <Mail className="w-6 h-6 dark:text-indigo-400 text-indigo-700"/>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Enviados</p>
              <h3 className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stats.outgoing}</h3>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full">
              <Send className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Recibidos</p>
              <h3 className="text-2xl font-bold text-purple-600 dark:text-purple-400">{stats.incoming}</h3>
            </div>
            <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-full">
              <Mail className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-linear-to-br from-slate-50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 border-border">
        <CardHeader>
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <CardTitle>Historial de Correos</CardTitle>
            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              {/* Search */}
              <div className="relative flex-1 lg:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Buscar por email, asunto..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              {/* Send Email Button */}
              <Button onClick={() => setShowSendEmail(true)} className="flex items-center gap-2">
                <Send className="w-4 h-4" />
                Redactar Email
              </Button>
            </div>
          </div>

          {/* Tabs & Filters */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-4">
            {/* Tabs */}
            <div className="flex p-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
              <button
                onClick={() => setActiveTab("all")}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                  activeTab === "all"
                    ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm"
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                }`}
              >
                Todos
              </button>
              <button
                onClick={() => setActiveTab("incoming")}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                  activeTab === "incoming"
                    ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm"
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                }`}
              >
                Entrantes
              </button>
              <button
                onClick={() => setActiveTab("outgoing")}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                  activeTab === "outgoing"
                    ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm"
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                }`}
              >
                Salientes
              </button>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium hidden sm:inline">Filtros:</span>
              </div>
              
              <select
                value={filters.type}
                onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                className="px-3 py-2 rounded-lg border border-input bg-background text-sm"
              >
                <option value="">Todos los tipos</option>
                <option value="activate_account">Activación</option>
                <option value="reset_password">Reset Password</option>
                <option value="contact_form">Contacto</option>
                <option value="admin_custom">Admin</option>
              </select>

              <select
                value={filters.status}
                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                className="px-3 py-2 rounded-lg border border-input bg-background text-sm"
              >
                <option value="">Todos los estados</option>
                <option value="sent">Enviados</option>
                <option value="failed">Fallidos</option>
                <option value="pending">Pendientes</option>
              </select>
            </div>
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
                data={emails}
                onRowClick={handleViewEmail}
              />

              {/* Pagination */}
              {pagination.last_page > 1 && (
                <div className="flex justify-center items-center gap-2 mt-6">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => fetchEmails(pagination.current_page - 1)}
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
                    onClick={() => fetchEmails(pagination.current_page + 1)}
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
      <EmailDetailsModal
        isOpen={showDetails}
        onClose={() => setShowDetails(false)}
        email={selectedEmail}
        onResend={handleResendEmail}
      />

      <SendEmailModal
        isOpen={showSendEmail}
        onClose={() => setShowSendEmail(false)}
        onSuccess={() => {
          fetchEmails(1);
          fetchStats();
        }}
      />
    </div>
  );
}
