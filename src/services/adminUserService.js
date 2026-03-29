import api from '@config/api';
import apiRoutes from '@config/apiRoutes';

/**
 * Admin User Service
 * Handles all user management operations for administrators
 */

/**
 * Get all users with optional filters
 * @param {Object} params - Query parameters (role_id, account_activated, search, sort_by, sort_order, per_page, page)
 * @returns {Promise} Paginated users list
 */
export const getUsers = async (params = {}) => {
  const response = await api.get(apiRoutes.admin.users.index(), { params });
  return response.data;
};

/**
 * Get user details by ID
 * @param {number} id - User ID
 * @returns {Promise} User details with relations
 */
export const getUserById = async (id) => {
  const response = await api.get(apiRoutes.admin.users.show(id));
  return response.data;
};

/**
 * Create new user
 * @param {Object} userData - User data (username, name, email, password, role_id, phone, avatar, etc.)
 * @returns {Promise} Created user
 */
export const createUser = async (userData) => {
  const response = await api.post(apiRoutes.admin.users.store(), userData);
  return response.data;
};

/**
 * Update user
 * @param {number} id - User ID
 * @param {Object} userData - Updated user data
 * @returns {Promise} Updated user
 */
export const updateUser = async (id, userData) => {
  const response = await api.patch(apiRoutes.admin.users.update(id), userData);
  return response.data;
};

/**
 * Delete user
 * @param {number} id - User ID
 * @returns {Promise} Success message
 */
export const deleteUser = async (id) => {
  const response = await api.delete(apiRoutes.admin.users.destroy(id));
  return response.data;
};

/**
 * Update user points
 * @param {number} id - User ID
 * @param {number} points - New points value
 * @returns {Promise} Updated customer with new reputation
 */
export const updateUserPoints = async (id, points) => {
  const response = await api.patch(apiRoutes.admin.users.updatePoints(id), { points });
  return response.data;
};

/**
 * Update user reputation
 * @param {number} id - User ID
 * @param {number} reputation - New reputation value (0-10)
 * @returns {Promise} Updated customer
 */
export const updateUserReputation = async (id, reputation) => {
  const response = await api.patch(apiRoutes.admin.users.updateReputation(id), { reputation });
  return response.data;
};

/**
 * Get vehicle stats
 * @returns {Promise} Vehicle stats
 */
export const getVehicleStats = async () => {
  const response = await api.get(apiRoutes.admin.users.vehicleStats());
  return response.data;
};

/**
 * Get user vehicles
 * @param {number} id - User ID
 * @returns {Promise} User vehicles list
 */
export const getUserVehicles = async (id) => {
  const response = await api.get(apiRoutes.admin.users.vehicles(id));
  return response.data;
};

/**
 * Add vehicle to user
 * @param {number} userId - User ID
 * @param {Object} vehicleData - Vehicle data
 * @returns {Promise} Created vehicle
 */
export const addUserVehicle = async (userId, vehicleData) => {
  const response = await api.post(apiRoutes.admin.users.storeVehicle(userId), vehicleData);
  return response.data;
};

/**
 * Update user vehicle
 * @param {number} userId - User ID
 * @param {number} vehicleId - Vehicle ID
 * @param {Object} vehicleData - Vehicle data
 * @returns {Promise} Updated vehicle
 */
export const updateUserVehicle = async (userId, vehicleId, vehicleData) => {
  const response = await api.put(apiRoutes.admin.users.updateVehicle(userId, vehicleId), vehicleData);
  return response.data;
};

/**
 * Delete user vehicle
 * @param {number} userId - User ID
 * @param {number} vehicleId - Vehicle ID
 * @returns {Promise} Success message
 */
export const deleteUserVehicle = async (userId, vehicleId) => {
  const response = await api.delete(apiRoutes.admin.users.destroyVehicle(userId, vehicleId));
  return response.data;
};

export default {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  updateUserPoints,
  updateUserReputation,
  getVehicleStats,
  getUserVehicles,
  addUserVehicle,
  updateUserVehicle,
  deleteUserVehicle,
};
