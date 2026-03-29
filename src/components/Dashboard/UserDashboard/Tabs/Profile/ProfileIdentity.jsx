// ProfileIdentity.jsx
import React from 'react';
import municipios from "@/utils/municipios_mas_50k.json";
import Avatar from "./Avatar";
import AvatarSelector from "./AvatarSelector";
import { Edit2, Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ProfileIdentity({ 
  formData, 
  isEditing, 
  isEditingAvatar,
  handleAvatarChange,
  handleAvatarEdit,
  handleAvatarSave,
  handleAvatarCancel,
}) {
  const currentCityLabel = 
    municipios.find((m) => m.value === formData.city)?.label ||
    formData.city || 
    "-";

  return (
    <div className="lg:col-span-1">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg overflow-hidden border border-slate-100 dark:border-slate-700 sticky top-6">
        {/* Header Background */}
        <div className="h-32 bg-linear-to-r from-[#0083E6] to-[#005ba1] relative">
          <div className="absolute -bottom-12 left-1/2 -translate-x-1/2">
            <div className="relative group">
              {/* Avatar seleccionable por el usuario */}
              <div className="border-4 border-white dark:border-slate-800 bg-white dark:bg-slate-800 shadow-lg rounded-full">
                <Avatar avatar={formData.avatar ?? 0} size="lg" />
              </div>
              
              {/* Botón de editar avatar - Solo visible cuando NO está editando */}
              {!isEditingAvatar && (
                <button
                  onClick={handleAvatarEdit}
                  className="absolute -bottom-2 -right-2 p-2 bg-[#0083E6] hover:bg-[#006bb3] text-white rounded-full shadow-lg transition-all duration-200 hover:scale-110"
                  aria-label="Editar avatar"
                >
                  <Edit2 size={16} />
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="pt-16 pb-8 px-6 text-center">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            {formData.username || "Usuario"}
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">
            {formData.email}
          </p>

          <div className="flex justify-center gap-2 mb-6">
            <div className="px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-medium border border-blue-100 dark:border-blue-800">
              Cliente Verificado
            </div>
          </div>

          <div className="border-t border-slate-100 dark:border-slate-700 pt-6 text-left space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Miembro desde</span>
              <span className="font-medium text-slate-700 dark:text-slate-300">2024</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Ubicación</span>
              <span className="font-medium text-slate-700 dark:text-slate-300 truncate max-w-[150px] text-right">
                {currentCityLabel}
              </span>
            </div>
          </div>

          {/* Avatar Selector - Solo en modo edición de avatar */}
          {isEditingAvatar && (
            <div className="border-t border-slate-100 dark:border-slate-700 pt-6 mt-6">
              <div className="mb-4">
                <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Selecciona tu avatar
                </h3>
                <AvatarSelector 
                  selectedAvatar={formData.avatar ?? 0}
                  reputation={formData.reputation ?? 0}
                  onAvatarChange={handleAvatarChange}
                />
              </div>
              
              {/* Botones de guardar/cancelar */}
              <div className="flex gap-2 justify-end mt-4">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleAvatarCancel}
                  className="gap-2"
                >
                  <X size={16} /> Cancelar
                </Button>
                <Button 
                  size="sm" 
                  onClick={handleAvatarSave}
                  className="bg-[#0083E6] hover:bg-[#006bb3] gap-2 text-white"
                >
                  <Save size={16} /> Guardar
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}