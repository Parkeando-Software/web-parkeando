import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ShieldAlert, Trash2, Clock, AlertCircle } from "lucide-react";
import { useSwal } from "@/hooks/useSwal";
import api from "@config/api";
import { useAuth } from "@context/AuthContext";

export default function ProfileDanger() {
  const Swal = useSwal();
  const { user } = useAuth();
  const [deleteRequest, setDeleteRequest] = useState(null);
  const [loading, setLoading] = useState(true);

  // Verificar si hay solicitud de eliminación pendiente
  useEffect(() => {
    const checkDeleteRequest = async () => {
      try {
        const response = await api.get('/account/delete-request/status');
        if (response.data && response.data.has_pending_request) {
          setDeleteRequest(response.data);
        }
      } catch (error) {
        // Si no hay solicitud o hay error, no hacer nada
        console.log('No pending delete request');
      } finally {
        setLoading(false);
      }
    };

    checkDeleteRequest();
  }, []);

  const calculateDaysRemaining = (scheduledDate) => {
    const now = new Date();
    const scheduled = new Date(scheduledDate);
    const diffTime = scheduled - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const handleDeleteAccount = async () => {
    // Obtener email desde localStorage si existe
    let userEmail = user?.email || "";
    if (!userEmail) {
      try {
        const stored = localStorage.getItem("user");
        if (stored) {
          const parsed = JSON.parse(stored);
          userEmail = parsed?.email || "";
        }
      } catch (e) {
        console.warn("No se pudo leer el usuario desde localStorage", e);
      }
    }

    const result = await Swal.fire({
      title: "¿Eliminar tu cuenta?",
      html: `
              <div class="text-left">
                <p class="mb-3">Si ya no deseas usar ParKeando, puedes solicitar la eliminación completa de tu cuenta y todos tus datos personales.</p>
                <p class="mb-3">Esta acción eliminará <strong>permanentemente</strong>:</p>
                <ul class="list-disc list-inside text-sm space-y-1 mb-4">
                  <li>Tu perfil y datos personales</li>
                  <li>Todos tus vehículos registrados</li>
                  <li>Tu historial de estacionamientos</li>
                  <li>Tus ParkiPoints y números de sorteo</li>
                  <li>Todas las configuraciones de la app</li>
                </ul>
                <p class="text-sm text-red-600 font-semibold">
                  ⚠️ Advertencia: Esta acción es irreversible. Se eliminarán todos tus datos, historial y ParkiPoints.
                </p>
              </div>
            `,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar cuenta",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      reverseButtons: true,
      focusCancel: true,
    });

    if (!result.isConfirmed) return;

    // Mostrar loading mientras se procesa la solicitud
    Swal.fire({
      title: "Procesando solicitud...",
      text: "Enviando solicitud de eliminación de cuenta",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const payload = {
        email: userEmail,
        reason: "dashboard_request",
        additional_info: "Solicitud realizada desde el dashboard del usuario",
      };

      const response = await api.post("/account/delete-request", payload);

      Swal.close();

      if (response && (response.status === 200 || response.status === 201)) {
        Swal.fire({
          icon: "success",
          title: "Solicitud enviada",
          text: "Revisa tu email para más información.",
          timer: 2500,
          showConfirmButton: false,
        });

        // Actualizar estado local
        setTimeout(() => {
          setDeleteRequest(response.data);
        }, 2500);
      } else {
        let errorMsg = "Error al procesar la solicitud";
        try {
          const data = response.data || {};
          errorMsg = data.error || data.message || errorMsg;
        } catch (e) {}

        Swal.fire({
          icon: "error",
          title: "Error",
          text: errorMsg,
        });
      }
    } catch (error) {
      Swal.close();
      console.error("Error al enviar solicitud:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "Hubo un problema al enviar tu solicitud. Por favor, inténtalo de nuevo o contacta con nosotros directamente.",
      });
    }
  };

  if (loading) {
    return (
      <div className="border border-slate-200 dark:border-slate-700 bg-slate-50/30 dark:bg-slate-800/10 rounded-2xl p-6 animate-pulse">
        <div className="h-20 bg-slate-200 dark:bg-slate-700 rounded"></div>
      </div>
    );
  }

  // Si hay solicitud pendiente o en proceso, mostrar estado
  if (deleteRequest) {
    // Estado: PENDIENTE (Esperando confirmación por email)
    if (deleteRequest.status === 'pending') {
      return (
        <div className="border border-yellow-100 dark:border-yellow-900/30 bg-yellow-50/30 dark:bg-yellow-900/10 rounded-2xl p-6">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg mt-1">
              <Clock className="text-yellow-600 dark:text-yellow-400" size={20} />
            </div>
            <div className="flex-1">
              <h4 className="text-yellow-700 dark:text-yellow-400 font-semibold mb-2">
                Solicitud de eliminación pendiente de confirmación
              </h4>
              <p className="text-yellow-600/70 dark:text-yellow-400/70 text-sm mb-3">
                Hemos recibido tu solicitud para eliminar tu cuenta. Por favor, revisa tu correo electrónico y haz clic en el enlace de confirmación para proceder.
              </p>
              <p className="text-xs text-yellow-600/60 dark:text-yellow-400/60">
                Si no confirmas la solicitud, tu cuenta permanecerá activa.
              </p>
            </div>
          </div>
        </div>
      );
    }

    // Estado: PROCESANDO (Cuenta regresiva de 30 días)
    if (deleteRequest.status === 'processing') {
      // Calcular días restantes desde confirmed_at + 30 días
      const confirmedDate = new Date(deleteRequest.confirmed_at);
      const deletionDate = new Date(confirmedDate);
      deletionDate.setDate(confirmedDate.getDate() + 30);
      
      const daysRemaining = calculateDaysRemaining(deletionDate);
      
      return (
        <div className="border border-orange-100 dark:border-orange-900/30 bg-orange-50/30 dark:bg-orange-900/10 rounded-2xl p-6">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg mt-1">
              <Clock className="text-orange-600 dark:text-orange-400" size={20} />
            </div>
            <div className="flex-1">
              <h4 className="text-orange-700 dark:text-orange-400 font-semibold mb-2">
                Eliminación de cuenta en proceso
              </h4>
              <p className="text-orange-600/70 dark:text-orange-400/70 text-sm mb-3">
                Has confirmado la eliminación de tu cuenta. Tu cuenta y todos tus datos serán eliminados automáticamente en:
              </p>
              <div className="flex items-center gap-2 bg-orange-100 dark:bg-orange-900/20 rounded-lg p-3 mb-3">
                <AlertCircle className="text-orange-600 dark:text-orange-400" size={18} />
                <span className="text-orange-700 dark:text-orange-300 font-semibold">
                  {daysRemaining} {daysRemaining === 1 ? 'día' : 'días'} restantes
                </span>
              </div>
              <p className="text-xs text-orange-600/60 dark:text-orange-400/60">
                Si deseas cancelar esta solicitud, revisa el email que te enviamos con el enlace de cancelación.
              </p>
            </div>
          </div>
        </div>
      );
    }
  }

  // Si no hay solicitud pendiente, mostrar botón normal
  return (
    <div className="border border-red-100 dark:border-red-900/30 bg-red-50/30 dark:bg-red-900/10 rounded-2xl p-6 flex flex-col sm:flex-row justify-between items-center gap-4">
      <div className="flex items-start gap-3">
        <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg mt-1">
          <ShieldAlert className="text-red-600 dark:text-red-400" size={20} />
        </div>
        <div>
          <h4 className="text-red-700 dark:text-red-400 font-semibold">
            Eliminar cuenta
          </h4>
          <p className="text-red-600/70 dark:text-red-400/70 text-sm max-w-md">
            Eliminar tu cuenta borrará permanentemente todos tus datos,
            vehículos e historial. Esta acción no se puede deshacer.
          </p>
        </div>
      </div>
      <Button
        variant="destructive"
        onClick={handleDeleteAccount}
        className="bg-white hover:bg-red-50 text-red-600 border border-red-200 dark:bg-red-950 dark:hover:bg-red-900 dark:border-red-800 whitespace-nowrap shadow-sm"
      >
        <Trash2 size={16} className="mr-2" />
        Eliminar Cuenta
      </Button>
    </div>
  );
}
