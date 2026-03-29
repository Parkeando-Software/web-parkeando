import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Video, HelpCircle, Mail, FileText, Download } from 'lucide-react';
import { Button } from '@components/ui/button';

export default function GuiaSection() {
  const sections = [
    {
      title: 'Primeros Pasos',
      icon: BookOpen,
      color: 'blue',
      items: [
        'Configuración inicial del panel',
        'Creación de usuarios administradores',
        'Configuración de parkings',
        'Gestión de permisos',
      ],
    },
    {
      title: 'Gestión de Usuarios',
      icon: FileText,
      color: 'purple',
      items: [
        'Crear y editar usuarios',
        'Asignar roles y permisos',
        'Gestionar suscripciones',
        'Revisar actividad de usuarios',
      ],
    },
    {
      title: 'Gestión de Parkings',
      icon: FileText,
      color: 'green',
      items: [
        'Añadir nuevos parkings',
        'Editar información de parkings',
        'Gestionar disponibilidad',
        'Configurar precios y tarifas',
      ],
    },
    {
      title: 'Sorteos y Promociones',
      icon: FileText,
      color: 'yellow',
      items: [
        'Crear nuevos sorteos',
        'Gestionar participantes',
        'Seleccionar ganadores',
        'Configurar premios',
      ],
    },
  ];

  const faqs = [
    {
      question: '¿Cómo puedo crear un nuevo usuario?',
      answer: 'Ve a la sección de Usuarios y haz clic en "Nuevo Usuario". Completa el formulario con la información requerida.',
    },
    {
      question: '¿Cómo gestiono los parkings?',
      answer: 'En la sección de Parkings puedes ver, crear, editar y eliminar plazas de aparcamiento.',
    },
    {
      question: '¿Cómo funciona el sistema de sorteos?',
      answer: 'Los sorteos se crean desde la sección de Sorteos. Puedes definir premios, fechas y gestionar participantes.',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-foreground">Guía de Administración</h2>
        <p className="text-muted-foreground">Aprende a usar todas las funcionalidades del panel</p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 rounded-xl p-6 border border-blue-500/20"
        >
          <Video className="w-8 h-8 text-blue-500 mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">Video Tutoriales</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Aprende con videos paso a paso
          </p>
          <Button variant="outline" className="w-full">
            Ver Videos
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 rounded-xl p-6 border border-purple-500/20"
        >
          <Download className="w-8 h-8 text-purple-500 mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">Manual PDF</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Descarga la guía completa
          </p>
          <Button variant="outline" className="w-full">
            Descargar PDF
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-green-500/10 to-green-600/10 rounded-xl p-6 border border-green-500/20"
        >
          <Mail className="w-8 h-8 text-green-500 mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">Soporte</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Contacta con el equipo de soporte
          </p>
          <Button variant="outline" className="w-full">
            Contactar
          </Button>
        </motion.div>
      </div>

      {/* Guide Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sections.map((section, index) => {
          const Icon = section.icon;
          const colorClasses = {
            blue: 'text-blue-500',
            purple: 'text-purple-500',
            green: 'text-green-500',
            yellow: 'text-yellow-500',
          };

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="bg-card rounded-xl p-6 border border-border"
            >
              <div className="flex items-center gap-3 mb-4">
                <Icon className={`w-6 h-6 ${colorClasses[section.color]}`} />
                <h3 className="text-lg font-semibold text-foreground">{section.title}</h3>
              </div>
              <ul className="space-y-2">
                {section.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          );
        })}
      </div>

      {/* FAQ Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="bg-card rounded-xl p-6 border border-border"
      >
        <div className="flex items-center gap-3 mb-6">
          <HelpCircle className="w-6 h-6 text-orange-500" />
          <h3 className="text-lg font-semibold text-foreground">Preguntas Frecuentes</h3>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-border last:border-b-0 pb-4 last:pb-0">
              <h4 className="font-semibold text-foreground mb-2">{faq.question}</h4>
              <p className="text-sm text-muted-foreground">{faq.answer}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Contact Support */}
      <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl p-6 border border-blue-500/20">
        <h3 className="text-lg font-semibold text-foreground mb-2">¿No encuentras lo que buscas?</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Nuestro equipo de soporte está disponible para ayudarte con cualquier duda o problema.
        </p>
        <Button className="flex items-center gap-2">
          <Mail className="w-4 h-4" />
          Contactar Soporte
        </Button>
      </div>
    </div>
  );
}
