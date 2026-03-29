import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User, Mail, Phone, Edit2, Save, X, Building2 } from "lucide-react";
import municipios from "@/utils/municipios_mas_50k.json";

export default function ProfileDetails({
  isEditing,
  loading,
  formData,
  handleEdit,
  handleSave,
  handleCancel,
  handleChange,
  handleCityChange,
}) {
  const FieldDisplay = ({ value, placeholder }) => (
    <div className="p-2 bg-slate-50 dark:bg-slate-900/50 rounded-md text-slate-800 dark:text-slate-200 border border-transparent truncate">
      {value || <span className="text-slate-400 text-sm italic">{placeholder}</span>}
    </div>
  );

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
      {/* Header y Botones de Acción */}
      <div className="flex justify-between items-center px-6 py-4 border-b border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50">
        <div>
          <h3 className="font-semibold text-lg text-slate-900 dark:text-white">Información Personal</h3>
          <p className="text-xs text-slate-500">Gestiona tus datos de contacto</p>
        </div>
        {!isEditing ? (
          <Button variant="outline" size="sm" onClick={handleEdit} className="gap-2 hover:text-[#0083E6] hover:border-[#0083E6]">
            <Edit2 size={14} /><span className="hidden sm:inline">Editar</span>
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" onClick={handleCancel} disabled={loading}><X size={16} /></Button>
            <Button size="sm" onClick={handleSave} disabled={loading} className="bg-[#0083E6] hover:bg-[#006bb3] gap-2 text-white">
              <Save size={16} /> Guardar
            </Button>
          </div>
        )}
      </div>

      {/* Formulario */}
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Username */}
        <div className="space-y-2">
          <Label className="flex items-center gap-2 text-slate-600 dark:text-slate-300"><User size={14} /> Usuario</Label>
          {isEditing ? (
            <Input name="username" value={formData.username} onChange={handleChange} className="bg-slate-50 dark:bg-slate-900" />
          ) : (
            <FieldDisplay value={formData.username} placeholder="No especificado" />
          )}
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label className="flex items-center gap-2 text-slate-600 dark:text-slate-300"><Mail size={14} /> Email</Label>
          {isEditing ? (
            <Input name="email" type="email" value={formData.email} onChange={handleChange} className="bg-slate-50 dark:bg-slate-900" />
          ) : (
            <FieldDisplay value={formData.email} placeholder="No especificado" />
          )}
        </div>

        {/* Phone */}
        <div className="space-y-2">
          <Label className="flex items-center gap-2 text-slate-600 dark:text-slate-300"><Phone size={14} /> Teléfono</Label>
          {isEditing ? (
            <Input name="phone" value={formData.phone} onChange={handleChange} className="bg-slate-50 dark:bg-slate-900" />
          ) : (
            <FieldDisplay value={formData.phone} placeholder="No especificado" />
          )}
        </div>

        {/* City */}
        <div className="space-y-2">
          <Label className="flex items-center gap-2 text-slate-600 dark:text-slate-300"><Building2 size={14} /> Ciudad</Label>
          {isEditing ? (
            <Select value={formData.city} onValueChange={handleCityChange}>
              <SelectTrigger className="bg-slate-50 dark:bg-slate-900"><SelectValue placeholder="Selecciona ciudad" /></SelectTrigger>
              <SelectContent>
                {municipios.map((m) => (<SelectItem key={m.value} value={m.value}>{m.label}</SelectItem>))}
              </SelectContent>
            </Select>
          ) : (
            <FieldDisplay 
              value={municipios.find((m) => m.value === formData.city)?.label || formData.city} 
              placeholder="No especificada" 
            />
          )}
        </div>
      </div>
    </div>
  );
}