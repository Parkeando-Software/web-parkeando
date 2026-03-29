import api from '@config/api';

const userNotificationService = {
  // Obtener notificaciones del usuario
  getNotifications: async (page = 1) => {
    try {
      const response = await api.get(`/user/notifications?page=${page}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching notifications:', error);
      throw error;
    }
  },

  // Obtener contador de no leídas
  getUnreadCount: async () => {
    try {
      const response = await api.get('/user/notifications/unread-count');
      return response.data;
    } catch (error) {
      console.error('Error fetching unread count:', error);
      throw error;
    }
  },

  // Marcar como leída
  markAsRead: async (id) => {
    try {
      const response = await api.put(`/user/notifications/${id}/read`);
      return response.data;
    } catch (error) {
      console.error('Error marking notification as read:', error);
      throw error;
    }
  },

  // Marcar todas como leídas
  markAllAsRead: async () => {
    try {
      const response = await api.put('/user/notifications/read-all');
      return response.data;
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
      throw error;
    }
  },

  // Eliminar notificación
  deleteNotification: async (id) => {
    try {
      const response = await api.delete(`/user/notifications/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting notification:', error);
      throw error;
    }
  }
};

export default userNotificationService;
