/**
 * Formatea una fecha a formato español legible
 * @param {string} dateString - Fecha en formato ISO
 * @returns {string} Fecha formateada
 */
export function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('es-ES', { 
    day: 'numeric', 
    month: 'short', 
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}
