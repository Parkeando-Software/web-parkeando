/**
 * Admin Helper Utilities
 * Common helper functions for admin dashboard
 */

/**
 * Format date to localized string
 * @param {string} dateString - ISO date string
 * @returns {string} Formatted date
 */
export const formatDate = (dateString) => {
  if (!dateString) return '-';
  const date = new Date(dateString);
  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

/**
 * Format datetime to localized string
 * @param {string} dateString - ISO datetime string
 * @returns {string} Formatted datetime
 */
export const formatDateTime = (dateString) => {
  if (!dateString) return '-';
  const date = new Date(dateString);
  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

/**
 * Calculate days remaining from a date
 * @param {string} dateString - ISO date string
 * @returns {number} Days remaining (negative if past)
 */
export const getDaysRemaining = (dateString) => {
  if (!dateString) return null;
  const targetDate = new Date(dateString);
  const now = new Date();
  const diffTime = targetDate - now;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

/**
 * Get status badge color based on status
 * @param {string} status - Status string
 * @returns {string} Tailwind color classes
 */
export const getStatusBadgeColor = (status) => {
  const colors = {
    active: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    inactive: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400',
    pending: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
    processing: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    completed: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
    cancelled: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    closed: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400',
    finished: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400',
  };
  return colors[status] || colors.inactive;
};

/**
 * Get role name from role ID
 * @param {number} roleId - Role ID
 * @returns {string} Role name
 */
export const getRoleName = (roleId) => {
  const roles = {
    1: 'Usuario',
    2: 'Usuario Pro',
    3: 'Administrador',
    4: 'SuperAdmin',
  };
  return roles[roleId] || 'Desconocido';
};

export const getRoleBadgeColor = (roleId) => {
  const colors = {
    1: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400", // Usuario
    2: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400", // Usuario Pro
    3: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400", // Administrador
    4: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400", // SuperAdmin
  };

  return colors[roleId] || "bg-gray-200 text-gray-700";
};


/**
 * Get status label in Spanish
 * @param {string} status - Status string
 * @returns {string} Spanish label
 */
export const getStatusLabel = (status) => {
  const labels = {
    active: 'Activo',
    inactive: 'Inactivo',
    pending: 'Pendiente',
    processing: 'En Proceso',
    completed: 'Completado',
    cancelled: 'Cancelado',
    closed: 'Cerrado',
    finished: 'Finalizado',
  };
  return labels[status] || status;
};

/**
 * Format points with thousands separator
 * @param {number} points - Points value
 * @returns {string} Formatted points
 */
export const formatPoints = (points) => {
  if (points === null || points === undefined) return '0';
  return points.toLocaleString('es-ES');
};

/**
 * Format reputation with one decimal
 * @param {number} reputation - Reputation value
 * @returns {string} Formatted reputation
 */
export const formatReputation = (reputation) => {
  if (reputation === null || reputation === undefined) return '0.0';
  return reputation;
};

/**
 * Handle API errors and return user-friendly message
 * @param {Error} error - Error object
 * @returns {string} User-friendly error message
 */
export const handleApiError = (error) => {
  if (error.response) {
    // Server responded with error
    const { status, data } = error.response;
    
    if (status === 401) {
      return 'No autorizado. Por favor, inicia sesión nuevamente.';
    }
    
    if (status === 403) {
      return 'No tienes permisos para realizar esta acción.';
    }
    
    if (status === 404) {
      return 'Recurso no encontrado.';
    }
    
    if (status === 422 && data.errors) {
      // Validation errors
      const firstError = Object.values(data.errors)[0];
      return Array.isArray(firstError) ? firstError[0] : firstError;
    }
    
    if (data.message) {
      return data.message;
    }
    
    return `Error del servidor (${status})`;
  }
  
  if (error.request) {
    // Request made but no response
    return 'No se pudo conectar con el servidor. Verifica tu conexión.';
  }
  
  // Something else happened
  return error.message || 'Ha ocurrido un error inesperado.';
};

/**
 * Truncate text to specified length
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} Truncated text
 */
export const truncateText = (text, maxLength = 50) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

export default {
  formatDate,
  formatDateTime,
  getDaysRemaining,
  getStatusBadgeColor,
  getRoleName,
  getStatusLabel,
  formatPoints,
  formatReputation,
  handleApiError,
  truncateText,
};
