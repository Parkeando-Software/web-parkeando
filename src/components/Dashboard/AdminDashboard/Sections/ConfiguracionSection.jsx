import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, Bell, Mail, Shield, Database, Palette } from 'lucide-react';
import { Button } from '@components/ui/button';
import { Input } from '@components/ui/input';

export default function ConfiguracionSection() {
  const [settings, setSettings] = useState({
    appName: 'Parkeando',
    supportEmail: 'soporte@parkeando.com',
    notificationsEnabled: true,
    maintenanceMode: false,
  });

  const settingsSections = [
    {
      title: 'Configuración General',
      icon: Settings,
      color: 'blue',
      fields: [
        { label: 'Nombre de la Aplicación', key: 'appName', type: 'text' },
        { label: 'Email de Soporte', key: 'supportEmail', type: 'email' },
      ],
    },
    {
      title: 'Notificaciones',
      icon: Bell,
      color: 'purple',
      fields: [
        { label: 'Notificaciones Habilitadas', key: 'notificationsEnabled', type: 'checkbox' },
      ],
    },
    {
      title: 'Seguridad',
      icon: Shield,
      color: 'green',
      fields: [
        { label: 'Modo Mantenimiento', key: 'maintenanceMode', type: 'checkbox' },
      ],
    },
  ];

  const handleChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-foreground">Configuración</h2>
        <p className="text-muted-foreground">Administra la configuración de la aplicación</p>
      </div>

      {/* Settings Sections */}
      <div className="space-y-6">
        {settingsSections.map((section, sectionIndex) => {
          const Icon = section.icon;
          const colorClasses = {
            blue: 'from-blue-500/10 to-blue-600/10 border-blue-500/20 text-blue-500',
            purple: 'from-purple-500/10 to-purple-600/10 border-purple-500/20 text-purple-500',
            green: 'from-green-500/10 to-green-600/10 border-green-500/20 text-green-500',
          };

          return (
            <motion.div
              key={sectionIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: sectionIndex * 0.1 }}
              className="bg-card rounded-xl p-6 border border-border"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className={`p-3 rounded-lg bg-gradient-to-br ${colorClasses[section.color]} border`}>
                  <Icon className={`w-5 h-5 ${colorClasses[section.color].split(' ')[2]}`} />
                </div>
                <h3 className="text-lg font-semibold text-foreground">{section.title}</h3>
              </div>

              <div className="space-y-4">
                {section.fields.map((field, fieldIndex) => (
                  <div key={fieldIndex}>
                    {field.type === 'checkbox' ? (
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings[field.key]}
                          onChange={(e) => handleChange(field.key, e.target.checked)}
                          className="w-4 h-4 text-blue-500 rounded focus:ring-2 focus:ring-blue-500"
                        />
                        <span className="text-sm font-medium text-foreground">{field.label}</span>
                      </label>
                    ) : (
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          {field.label}
                        </label>
                        <Input
                          type={field.type}
                          value={settings[field.key]}
                          onChange={(e) => handleChange(field.key, e.target.value)}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Additional Settings Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-xl p-6 border border-orange-500/20"
        >
          <div className="flex items-center gap-3 mb-4">
            <Database className="w-6 h-6 text-orange-500" />
            <h3 className="text-lg font-semibold text-foreground">Base de Datos</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Gestiona las copias de seguridad y la optimización de la base de datos
          </p>
          <Button variant="outline" className="w-full">
            Gestionar Base de Datos
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-br from-pink-500/10 to-purple-500/10 rounded-xl p-6 border border-pink-500/20"
        >
          <div className="flex items-center gap-3 mb-4">
            <Palette className="w-6 h-6 text-pink-500" />
            <h3 className="text-lg font-semibold text-foreground">Personalización</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Personaliza los colores y el diseño de la aplicación
          </p>
          <Button variant="outline" className="w-full">
            Personalizar Tema
          </Button>
        </motion.div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button className="px-8">
          Guardar Cambios
        </Button>
      </div>

      {/* Placeholder Message */}
      <div className="bg-green-50 dark:bg-green-950/20 rounded-xl p-6 border border-green-200 dark:border-green-800">
        <p className="text-sm text-green-800 dark:text-green-200">
          <strong>Nota:</strong> Esta sección está en desarrollo. Próximamente se integrarán más opciones de configuración con persistencia en la base de datos.
        </p>
      </div>
    </div>
  );
}
