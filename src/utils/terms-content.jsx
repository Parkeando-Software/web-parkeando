import React from "react";

export const termsSections = [
  {
    id: "objeto",
    title: "1. Objeto del servicio",
    content: (
      <>
        <p>
          Parkeando es una aplicación que facilita el intercambio de información entre conductores sobre zonas de aparcamiento en vía pública. La app no garantiza disponibilidad, no gestiona reservas y no otorga ningún derecho de uso exclusivo sobre el dominio público.
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>La información mostrada tiene carácter meramente informativo y orientativo.</li>
          <li>El uso de la app no sustituye el cumplimiento de la normativa de tráfico ni de las ordenanzas municipales.</li>
        </ul>
      </>
    ),
  },
  {
    id: "uso",
    title: "2. Uso permitido y conducta",
    content: (
      <>
        <ul className="list-disc pl-5 space-y-2">
          <li>El usuario se compromete a utilizar la app respetando las normas de circulación y estacionamiento vigentes.</li>
          <li>Las notificaciones de salida son voluntarias para favorecer la rotación natural.</li>
        </ul>
        <div className="rounded-xl border border-red-200 bg-red-50/80 p-4">
          <p className="font-medium text-red-800">
            Se considerará uso indebido retrasar intencionadamente la salida, “guardar sitio” o impedir que otro usuario estacione. La cuenta podrá ser suspendida.
          </p>
        </div>
        <div className="rounded-xl border border-red-200 bg-red-50/80 p-4">
          <p className="font-medium text-red-800">
            También se considerará uso indebido bloquear o coordinar ocupación de espacios en vía pública.
          </p>
        </div>
      </>
    ),
  },
  {
    id: "parkipoints",
    title: "3. ParkiPoints y sorteos",
    content: (
      <>
        <ul className="list-disc pl-5 space-y-2">
          <li>Los <strong>ParkiPoints</strong> son indicadores de actividad sin valor económico, para participar en sorteos promocionales.</li>
          <li>Por cada cierto número de ParkiPoints, se otorgará un número para el sorteo.</li>
          <li>Los ParkiPoints se añaden automáticamente tras notificación de salida y validación diferida.</li>
        </ul>
        <div className="rounded-xl border border-red-200 bg-red-50/80 p-4">
          <p className="font-medium text-red-800 m-0">No son canjeables por dinero ni representan crédito alguno.</p>
        </div>
      </>
    ),
  },
  {
    id: "antifraude",
    title: "4. Prevención y antifraude",
    content: (
      <ul className="list-disc pl-5 space-y-2">
        <li>Parkeando aplica controles de ubicación y tiempo para evitar abusos.</li>
        <li>Se podrán anular ParkiPoints o limitar funcionalidades ante indicios de fraude.</li>
        <li>El incumplimiento grave o reiterado puede suspender la cuenta.</li>
      </ul>
    ),
  },
  {
    id: "responsabilidades",
    title: "5. Responsabilidades",
    content: (
      <ul className="list-disc pl-5 space-y-2">
        <li>El usuario es responsable de su conducción, estacionamiento y sanciones.</li>
        <li>Parkeando no garantiza disponibilidad ni exactitud permanente de la información.</li>
        <li>La app se ofrece “tal cual”, pudiendo sufrir interrupciones o errores.</li>
      </ul>
    ),
  },
  {
    id: "propiedad",
    title: "6. Propiedad intelectual",
    content: (
      <p>
        El software, marcas, logotipos, textos e interfaces están protegidos por derechos de propiedad intelectual e industrial. No se permite reproducción, distribución o modificación sin autorización expresa.
      </p>
    ),
  },
  {
    id: "modificaciones",
    title: "7. Modificaciones",
    content: (
      <p>
        Parkeando podrá actualizar estas condiciones para mejorar el servicio o cumplir cambios normativos. Se comunicará la nueva fecha de actualización.
      </p>
    ),
  },
  {
    id: "contacto",
    title: "8. Contacto y textos legales",
    content: (
      <ul className="list-disc pl-5 space-y-2">
        <li>
          Para dudas legales o incidencias, contactar a{" "}
          <a href="mailto:info@parkeando.es" className="text-blue-700 hover:underline font-medium">
            info@parkeando.es
          </a>
          .
        </li>
        <li>La <strong>Política de Privacidad</strong> y las <strong>Bases de Sorteo</strong> estarán disponibles en la app o sitio web oficial.</li>
      </ul>
    ),
  },
];
