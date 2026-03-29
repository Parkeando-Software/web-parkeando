import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2, Car, Edit2, Save } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@components/ui/dialog';
import { Button } from '@components/ui/button';
import { Input } from '@components/ui/input';
import { Label } from '@components/ui/label';
import { Badge } from '@components/ui/badge';
import { useSwal } from '@hooks/useSwal';
import * as adminUserService from '@services/adminUserService';
import { handleApiError } from '@utils/adminHelpers';
import brandsModels from '@utils/brandsModels.json';
import { colorOptions } from '@utils/vehicles-colors';

export default function UserVehiclesModal({ isOpen, onClose, user }) {
  const swal = useSwal();
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [editingVehicleId, setEditingVehicleId] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    plate: '',
    brand: '',
    model: '',
    color: '',
    is_default: false
  });

  // Derived state for models based on selected brand
  const [availableModels, setAvailableModels] = useState([]);

  useEffect(() => {
    if (isOpen && user) {
      fetchVehicles();
      resetForm();
    }
  }, [isOpen, user]);

  // Update available models when brand changes
  useEffect(() => {
    if (formData.brand) {
      const brandData = brandsModels.find(b => b.brand === formData.brand);
      setAvailableModels(brandData ? brandData.models : []);
      
      // Clear model if it's not in the new list (unless we are just loading the form for editing)
      if (brandData && !brandData.models.includes(formData.model) && formData.model !== '') {
         // Optional: logic to clear model if needed, but for editing we want to keep it if valid
      }
    } else {
      setAvailableModels([]);
    }
  }, [formData.brand]);

  const fetchVehicles = async () => {
    setLoading(true);
    try {
      const response = await adminUserService.getUserVehicles(user.id);
      setVehicles(response.vehicles || []);
    } catch (error) {
      swal.fire({
        title: 'Error',
        text: handleApiError(error),
        icon: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      plate: '',
      brand: '',
      model: '',
      color: '',
      is_default: false
    });
    setEditingVehicleId(null);
    setShowForm(false);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleEditClick = (vehicle) => {
    setFormData({
      plate: vehicle.plate,
      brand: vehicle.brand,
      model: vehicle.model,
      color: vehicle.color,
      is_default: vehicle.is_default
    });
    setEditingVehicleId(vehicle.id);
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      if (editingVehicleId) {
        await adminUserService.updateUserVehicle(user.id, editingVehicleId, formData);
        swal.fire({
          title: 'Actualizado',
          text: 'El vehículo ha sido actualizado correctamente.',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false
        });
      } else {
        await adminUserService.addUserVehicle(user.id, formData);
        swal.fire({
          title: 'Agregado',
          text: 'El vehículo ha sido agregado correctamente.',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false
        });
      }

      resetForm();
      fetchVehicles();
    } catch (error) {
      swal.fire({
        title: 'Error',
        text: handleApiError(error),
        icon: 'error',
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (vehicleId) => {
    const result = await swal.fire({
      title: '¿Eliminar vehículo?',
      text: '¿Estás seguro de que deseas eliminar este vehículo? Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#ef4444',
    });

    if (result.isConfirmed) {
      try {
        await adminUserService.deleteUserVehicle(user.id, vehicleId);
        
        swal.fire({
          title: 'Eliminado',
          text: 'El vehículo ha sido eliminado correctamente.',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false
        });

        fetchVehicles();
      } catch (error) {
        swal.fire({
          title: 'Error',
          text: handleApiError(error),
          icon: 'error',
        });
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Car className="w-5 h-5 text-blue-500" />
            Vehículos de {user?.name || user?.username}
          </DialogTitle>
          <DialogDescription>
            Gestiona los vehículos asociados a este usuario.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 space-y-6">
          {/* Add/Edit Vehicle Form */}
          {!showForm ? (
            <Button 
              onClick={() => {
                resetForm();
                setShowForm(true);
              }}
              className="w-full border-dashed border-2 bg-transparent hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400"
              variant="outline"
            >
              <Plus className="w-4 h-4 mr-2" />
              Agregar Nuevo Vehículo
            </Button>
          ) : (
            <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-medium text-sm">
                  {editingVehicleId ? 'Editar Vehículo' : 'Nuevo Vehículo'}
                </h4>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={resetForm}
                  className="h-8 w-8 p-0"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="plate">Matrícula</Label>
                    <Input
                      id="plate"
                      name="plate"
                      value={formData.plate}
                      onChange={handleInputChange}
                      placeholder="Ej: 1234ABC"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="brand">Marca</Label>
                    <select
                      id="brand"
                      name="brand"
                      value={formData.brand}
                      onChange={handleInputChange}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      required
                    >
                      <option value="">Seleccionar marca</option>
                      {brandsModels.map((item, index) => (
                        <option key={index} value={item.brand}>
                          {item.brand}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="model">Modelo</Label>
                    <select
                      id="model"
                      name="model"
                      value={formData.model}
                      onChange={handleInputChange}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      required
                      disabled={!formData.brand}
                    >
                      <option value="">Seleccionar modelo</option>
                      {availableModels.map((model, index) => (
                        <option key={index} value={model}>
                          {model}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="color">Color</Label>
                    <select
                      id="color"
                      name="color"
                      value={formData.color}
                      onChange={handleInputChange}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      required
                    >
                      <option value="">Seleccionar color</option>
                      {colorOptions.map((color, index) => (
                        <option key={index} value={color.value}>
                          {color.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="is_default"
                    name="is_default"
                    checked={formData.is_default}
                    onChange={handleInputChange}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <Label htmlFor="is_default" className="cursor-pointer">
                    Establecer como vehículo principal
                  </Label>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={resetForm}
                    disabled={submitting}
                  >
                    Cancelar
                  </Button>
                  <Button type="submit" disabled={submitting}>
                    {submitting ? 'Guardando...' : (editingVehicleId ? 'Actualizar Vehículo' : 'Guardar Vehículo')}
                  </Button>
                </div>
              </form>
            </div>
          )}

          {/* Vehicles List */}
          <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
            {loading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              </div>
            ) : vehicles.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground flex flex-col items-center gap-2">
                <Car className="w-8 h-8 opacity-20" />
                <p>No hay vehículos registrados para este usuario.</p>
              </div>
            ) : (
              vehicles.map((vehicle) => (
                <div 
                  key={vehicle.id}
                  className="flex items-center justify-between p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                      <Car className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{vehicle.brand} {vehicle.model}</span>
                        {vehicle.is_default && (
                          <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 hover:bg-blue-100">
                            Principal
                          </Badge>
                        )}
                      </div>
                      <div className="text-sm text-muted-foreground flex gap-3">
                        <span className="font-mono bg-slate-100 dark:bg-slate-800 px-1.5 rounded text-xs py-0.5">
                          {vehicle.plate}
                        </span>
                        <span>{vehicle.color}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEditClick(vehicle)}
                      className="text-slate-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                    >
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(vehicle.id)}
                      className="text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
