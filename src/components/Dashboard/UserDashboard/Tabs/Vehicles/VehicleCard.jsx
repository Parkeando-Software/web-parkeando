import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Car, Edit3, Trash2 } from "lucide-react";

export default function VehicleCard({
  vehicle,
  onEdit,
  onDelete,
  onSetDefault,
  colorOptions,
}) {
  const colorObj = colorOptions.find((c) => c.value === vehicle.color);

  return (
    <Card
      className={`shadow-lg bg-white dark:bg-slate-900 hover:bg-gray-50 transition-all ${
        vehicle.is_default
          ? "border-4 border-green-500 ring-2 ring-green-300"
          : "border border-gray-200"
      }`}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <Car className="w-5 h-5 text-blue-600" />
            <CardTitle className="text-lg font-bold text-gray-900 dark:text-white">
              {vehicle.plate}
            </CardTitle>
          </div>
          {vehicle.is_default && (
            <Badge className="bg-green-100 text-green-800 border-green-200">
              Predeterminado
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wide">Marca</p>
          <p className="text-sm font-semibold text-gray-900 dark:text-white">
            {vehicle.brand}
          </p>
        </div>

        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wide">
            Modelo
          </p>
          <p className="text-sm font-semibold text-gray-900 dark:text-white">
            {vehicle.model || <span className="text-gray-400">Sin modelo</span>}
          </p>
        </div>

        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wide">Color</p>
          {colorObj ? (
            <div className="flex items-center gap-2 mt-1">
              <span
                style={{
                  backgroundColor: colorObj.color,
                  width: 20,
                  height: 20,
                  borderRadius: 4,
                  border: "1px solid #ccc",
                }}
              />
              <span className="text-sm font-semibold text-gray-900 dark:text-white">
                {colorObj.label}
              </span>
            </div>
          ) : (
            <p className="text-sm font-semibold text-gray-900 dark:text-white">
              {vehicle.color}
            </p>
          )}
        </div>

        <div className="flex gap-2 pt-3 border-t">
          {!vehicle.is_default && (
            <Button
              size="sm"
              variant="outline"
              className="flex-1 border-green-400 text-green-700 hover:bg-green-50 bg-transparent"
              onClick={() => onSetDefault(vehicle)}
            >
              Predeterminar
            </Button>
          )}
          <Button
            size="sm"
            variant="outline"
            className="border-blue-400 text-blue-700 hover:bg-blue-50 bg-transparent"
            onClick={() => onEdit(vehicle)}
          >
            <Edit3 className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="border-red-400 text-red-700 hover:bg-red-50 bg-transparent"
            onClick={() => onDelete(vehicle.id)}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
