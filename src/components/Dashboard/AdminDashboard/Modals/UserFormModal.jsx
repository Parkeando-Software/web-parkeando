import React, { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { Label } from "@components/ui/label";
import { useSwal } from "@hooks/useSwal";
import * as adminUserService from "@services/adminUserService";
import { handleApiError } from "@utils/adminHelpers";
import AvatarSelector from "@components/Dashboard/UserDashboard/Tabs/Profile/AvatarSelector";

export default function UserFormModal({ isOpen, onClose, user, isEditing, onSuccess }) {
  const swal = useSwal();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: user?.username || "",
    name: user?.name || "",
    email: user?.email || "",
    password: "",
    password_confirmation: "",
    role_id: user?.role_id || 1,
    phone: user?.phone || "",
    avatar: user?.avatar || 0,
    account_activated: user?.account_activated !== undefined ? user.account_activated : true,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
    // Clear error for this field
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = "El nombre de usuario es requerido";
    }

    if (!formData.name.trim()) {
      newErrors.name = "El nombre es requerido";
    }

    if (!formData.email.trim()) {
      newErrors.email = "El email es requerido";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "El email no es válido";
    }

    if (!isEditing) {
      if (!formData.password) {
        newErrors.password = "La contraseña es requerida";
      } else if (formData.password.length < 8) {
        newErrors.password = "La contraseña debe tener al menos 8 caracteres";
      }

      if (formData.password !== formData.password_confirmation) {
        newErrors.password_confirmation = "Las contraseñas no coinciden";
      }
    } else if (formData.password) {
      // If editing and password is provided
      if (formData.password.length < 8) {
        newErrors.password = "La contraseña debe tener al menos 8 caracteres";
      }

      if (formData.password !== formData.password_confirmation) {
        newErrors.password_confirmation = "Las contraseñas no coinciden";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setLoading(true);

    try {
      const submitData = { ...formData };
      
      // Remove password fields if empty (for editing)
      if (isEditing && !submitData.password) {
        delete submitData.password;
        delete submitData.password_confirmation;
      }

      if (isEditing) {
        await adminUserService.updateUser(user.id, submitData);
        swal.fire({
          title: "Usuario actualizado",
          text: "El usuario ha sido actualizado exitosamente.",
          icon: "success",
          timer: 2000,
        });
      } else {
        await adminUserService.createUser(submitData);
        swal.fire({
          title: "Usuario creado",
          text: "El usuario ha sido creado exitosamente.",
          icon: "success",
          timer: 2000,
        });
      }

      onSuccess();
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-linear-to-br from-slate-50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-border">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-2xl font-bold">
            {isEditing ? "Editar Usuario" : "Crear Usuario"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-accent rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Username */}
            <div>
              <Label htmlFor="username" className="mb-2">Nombre de usuario *</Label>
              <Input
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className={errors.username ? "border-red-500" : ""}
              />
              {errors.username && (
                <p className="text-sm text-red-500 mt-1">{errors.username}</p>
              )}
            </div>

            {/* Name */}
            <div>
              <Label htmlFor="name" className="mb-2">Nombre completo *</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={errors.name ? "border-red-500" : ""}
              />
              {errors.name && (
                <p className="text-sm text-red-500 mt-1">{errors.name}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <Label htmlFor="email" className="mb-2">Email *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && (
                <p className="text-sm text-red-500 mt-1">{errors.email}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <Label htmlFor="phone" className="mb-2">Teléfono</Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            {/* Password */}
            <div>
              <Label htmlFor="password" className="mb-2">
                Contraseña {!isEditing && "*"}
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className={errors.password ? "border-red-500" : ""}
                placeholder={isEditing ? "Dejar vacío para no cambiar" : ""}
              />
              {errors.password && (
                <p className="text-sm text-red-500 mt-1">{errors.password}</p>
              )}
            </div>

            {/* Password Confirmation */}
            <div>
              <Label htmlFor="password_confirmation" className="mb-2">
                Confirmar contraseña {!isEditing && "*"}
              </Label>
              <Input
                id="password_confirmation"
                name="password_confirmation"
                type="password"
                value={formData.password_confirmation}
                onChange={handleChange}
                className={errors.password_confirmation ? "border-red-500" : ""}
              />
              {errors.password_confirmation && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.password_confirmation}
                </p>
              )}
            </div>

            {/* Role */}
            <div>
              <Label htmlFor="role_id" className="mb-2">Rol *</Label>
              <select
                id="role_id"
                name="role_id"
                value={formData.role_id}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-lg border border-input bg-background"
              >
                <option value={1}>Usuario</option>
                <option value={3}>Administrador</option>
              </select>
            </div>

            {/* Avatar Selector */}
            <div className="md:col-span-2">
              <AvatarSelector
                selectedAvatar={formData.avatar}
                onAvatarChange={(avatar) => setFormData({ ...formData, avatar })}
                reputation={10}
              />
            </div>
          </div>

          {/* Account Activated */}
          <div className="flex items-center gap-2">
            <input
              id="account_activated"
              name="account_activated"
              type="checkbox"
              checked={formData.account_activated}
              onChange={handleChange}
              className="w-4 h-4 rounded border-gray-300"
            />
            <Label htmlFor="account_activated" className="cursor-pointer">
              Cuenta activada
            </Label>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t border-border">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Guardando..." : isEditing ? "Actualizar" : "Crear"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
