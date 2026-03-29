import api from '@config/api';
import apiRoutes from '@config/apiRoutes';

/**
 * Admin Parking Service
 * Handles parking notification management for administrators
 */

/**
 * Get all parking notifications with optional filters
 * @param {Object} params - Query parameters (status, user_id, blue_zone, from_date, to_date, sort_by, sort_order, per_page, page)
 * @returns {Promise} Paginated parking notifications list
 */
export const getParkings = async (params = {}) => {
  const response = await api.get(apiRoutes.admin.parkings.index(), { params });
  return response.data;
};

/**
 * Create new parking notification (admin can create without restrictions)
 * @param {Object} parkingData - Parking data (user_id, latitude, longitude, in_minutes, blue_zone)
 * @returns {Promise} Created parking notification with raffle ticket info
 */
export const createParking = async (parkingData) => {
  const response = await api.post(apiRoutes.admin.parkings.store(), parkingData);
  return response.data;
};

/**
 * Delete parking notification
 * @param {number} id - Parking notification ID
 * @returns {Promise} Success message
 */
export const deleteParking = async (id) => {
  const response = await api.delete(apiRoutes.admin.parkings.destroy(id));
  return response.data;
};

/**
 * Get user parking history
 * @param {number} userId - User ID
 * @param {Object} params - Query parameters (type, from_date, to_date, per_page, page)
 * @returns {Promise} Paginated parking history
 */
export const getUserParkingHistory = async (userId, params = {}) => {
  const response = await api.get(apiRoutes.admin.parkings.history(userId), { params });
  return response.data;
};

export default {
  getParkings,
  createParking,
  deleteParking,
  getUserParkingHistory,
};
