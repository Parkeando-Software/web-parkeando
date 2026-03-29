import api from '@config/api';
import apiRoutes from '@config/apiRoutes';

/**
 * Admin Delete Request Service
 * Handles account deletion request management for administrators
 */

/**
 * Get all delete requests with optional filters
 * @param {Object} params - Query parameters (status, confirmed, search, sort_by, sort_order, per_page, page)
 * @returns {Promise} Paginated delete requests list
 */
export const getDeleteRequests = async (params = {}) => {
  const response = await api.get(apiRoutes.admin.deleteRequests.index(), { params });
  return response.data;
};

/**
 * Get delete request details by ID
 * @param {number} id - Delete request ID
 * @returns {Promise} Delete request details with user info and timeline
 */
export const getDeleteRequestById = async (id) => {
  const response = await api.get(apiRoutes.admin.deleteRequests.show(id));
  return response.data;
};

/**
 * Execute account deletion
 * @param {number} id - Delete request ID
 * @returns {Promise} Success message and updated request
 */
export const executeDeleteRequest = async (id) => {
  const response = await api.post(apiRoutes.admin.deleteRequests.execute(id));
  return response.data;
};

/**
 * Cancel delete request
 * @param {number} id - Delete request ID
 * @returns {Promise} Success message and updated request
 */
export const cancelDeleteRequest = async (id) => {
  const response = await api.post(apiRoutes.admin.deleteRequests.cancel(id));
  return response.data;
};

export default {
  getDeleteRequests,
  getDeleteRequestById,
  executeDeleteRequest,
  cancelDeleteRequest,
};
