import api from '@config/api';

const adminEmailService = {
  // Obtener lista de emails con filtros
  getEmails: async (params = {}) => {
    try {
      const response = await api.get('/admin/emails', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching emails:', error);
      throw error;
    }
  },

  // Obtener detalles de un email
  getEmailById: async (id) => {
    try {
      const response = await api.get(`/admin/emails/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching email details:', error);
      throw error;
    }
  },

  // Enviar email personalizado
  sendEmail: async (data) => {
    try {
      const response = await api.post('/admin/emails/send', data);
      return response.data;
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  },

  // Reenviar email
  resendEmail: async (id) => {
    try {
      const response = await api.post(`/admin/emails/${id}/resend`);
      return response.data;
    } catch (error) {
      console.error('Error resending email:', error);
      throw error;
    }
  },

  // Obtener estadísticas
  getStats: async () => {
    try {
      const response = await api.get('/admin/emails/stats');
      return response.data;
    } catch (error) {
      console.error('Error fetching email stats:', error);
      throw error;
    }
  }
};

export default adminEmailService;
