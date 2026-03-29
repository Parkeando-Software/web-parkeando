import React from "react";

export const cookiesSections = [
  {
    id: "que-son",
    title: "1. ¿Qué son las cookies?",
    content: (
      <>
        <p>
          Las cookies son pequeños archivos de texto que se almacenan en tu
          dispositivo cuando visitas nuestro sitio web. Nos permiten reconocer
          tu dispositivo y recordar información sobre tu visita.
        </p>
        <p>
          Son esenciales para el funcionamiento de muchos sitios web modernos y
          mejoran tu experiencia de usuario.
        </p>
      </>
    ),
  },
  {
    id: "tipos",
    title: "2. Tipos de cookies que utilizamos",
    content: (
      <div className="space-y-4">
        <div className="rounded-xl border border-blue-200 bg-blue-50/80 p-4">
          <h3 className="font-semibold text-blue-800 mb-2">
            🍪 Cookies Técnicas (Necesarias)
          </h3>
          <p className="text-sm text-blue-700 mb-2">
            Esenciales para el funcionamiento del sitio web.
          </p>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Autenticación: Mantienen tu sesión iniciada</li>
            <li>• Seguridad: Protegen contra ataques CSRF</li>
            <li>• Preferencias: Recuerdan configuraciones básicas</li>
            <li>• Funcionalidad: Permiten correcto funcionamiento</li>
          </ul>
        </div>

        <div className="rounded-xl border border-green-200 bg-green-50/80 p-4">
          <h3 className="font-semibold text-green-800 mb-2">
            📊 Cookies Analíticas
          </h3>
          <p className="text-sm text-green-700 mb-2">
            Nos ayudan a entender la interacción de los usuarios.
          </p>
          <ul className="text-sm text-green-700 space-y-1">
            <li>• Google Analytics: Estadísticas de uso y comportamiento</li>
            <li>• Métricas de rendimiento: Tiempo de carga y errores</li>
            <li>• Análisis de rutas: Páginas más visitadas</li>
          </ul>
        </div>

        <div className="rounded-xl border border-purple-200 bg-purple-50/80 p-4">
          <h3 className="font-semibold text-purple-800 mb-2">
            ⚙️ Cookies de Funcionalidad
          </h3>
          <p className="text-sm text-purple-700 mb-2">
            Mejoran la funcionalidad y personalización.
          </p>
          <ul className="text-sm text-purple-700 space-y-1">
            <li>• Preferencias de idioma</li>
            <li>• Configuración de tema</li>
            <li>• Ubicación para geolocalización</li>
          </ul>
        </div>

        <div className="rounded-xl border border-orange-200 bg-orange-50/80 p-4">
          <h3 className="font-semibold text-orange-800 mb-2">
            📢 Cookies de Marketing
          </h3>
          <p className="text-sm text-orange-700 mb-2">
            Mostrar anuncios relevantes y medir campañas.
          </p>
          <ul className="text-sm text-orange-700 space-y-1">
            <li>• Google Ads</li>
            <li>• Redes sociales</li>
            <li>• Remarketing</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    id: "finalidad",
    title: "3. Finalidad y duración de las cookies",
    content: (
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200">
              <th className="text-left py-2 font-semibold">Cookie</th>
              <th className="text-left py-2 font-semibold">Finalidad</th>
              <th className="text-left py-2 font-semibold">Duración</th>
              <th className="text-left py-2 font-semibold">Tipo</th>
            </tr>
          </thead>
          <tbody className="space-y-2">
            <tr className="border-b border-slate-100">
              <td className="py-2 font-mono text-xs">session_id</td>
              <td className="py-2">Identificación de sesión</td>
              <td className="py-2">Sesión</td>
              <td className="py-2">Técnica</td>
            </tr>
            <tr className="border-b border-slate-100">
              <td className="py-2 font-mono text-xs">user_preferences</td>
              <td className="py-2">Preferencias del usuario</td>
              <td className="py-2">1 año</td>
              <td className="py-2">Funcionalidad</td>
            </tr>
            <tr className="border-b border-slate-100">
              <td className="py-2 font-mono text-xs">_ga</td>
              <td className="py-2">Google Analytics</td>
              <td className="py-2">2 años</td>
              <td className="py-2">Analítica</td>
            </tr>
            <tr className="border-b border-slate-100">
              <td className="py-2 font-mono text-xs">cookie_consent</td>
              <td className="py-2">Consentimiento de cookies</td>
              <td className="py-2">1 año</td>
              <td className="py-2">Técnica</td>
            </tr>
          </tbody>
        </table>
      </div>
    ),
  },
  {
    id: "gestion",
    title: "4. Gestión de cookies",
    content: (
      <div className="space-y-4">
        <div className="rounded-xl border border-blue-200 bg-blue-50/80 p-4">
          <h3 className="font-semibold text-blue-800 mb-2">
            ⚙️ Configuración en nuestro sitio
          </h3>
          <p className="text-sm text-blue-700 mb-2">
            Puedes gestionar tus preferencias de cookies desde nuestro sitio
            web.
          </p>
        </div>
        <div className="rounded-xl border border-green-200 bg-green-50/80 p-4">
          <h3 className="font-semibold text-green-800 mb-2">
            🌐 Configuración del navegador
          </h3>
          <p className="text-sm text-green-700 mb-2">
            También puedes gestionarlas desde tu navegador.
          </p>
        </div>
        <div className="rounded-xl border border-orange-200 bg-orange-50/80 p-4">
          <h3 className="font-semibold text-orange-800 mb-2">⚠️ Importante</h3>
          <p className="text-sm text-orange-700">
            Desactivar cookies técnicas puede afectar la funcionalidad del
            sitio.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: "terceros",
    title: "5. Cookies de terceros",
    content: (
      <div className="space-y-4">
        <div className="rounded-xl border border-blue-200 bg-blue-50/80 p-4">
          <h3 className="font-semibold text-blue-800 mb-2">Google Analytics</h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>
              • Política de privacidad:{" "}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                Google Privacy Policy
              </a>
            </li>
          </ul>
        </div>
        <div className="rounded-xl border border-green-200 bg-green-50/80 p-4">
          <h3 className="font-semibold text-green-800 mb-2">Google Maps</h3>
        </div>
        <div className="rounded-xl border border-purple-200 bg-purple-50/80 p-4">
          <h3 className="font-semibold text-purple-800 mb-2">Redes Sociales</h3>
        </div>
      </div>
    ),
  },
  {
    id: "actualizaciones",
    title: "6. Actualizaciones",
    content: (
      <p>
        Esta política de cookies puede actualizarse periódicamente. Se
        recomienda revisar esta página regularmente.
      </p>
    ),
  },
  {
    id: "contacto",
    title: "7. Contacto",
    content: (
      <p>
        Puedes contactarnos en{" "}
        <a
          href="mailto:info@parkeando.es"
          className="text-blue-700 hover:underline"
        >
          info@parkeando.es
        </a>
        .
      </p>
    ),
  },
];
