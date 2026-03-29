// src/utils/privacyContent.jsx

import React from "react";

export const BRAND_PRIMARY = "#0083E6";

// Secciones del scroll spy
export const SECTIONS = [
  { id: "responsable", title: "1. Responsable" },
  { id: "datos", title: "2. Datos que recabamos" },
  { id: "finalidad", title: "3. Finalidad" },
  { id: "base-legal", title: "4. Base legal" },
  { id: "conservacion", title: "5. Conservación" },
  { id: "destinatarios", title: "6. Destinatarios" },
  { id: "derechos", title: "7. Derechos" },
  { id: "eliminacion", title: "8. Eliminación de datos" },
  { id: "seguridad", title: "9. Seguridad" },
  { id: "modificaciones", title: "10. Modificaciones" },
];

// Contenido de cada sección
export const CONTENT = {
  responsable: (
    <ul className="space-y-2">
      <li>
        <strong>Responsable:</strong> Parkeando Software
      </li>
      <li>
        <strong>Domicilio social:</strong> C/ Juan Carlos I nº 11, Navas de la
        Concepción (Sevilla)
      </li>
      <li>
        <strong>Correo electrónico de contacto:</strong>{" "}
        <a
          href="mailto:info@parkeando.es"
          className="text-blue-700 hover:underline"
        >
          info@parkeando.es
        </a>
      </li>
    </ul>
  ),

  datos: (
    <ul className="list-disc pl-5 space-y-2">
      <li>
        <strong>Datos de identificación:</strong> nombre, apellidos, correo
        electrónico, DNI/NIE.
      </li>
      <li>
        <strong>Datos de acceso y uso:</strong> credenciales, historial de
        plazas notificadas o liberadas.
      </li>
      <li>
        <strong>Datos de vehículos:</strong> matrículas registradas por el
        usuario.
      </li>
      <li>
        <strong>Datos técnicos:</strong> IP, identificadores de dispositivo,
        sistema operativo, versión de la app y geolocalización (si se activa).
      </li>
    </ul>
  ),

  finalidad: (
    <ul className="list-disc pl-5 space-y-1">
      <li>Gestión de la cuenta de usuario en ParKeando.</li>
      <li>
        Prestación de los servicios de la app (registro, notificación de
        abandono, búsqueda de plazas).
      </li>
      <li>
        Gestión de matrículas visibles en la app:
        <ul className="list-disc pl-5 mt-1 text-slate-600">
          <li>
            Identificar el vehículo que deja una plaza (sin vinculación con
            datos personales del titular).
          </li>
          <li>Permitir seleccionar entre vehículos del usuario.</li>
        </ul>
      </li>
      <li>Comunicaciones de servicio (avisos técnicos, mejoras, actualizaciones).</li>
      <li>Prevención del fraude, seguridad y mejora del servicio.</li>
      <li>Cumplimiento de obligaciones legales aplicables.</li>
    </ul>
  ),

  baseLegal: (
    <ul className="list-disc pl-5 space-y-2">
      <li>
        <strong>Ejecución de un contrato:</strong> prestación de los servicios solicitados.
      </li>
      <li>
        <strong>Consentimiento expreso:</strong> matrículas, geolocalización y comunicaciones comerciales (si se habilitan).
      </li>
      <li>
        <strong>Interés legítimo:</strong> seguridad, prevención de usos indebidos y mejora del servicio.
      </li>
    </ul>
  ),

  conservacion: (
    <p>
      Los datos se conservarán mientras la cuenta esté activa. Tras su
      eliminación, se bloquearán y se mantendrán solo por los plazos legales
      para atender posibles responsabilidades.
    </p>
  ),

  destinatarios: (
    <ul className="list-disc pl-5 space-y-2">
      <li>
        <strong>Otros usuarios:</strong> acceso a matrículas en el contexto de
        liberación de plazas.
      </li>
      <li>
        <strong>Proveedores tecnológicos:</strong> hosting, mantenimiento,
        notificaciones push, etc., bajo contrato de encargo de tratamiento.
      </li>
      <li>
        <strong>Autoridades competentes:</strong> cuando exista obligación
        legal.
      </li>
      <li>
        No se realizarán transferencias internacionales salvo indicación expresa
        con garantías adecuadas.
      </li>
    </ul>
  ),

  derechos: (
    <>
      <p>
        Podrás ejercer en cualquier momento tus derechos de: acceso,
        rectificación, supresión, oposición, limitación del tratamiento y
        portabilidad.
      </p>
      <p>
        Para ejercerlos, escribe a:{" "}
        <a
          href="mailto:info@parkeando.es"
          className="text-blue-700 hover:underline font-medium"
        >
          info@parkeando.es
        </a>
        . También puedes reclamar ante la{" "}
        <a
          href="https://www.aepd.es/"
          target="_blank"
          rel="noreferrer"
          className="text-blue-700 hover:underline font-medium"
        >
          AEPD
        </a>
        .
      </p>
    </>
  ),

  eliminacion: (
    <>
      <p>
        <strong>Derecho a la eliminación:</strong> Tienes derecho a solicitar la
        eliminación completa de tus datos personales en ciertas circunstancias.
      </p>
      <div className="rounded-xl border border-blue-200 bg-blue-50/80 p-5 mt-4">
        <p className="font-semibold text-blue-900">Proceso de eliminación:</p>
        <ul className="text-sm text-blue-700 space-y-1.5 ml-1">
          <li>Se eliminarán todos tus datos personales de nuestros sistemas</li>
          <li>Se borrará tu historial de uso y ParkiPoints</li>
          <li>Se eliminarán las matrículas asociadas a tu cuenta</li>
          <li>El proceso se completará en un plazo máximo de 30 días</li>
          <li>Te contactaremos para confirmar la eliminación</li>
        </ul>
      </div>
      <p className="pt-2">
        Puedes solicitar la eliminación de tu cuenta a través del{" "}
        <a
          href="/delete-account"
          className="text-blue-700 hover:underline font-medium"
        >
          formulario de eliminación
        </a>{" "}
        o escribiendo a{" "}
        <a
          href="mailto:info@parkeando.es"
          className="text-blue-700 hover:underline font-medium"
        >
          info@parkeando.es
        </a>
        .
      </p>
    </>
  ),

  seguridad: (
    <p>
      Aplicamos medidas técnicas y organizativas para garantizar
      confidencialidad, integridad y disponibilidad, conforme al RGPD.
    </p>
  ),

  modificaciones: (
    <p>
      Esta política podrá actualizarse en cualquier momento. En caso de cambios
      relevantes, se informará a los usuarios dentro de la app o por correo
      electrónico.
    </p>
  ),
};
