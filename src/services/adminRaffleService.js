import api from '@config/api';
import apiRoutes from '@config/apiRoutes';

/**
 * Admin Raffle Service
 * Handles raffle management for administrators
 */

/**
 * Get all raffles with optional filters
 * @param {Object} params - Query parameters (status, sort_by, sort_order, per_page, page)
 * @returns {Promise} Paginated raffles list with participant counts
 */
export const getRaffles = async (params = {}) => {
  const response = await api.get(apiRoutes.admin.raffles.index(), { params });
  return response.data;
};

/**
 * Create new raffle (active for current month)
 * @param {Object} raffleData - Raffle data (title, description, image_url)
 * @returns {Promise} Created raffle
 */
export const createRaffle = async (raffleData) => {
  const response = await api.post(apiRoutes.admin.raffles.store(), raffleData);
  return response.data;
};

/**
 * Get raffle details with participants grouped by user
 * @param {number} id - Raffle ID
 * @returns {Promise} Raffle details with participants and statistics
 */
export const getRaffleById = async (id) => {
  const response = await api.get(apiRoutes.admin.raffles.show(id));
  return response.data;
};

/**
 * Get raffle participants with search
 * @param {number} id - Raffle ID
 * @param {Object} params - Query parameters (ticket_number, search, sort_by, sort_order, per_page, page)
 * @returns {Promise} Paginated participants list
 */
export const getRaffleParticipants = async (id, params = {}) => {
  const response = await api.get(apiRoutes.admin.raffles.participants(id), { params });
  return response.data;
};

/**
 * Execute raffle and select winner
 * @param {number} id - Raffle ID
 * @param {Object} winnerData - Winner data (winner_user_id, winner_number)
 * @returns {Promise} Updated raffle with winner info
 */
export const executeRaffle = async (id, winnerData) => {
  const response = await api.post(apiRoutes.admin.raffles.execute(id), winnerData);
  return response.data;
};

/**
 * Close raffle manually
 * @param {number} id - Raffle ID
 * @returns {Promise} Updated raffle
 */
export const closeRaffle = async (id) => {
  const response = await api.post(apiRoutes.admin.raffles.close(id));
  return response.data;
};

/**
 * Reopen a closed raffle
 * @param {number} id - Raffle ID
 * @returns {Promise} Updated raffle
 */
export const reopenRaffle = async (id) => {
  const response = await api.post(apiRoutes.admin.raffles.reopen(id));
  return response.data;
};

/**
 * Get available raffle images from server
 * @returns {Promise} List of available image numbers
 */
export const getAvailableImages = async () => {
  const response = await api.get('admin/raffles/available-images');
  return response.data;
};

export default {
  getRaffles,
  createRaffle,
  getRaffleById,
  getRaffleParticipants,
  executeRaffle,
  closeRaffle,
  reopenRaffle,
  getAvailableImages,
};
