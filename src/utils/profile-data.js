import { useState, useEffect } from "react";
import { useAuth } from "@context/AuthContext";
import api from "@/config/api";
import apiRoutes from "@/config/apiRoutes";
import { useSwal } from "@/hooks/useSwal";

export function useProfileData() {
  const Swal = useSwal();
  const { user, fetchUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingAvatar, setIsEditingAvatar] = useState(false);
  const [loading, setLoading] = useState(true);
  const [vehicles, setVehicles] = useState([]);
  const [parkingHistory, setParkingHistory] = useState([]);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    city: "",
    avatar: 0,
    reputation: 0,
  });
  const [originalData, setOriginalData] = useState(null);

  // --- 1. LÓGICA DE CARGA ---

  const loadProfile = async () => {
    try {
      const response = await api.get(apiRoutes.me());
      const userData = response.data;
      const profileData = {
        username: userData.username || userData.name || "",
        email: userData.email || "",
        phone: userData.phone || "",
        city: userData.customer?.city || userData.city || "",
        avatar: userData.avatar ?? 0,
        reputation: userData.customer?.reputation ?? 0,
      };
      setFormData(profileData);
      setOriginalData(profileData);
      return profileData;
    } catch (error) {
      console.error("Error loading profile", error);
      return null;
    }
  };

  const loadVehicles = async () => {
    try {
      const response = await api.get(apiRoutes.vehicles.index());
      setVehicles(response.data || []);
    } catch (error) {
      console.error("Error al cargar vehículos:", error);
    }
  };

  const loadParkingHistory = async () => {
    try {
      const response = await api.get(apiRoutes.parkingHistory.index());
      setParkingHistory(response.data || []);
    } catch (error) {
      console.error("Error al cargar historial:", error);
    }
  };

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      await Promise.all([loadProfile(), loadVehicles(), loadParkingHistory()]);
      setLoading(false);
    };
    init();
  }, []);

  // --- 2. HANDLERS DE FORMULARIO Y EDICIÓN ---

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCityChange = (value) => {
    setFormData((prev) => ({ ...prev, city: value }));
  };

  const handleAvatarChange = (avatarNumber) => {
    setFormData((prev) => ({ ...prev, avatar: avatarNumber }));
  };

  const handleEdit = () => {
    setIsEditing(true);
    setFormData({ ...originalData }); 
  };

  const handleCancel = () => {
    setFormData({ ...originalData }); 
    setIsEditing(false);
  };

  // --- HANDLERS PARA EDICIÓN DE AVATAR ---

  const handleAvatarEdit = () => {
    setIsEditingAvatar(true);
  };

  const handleAvatarCancel = () => {
    setFormData((prev) => ({ ...prev, avatar: originalData.avatar }));
    setIsEditingAvatar(false);
  };

  const handleAvatarSave = async () => {
    if (formData.avatar === originalData.avatar) {
      setIsEditingAvatar(false);
      return;
    }

    try {
      setLoading(true);
      
      await api.patch(apiRoutes.profile(), {
        avatar: formData.avatar,
      });

      // Refrescar los datos del usuario desde el servidor
      await fetchUser();

      setOriginalData({ ...originalData, avatar: formData.avatar });
      setIsEditingAvatar(false);
      Swal.fire({ icon: "success", title: "Avatar actualizado", timer: 1500, showConfirmButton: false, position: "top-end", toast: true });
    } catch (error) {
      Swal.fire({ icon: "error", title: "Error", text: error.response?.data?.message || "Error al actualizar avatar" });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (JSON.stringify(formData) === JSON.stringify(originalData)) {
      setIsEditing(false);
      return;
    }

    // Validación simplificada
    const regexUsername = /^[a-zA-Z0-9._-]{4,30}$/;
    if (formData.username && !regexUsername.test(formData.username)) {
      Swal.fire({ icon: "error", title: "Formato inválido", text: "Revisa el nombre de usuario (4-30 caracteres)." });
      return;
    }

    try {
      setLoading(true);
      
      await api.patch(apiRoutes.profile(), {
        username: formData.username,
        email: formData.email?.toLowerCase(),
        phone: formData.phone,
        city: formData.city,
        // No incluir avatar aquí - se edita por separado
      });

      // Refrescar los datos del usuario desde el servidor
      await fetchUser();

      setOriginalData({ ...formData });
      setIsEditing(false);
      Swal.fire({ icon: "success", title: "Perfil actualizado", timer: 1500, showConfirmButton: false, position: "top-end", toast: true });
    } catch (error) {
      Swal.fire({ icon: "error", title: "Error", text: error.response?.data?.message || "Error al actualizar" });
    } finally {
      setLoading(false);
    }
  };
  
  // --- 3. CÁLCULOS DERIVADOS ---

  const totalVehicles = vehicles?.length || 0;
  const releasedParkings = parkingHistory?.filter((p) => p.type === "released").length || 0;
  const occupiedParkings = parkingHistory?.filter((p) => p.type === "occupied").length || 0;
  
  const userInitials = formData.username ? formData.username.substring(0, 1).toUpperCase() : "User";

  return {
    // Estado y Datos
    loading,
    isEditing,
    isEditingAvatar,
    formData,
    originalData,
    userInitials,
    
    // Cálculos para Stats
    totalVehicles,
    releasedParkings,
    occupiedParkings,

    // Handlers
    handleEdit,
    handleSave,
    handleCancel,
    handleChange,
    handleCityChange,
    handleAvatarChange,
    handleAvatarEdit,
    handleAvatarSave,
    handleAvatarCancel,
    setIsEditing,
  };
}