import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X } from "lucide-react";
import brandsModels from "@/utils/brandsModels.json";

export default function VehicleModal({
  showModal,
  editingVehicle,
  vehicleForm,
  setVehicleForm,
  plateConsent,
  setPlateConsent,
  colorOptions,
  onClose,
  onSave,
}) {
  if (!showModal) return null;

  // Obtener los modelos disponibles para la marca seleccionada
  const selectedBrandData = brandsModels.find((b) => b.brand === vehicleForm.brand);
  const availableModels = selectedBrandData?.models || [];

  // Handler para cambio de marca (resetea el modelo)
  const handleBrandChange = (value) => {
    setVehicleForm({ 
      ...vehicleForm, 
      brand: value,
      model: "" // Resetear modelo cuando cambia la marca
    });
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-6 w-full max-w-md relative">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white"
          onClick={onClose}
        >
          <X size={24} />
        </button>

        <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">
          {editingVehicle ? "Editar vehículo" : "Añadir vehículo"}
        </h3>

        <form onSubmit={onSave} className="space-y-4">
          <div>
            <Label htmlFor="plate">Matrícula</Label>
            <Input
              id="plate"
              value={vehicleForm.plate}
              onChange={(e) =>
                setVehicleForm({
                  ...vehicleForm,
                  plate: e.target.value.toUpperCase().replace(/\s|-/g, ""),
                })
              }
              required
              maxLength={7}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="brand">Marca</Label>
            <Select value={vehicleForm.brand} onValueChange={handleBrandChange}>
              <SelectTrigger className="mt-1 bg-white dark:bg-slate-700">
                <SelectValue placeholder="Selecciona una marca" />
              </SelectTrigger>
              <SelectContent>
                {brandsModels.map((brand) => (
                  <SelectItem key={brand.brand} value={brand.brand}>
                    {brand.brand}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="model">Modelo</Label>
            <Select 
              value={vehicleForm.model} 
              onValueChange={(value) => setVehicleForm({ ...vehicleForm, model: value })}
              disabled={!vehicleForm.brand}
            >
              <SelectTrigger className="mt-1 bg-white dark:bg-slate-700">
                <SelectValue placeholder={vehicleForm.brand ? "Selecciona un modelo" : "Primero selecciona una marca"} />
              </SelectTrigger>
              <SelectContent>
                {availableModels.map((model) => (
                  <SelectItem key={model} value={model}>
                    {model}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="color">Color</Label>
            <Select 
              value={vehicleForm.color} 
              onValueChange={(value) => setVehicleForm({ ...vehicleForm, color: value })}
            >
              <SelectTrigger className="mt-1 bg-white dark:bg-slate-700">
                <SelectValue placeholder="Selecciona un color">
                  {vehicleForm.color && (() => {
                    const selectedColor = colorOptions.find(c => c.value === vehicleForm.color);
                    return selectedColor ? (
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-4 h-4 rounded border border-slate-300 dark:border-slate-600"
                          style={{ backgroundColor: selectedColor.color }}
                        />
                        <span>{selectedColor.label}</span>
                      </div>
                    ) : vehicleForm.color;
                  })()}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {colorOptions.map((color) => (
                  <SelectItem key={color.value} value={color.value}>
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-4 h-4 rounded border border-slate-300 dark:border-slate-600"
                        style={{ backgroundColor: color.color }}
                      />
                      <span>{color.label}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="my-4 p-3 bg-blue-50 rounded-xl border border-blue-200 dark:bg-slate-800 dark:border-slate-700 text-sm text-gray-700 dark:text-gray-300">
            <input
              type="checkbox"
              id="plateConsent"
              checked={plateConsent}
              onChange={(e) => setPlateConsent(e.target.checked)}
              className="mr-2"
            />
            <Label htmlFor="plateConsent" className="font-semibold">
              Confirmo que he leído y acepto el aviso sobre la matrícula.
            </Label>
            <p className="mt-2">
              Al registrar su vehículo, consiente que la matrícula pueda ser
              visible para otros usuarios únicamente con la finalidad de
              identificar el coche que deja una plaza de aparcamiento y
              facilitar la elección del vehículo en caso de tener varios
              registrados.
              <br />
              <br />
              La matrícula no se asociará a otros datos personales y no será
              utilizada con fines distintos a los descritos.
            </p>
          </div>

          <div className="pt-4 flex gap-2 justify-end">
            <Button
              type="submit"
              className="bg-blue-600 text-white hover:bg-blue-700"
            >
              {editingVehicle ? "Guardar cambios" : "Añadir vehículo"}
            </Button>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
