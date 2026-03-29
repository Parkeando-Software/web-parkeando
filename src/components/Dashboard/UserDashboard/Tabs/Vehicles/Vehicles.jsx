import { useState, useEffect } from "react";
import api from "@/config/api";
import apiRoutes from "@/config/apiRoutes";
import { useSwal } from "@/hooks/useSwal";

// Componentes
import VehicleCard from "@components/Dashboard/UserDashboard/Tabs/Vehicles/VehicleCard";
import VehicleModal from "@components/Dashboard/UserDashboard/Tabs/Vehicles/VehicleModal";
import { Button } from "@/components/ui/button";
import { 
  Car, 
  Plus, 
  Info, 
  AlertCircle, 
  Sparkles 
} from "lucide-react";

// Utils
import { colorOptions } from "@utils/vehicles-colors";

export default function Vehicles() {
  const Swal = useSwal();
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true); // Inicializar en true para evitar parpadeo
  const [showModal, setShowModal] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState(null);
  const [vehicleForm, setVehicleForm] = useState({
    plate: "",
    brand: "",
    model: "",
    color: "",
  });
  const [plateConsent, setPlateConsent] = useState(false);

  const MAX_VEHICLES = 3;
  const vehicleCount = vehicles.length;
  const canAddVehicle = vehicleCount < MAX_VEHICLES;

  // Cargar vehículos
  useEffect(() => {
    loadVehicles();
  }, []);

  const loadVehicles = async () => {
    try {
      setLoading(true);
      const response = await api.get(apiRoutes.vehicles.index());
      setVehicles(response.data || []);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudieron cargar los vehículos",
      });
    } finally {
      setLoading(false);
    }
  };

  // Añadir o editar vehículo
  const handleSaveVehicle = async (e) => {
    e.preventDefault();
    if (!plateConsent && !editingVehicle) {
      Swal.fire({
        icon: "warning",
        title: "Verificación requerida",
        text: "Por favor, confirma que la matrícula es correcta.",
        timer: 2500,
        showConfirmButton: false,
      });
      return;
    }
    try {
      setLoading(true);
      if (editingVehicle) {
        await api.patch(
          apiRoutes.vehicles.update(editingVehicle.id),
          vehicleForm
        );
        Swal.fire({
          icon: "success",
          title: "Actualizado",
          text: "Los datos del vehículo se han guardado.",
          timer: 2000,
          showConfirmButton: false,
        });
      } else {
        await api.post(apiRoutes.vehicles.store(), vehicleForm);
        Swal.fire({
          icon: "success",
          title: "¡Vehículo añadido!",
          text: "Ya puedes gestionar tus servicios.",
          timer: 2000,
          showConfirmButton: false,
        });
      }
      setShowModal(false);
      setEditingVehicle(null);
      setVehicleForm({ plate: "", brand: "", model: "", color: "" });
      setPlateConsent(false);
      loadVehicles();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Algo salió mal",
        text: error.response?.data?.message || "No se pudo guardar el vehículo",
      });
    } finally {
      setLoading(false);
    }
  };

  // Abrir modal para crear
  const handleAddVehicle = () => {
    setVehicleForm({ plate: "", brand: "", model: "", color: "" });
    setPlateConsent(false);
    setEditingVehicle(null);
    setShowModal(true);
  };

  // Abrir modal para editar
  const handleEditVehicle = (vehicle) => {
    setVehicleForm({
      plate: vehicle.plate || "",
      brand: vehicle.brand || "",
      model: vehicle.model || "",
      color: colorOptions.find((c) => c.value === vehicle.color)?.value || "",
    });
    setPlateConsent(true);
    setEditingVehicle(vehicle);
    setShowModal(true);
  };

  // Eliminar vehículo
  const handleDeleteVehicle = (vehicleId) => {
    Swal.fire({
      title: "¿Eliminar vehículo?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444", // Red-500
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          setLoading(true);
          await api.delete(apiRoutes.vehicles.destroy(vehicleId));
          Swal.fire({
            icon: "success",
            title: "Eliminado",
            timer: 1500,
            showConfirmButton: false,
          });
          loadVehicles();
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "No se pudo eliminar el vehículo",
          });
        } finally {
          setLoading(false);
        }
      }
    });
  };

  // Predeterminar vehículo
  const handleSetDefaultVehicle = async (vehicle) => {
    const result = await Swal.fire({
      title: "¿Establecer como predeterminado?",
      html: `El vehículo <b>${vehicle.brand} ${vehicle.model}</b> será tu opción principal.`,
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#0083E6",
      cancelButtonColor: "#6b7280",
    });

    if (!result.isConfirmed) return;
    setLoading(true);
    try {
      const token = localStorage.getItem("userToken") || localStorage.getItem("authToken");
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/vehicles/${vehicle.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            ...vehicle,
            is_default: true,
          }),
        }
      );
      if (res.ok) {
        setVehicles((prev) =>
          prev.map((v) => ({ ...v, is_default: v.id === vehicle.id }))
        );
        Swal.fire({
          icon: "success",
          title: "¡Listo!",
          text: "Vehículo predeterminado actualizado.",
          timer: 1500,
          showConfirmButton: false,
        });
      } else {
        throw new Error("Failed to update");
      }
    } catch {
      Swal.fire({
        icon: "error",
        title: "Error de conexión",
        timer: 2000,
        showConfirmButton: false,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-100 dark:border-slate-700 pb-6">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            Mis Vehículos
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">
            Gestiona la flota de tu cuenta.
          </p>
        </div>

        <div className="flex items-center gap-4">
          {/* Contador visual de límite */}
          <div className="hidden sm:flex flex-col items-end mr-2">
             <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
               Capacidad
             </span>
             <div className="flex items-center gap-1.5">
                <span className={`text-sm font-bold ${!canAddVehicle ? "text-red-500" : "text-[#0083E6]"}`}>
                  {vehicleCount}
                </span>
                <span className="text-slate-300">/</span>
                <span className="text-sm text-slate-500">{MAX_VEHICLES}</span>
             </div>
          </div>

          <Button
            onClick={handleAddVehicle}
            className={`transition-all duration-300 shadow-md ${
              canAddVehicle
                ? "bg-[#0083E6] hover:bg-[#006bb3] hover:shadow-lg text-white"
                : "bg-slate-100 text-slate-400 cursor-not-allowed"
            }`}
            disabled={!canAddVehicle}
          >
            <Plus className="w-4 h-4 mr-2" />
            {canAddVehicle ? "Añadir Vehículo" : "Límite Alcanzado"}
          </Button>
        </div>
      </div>

      {/* Loading Skeleton */}
      {loading && vehicles.length === 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2].map((i) => (
            <div key={i} className="h-48 rounded-xl bg-slate-100 dark:bg-slate-800 animate-pulse border border-slate-200 dark:border-slate-700"></div>
          ))}
        </div>
      ) : vehicles.length === 0 ? (
        /* Empty State Moderno */
        <div className="flex flex-col items-center justify-center py-16 px-4 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-2xl bg-slate-50/50 dark:bg-slate-800/30 transition-all hover:bg-slate-50 dark:hover:bg-slate-800/50">
          <div className="relative mb-4 group cursor-pointer" onClick={handleAddVehicle}>
            <div className="absolute inset-0 bg-blue-100 dark:bg-blue-900/30 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative bg-white dark:bg-slate-800 p-4 rounded-full shadow-sm border border-slate-100 dark:border-slate-700">
              <Car size={32} className="text-[#0083E6]" />
            </div>
            <div className="absolute -right-1 -top-1 bg-[#0083E6] rounded-full p-1 shadow-sm">
               <Plus size={12} className="text-white" />
            </div>
          </div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">
            No tienes vehículos registrados
          </h3>
          <p className="text-slate-500 dark:text-slate-400 text-center max-w-sm mb-6 text-sm">
            Añade tu primer vehículo para agilizar tus reservas y mantener el control de tus servicios.
          </p>
          <Button
            variant="outline"
            onClick={handleAddVehicle}
            className="border-[#0083E6] text-[#0083E6] hover:bg-blue-50 dark:hover:bg-blue-900/20"
          >
            Registrar mi primer vehículo
          </Button>
        </div>
      ) : (
        /* Grid de Vehículos */
        <>
          {!canAddVehicle && (
             <div className="flex items-center gap-2 p-3 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800/30 text-amber-700 dark:text-amber-400 text-sm">
                <AlertCircle size={16} />
                Has alcanzado el límite de vehículos permitidos ({MAX_VEHICLES}).
             </div>
          )}
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {vehicles.map((vehicle) => (
              <div key={vehicle.id} className="transition-transform hover:-translate-y-1 duration-300">
                <VehicleCard
                  vehicle={vehicle}
                  onEdit={handleEditVehicle}
                  onDelete={handleDeleteVehicle}
                  onSetDefault={handleSetDefaultVehicle}
                  colorOptions={colorOptions}
                />
              </div>
            ))}
          </div>
        </>
      )}

      {/* Information Footer */}
      {vehicles.length > 0 && (
        <div className="flex items-start gap-2 text-xs text-slate-400 mt-8 px-2">
          <Info size={14} className="mt-0.5 shrink-0" />
          <p>
            Los vehículos predeterminados se seleccionarán automáticamente para tus aparcamientos. 
            Puedes editar la información de la matrícula si cometiste un error al registrarla.
          </p>
        </div>
      )}

      <VehicleModal
        showModal={showModal}
        editingVehicle={editingVehicle}
        vehicleForm={vehicleForm}
        setVehicleForm={setVehicleForm}
        plateConsent={plateConsent}
        setPlateConsent={setPlateConsent}
        colorOptions={colorOptions}
        onClose={() => setShowModal(false)}
        onSave={handleSaveVehicle}
      />
    </div>
  );
}