import React, { useState, useEffect } from 'react';
import { X, MapPin, Clock, Save, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@components/ui/button';
import { Input } from '@components/ui/input';
import { Label } from '@components/ui/label';
import { Switch } from '@components/ui/switch';
import { useSwal } from '@hooks/useSwal';
import * as adminParkingService from '@services/adminParkingService';
import * as adminUserService from '@services/adminUserService';
import { handleApiError } from '@utils/adminHelpers';
import Select from 'react-select';

// Leaflet imports
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

// Component to handle map clicks
function LocationMarker({ position, setPosition, setFormData }) {
  const map = useMapEvents({
    click(e) {
      const newPos = e.latlng;
      setPosition(newPos);
      setFormData(prev => ({
        ...prev,
        lat: newPos.lat,
        lng: newPos.lng
      }));
      map.flyTo(newPos, map.getZoom());
    },
  });

  return position === null ? null : (
    <Marker position={position}></Marker>
  );
}

export default function ParkingFormModal({ isOpen, onClose, onSuccess }) {
  const swal = useSwal();
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  
  // Map state
  const [mapPosition, setMapPosition] = useState(null);
  const defaultCenter = [40.416775, -3.703790]; // Madrid by default

  const [formData, setFormData] = useState({
    user_id: '',
    lat: '',
    lng: '',
    in_minutes: 0,
    blue_zone: false,
  });

  useEffect(() => {
    if (isOpen) {
      fetchUsers();
      // Reset form
      setFormData({
        user_id: '',
        lat: '',
        lng: '',
        in_minutes: 0,
        blue_zone: false,
      });
      setMapPosition(null);
    }
  }, [isOpen]);

  const fetchUsers = async () => {
    setLoadingUsers(true);
    try {
      const response = await adminUserService.getUsers({ per_page: 1000, account_activated: 1 });
      const formattedUsers = response.data.map(user => ({
        value: user.id,
        label: `${user.username || user.name} (${user.email})`
      }));
      setUsers(formattedUsers);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoadingUsers(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleUserChange = (selectedOption) => {
    setFormData(prev => ({
      ...prev,
      user_id: selectedOption ? selectedOption.value : ''
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.user_id || !formData.lat || !formData.lng || !formData.in_minutes) {
      swal.fire({
        title: 'Campos requeridos',
        text: 'Por favor completa todos los campos obligatorios y selecciona una ubicación en el mapa.',
        icon: 'warning'
      });
      return;
    }

    const payload = {
      user_id: formData.user_id,
      latitude: parseFloat(formData.lat),   
      longitude: parseFloat(formData.lng),    
      in_minutes: parseInt(formData.in_minutes),
      blue_zone: !!formData.blue_zone,         
    };

    setLoading(true);
    try {
      await adminParkingService.createParking(payload);
      
      swal.fire({
        title: 'Plaza creada',
        text: 'La plaza de aparcamiento ha sido generada exitosamente.',
        icon: 'success',
        timer: 2000
      });
      
      onSuccess();
    } catch (error) {
      swal.fire({
        title: 'Error',
        text: handleApiError(error),
        icon: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-linear-to-br from-slate-50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col border border-border"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-bold">Generar Nueva Plaza</h2>
              <button onClick={onClose} className="p-2 hover:bg-muted rounded-full transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* Left Column: Inputs */}
                <div className="space-y-6">
                  {/* User Selection */}
                  <div>
                    <Label htmlFor="user_id" className="mb-2 block">Usuario *</Label>
                    {loadingUsers ? (
                      <div className="text-sm text-muted-foreground">Cargando usuarios...</div>
                    ) : (
                      <Select
                        className="text-sm"
                        options={users}
                        onChange={handleUserChange}
                        placeholder="Buscar usuario..."
                        noOptionsMessage={() => "No se encontraron usuarios"}
                        isClearable
                        styles={{
                          control: (base) => ({
                            ...base,
                            borderColor: "hsl(var(--input))",
                            backgroundColor: "hsl(var(--background))",
                            color: "hsl(var(--foreground))",
                            minHeight: "42px",
                          }),
                          menu: (base) => ({
                            ...base,
                            backgroundColor: "white",
                            zIndex: 99999,
                            boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.3), 0 4px 6px -4px rgb(0 0 0 / 0.2)",
                            border: "2px solid hsl(var(--border))",
                            position: "absolute",
                          }),
                          menuList: (base) => ({
                            ...base,
                            maxHeight: "300px",
                            backgroundColor: "white",
                            padding: "4px",
                          }),
                          option: (base, state) => ({
                            ...base,
                            backgroundColor: state.isFocused 
                              ? "#e0f2fe" 
                              : state.isSelected 
                                ? "#0ea5e9" 
                                : "white",
                            color: state.isSelected 
                              ? "white" 
                              : "#1e293b",
                            cursor: "pointer",
                            padding: "10px 12px",
                            fontWeight: state.isSelected ? "600" : "400",
                          }),
                          singleValue: (base) => ({
                            ...base,
                            color: "hsl(var(--foreground))",
                          }),
                          input: (base) => ({
                            ...base,
                            color: "hsl(var(--foreground))",
                          }),
                          placeholder: (base) => ({
                            ...base,
                            color: "hsl(var(--muted-foreground))",
                          }),
                        }}
                      />
                    )}
                  </div>

                  {/* Time Select */}
                  <div>
                    <Label htmlFor="in_minutes" className="mb-2 block">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        Tiempo disponible *
                      </div>
                    </Label>
                    <select
                      id="in_minutes"
                      name="in_minutes"
                      value={formData.in_minutes}
                      onChange={handleChange}
                      required
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option>...</option>
                      <option value={1}>Ya</option>
                      <option value={2}>2 minutos</option>
                      <option value={5}>5 minutos</option>
                      <option value={10}>10 minutos</option>
                    </select>
                  </div>

                  {/* Blue Zone Switch */}
                  <div className="flex items-center justify-between p-4 border rounded-lg bg-muted/30">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-full ${formData.blue_zone ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}>
                        <Shield className="w-5 h-5" />
                      </div>
                      <div>
                        <Label htmlFor="blue_zone" className="font-medium">Zona Azul</Label>
                        <p className="text-xs text-muted-foreground">
                          Activa si es una zona de estacionamiento regulado
                        </p>
                      </div>
                    </div>
                    <Switch
                      id="blue_zone"
                      checked={formData.blue_zone}
                      onCheckedChange={(checked) => setFormData(prev => ({ ...prev, blue_zone: checked }))}
                    />
                  </div>

                  {/* Coordinates Editable */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-xs text-muted-foreground mb-1 block">Latitud *</Label>
                      <Input 
                        name="lat"
                        type="number"
                        step="any"
                        value={formData.lat} 
                        onChange={(e) => {
                          const newLat = e.target.value;
                          setFormData(prev => ({ ...prev, lat: newLat }));
                          if (newLat && formData.lng) {
                            setMapPosition({ lat: parseFloat(newLat), lng: parseFloat(formData.lng) });
                          }
                        }}
                        placeholder="Ej: 40.416775" 
                      />
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground mb-1 block">Longitud *</Label>
                      <Input 
                        name="lng"
                        type="number"
                        step="any"
                        value={formData.lng} 
                        onChange={(e) => {
                          const newLng = e.target.value;
                          setFormData(prev => ({ ...prev, lng: newLng }));
                          if (formData.lat && newLng) {
                            setMapPosition({ lat: parseFloat(formData.lat), lng: parseFloat(newLng) });
                          }
                        }}
                        placeholder="Ej: -3.703790" 
                      />
                    </div>
                  </div>
                </div>

                {/* Right Column: Map */}
                <div className="h-[400px] rounded-xl overflow-hidden border border-border relative z-0">
                  <MapContainer 
                    center={defaultCenter} 
                    zoom={13} 
                    style={{ height: '100%', width: '100%' }}
                  >
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <LocationMarker 
                      position={mapPosition} 
                      setPosition={setMapPosition} 
                      setFormData={setFormData} 
                    />
                  </MapContainer>
                  
                  {!mapPosition && (
                    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-background/90 backdrop-blur px-4 py-2 rounded-full shadow-lg text-sm font-medium z-1000 pointer-events-none">
                      Haz clic en el mapa para situar la plaza
                    </div>
                  )}
                </div>

              </form>
            </div>

            {/* Footer */}
            <div className="p-6 border-t bg-muted/10 flex justify-end gap-3">
              <Button variant="outline" onClick={onClose} disabled={loading}>
                Cancelar
              </Button>
              <Button onClick={handleSubmit} disabled={loading} className="gap-2">
                {loading ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                ) : (
                  <Save className="w-4 h-4" />
                )}
                Generar Plaza
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
