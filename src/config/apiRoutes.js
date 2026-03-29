/**
 * Rutas del API (endpoints) centralizadas para usar desde el cliente.
 * Cada propiedad es una función o cadena que devuelve la URL completa basada
 * en la variable de entorno `VITE_API_URL` (o el valor por defecto).
 */

const BASE = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";

const build = (path) => {
  if (!path) return BASE;
  // Asegura que no dupliquemos barras
  return `${BASE}${path.startsWith("/") ? path : "/" + path}`;
};

const apiRoutes = {
  // Health
  up: () => build("/up"),

  // Landing stats (public)
  landingStats: () => build("/landing/stats"),
  landingReviews: () => build("/landing/reviews"),

  // Social auth
  auth: {
    google: () => build("/auth/google"),
    apple: () => build("/auth/apple"),
    facebook: () => build("/auth/facebook"),
  },

  // Auth
  register: () => build("/register"),
  activate: (token) => build(`/activate/${token}`),
  login: () => build("/login"),
  forgotPassword: () => build("/forgot-password"),
  resetPassword: () => build("/reset-password"),
  logout: () => build("/logout"),

  // User
  me: () => build("/user"),
  profile: () => build("/profile"),

  // Vehicles (resource)
  vehicles: {
    index: () => build("/vehicles"),
    store: () => build("/vehicles"),
    update: (id) => build(`/vehicles/${id}`),
    destroy: (id) => build(`/vehicles/${id}`),
  },

  // Notifications (plazas)
  notifications: {
    index: () => build("/notifications"),
    store: () => build("/notifications"),
    show: (id) => build(`/notifications/${id}`),
    update: (id) => build(`/notifications/${id}`),
    nearby: () => build(`/notifications/nearby`),
    confirm: (id) => build(`/notifications/${id}/confirm`),
  },

  // Wait requests
  waitRequests: {
    index: () => build("/wait-requests"),
    store: () => build("/wait-requests"),
    update: (id) => build(`/wait-requests/${id}`),
  },

  // Parking history
  parkingHistory: {
    index: () => build("/parking-history"),
    store: () => build("/parking-history"),
  },

  // Inbox / me
  inbox: {
    index: () => build("/me/inbox"),
    markRead: () => build("/me/inbox/read"),
  },

  // Account deletion flow
  account: {
    deleteRequest: () => build("/account/delete-request"),
    confirmDeleteRequest: (token) => build(`/account/delete-request/confirm/${token}`),
    cancelDeleteRequest: (token) => build(`/account/delete-request/cancel/${token}`),
    deleteRequestStatus: (token) => build(`/account/delete-request/status/${token}`),
  },

  // Contact
  contact: () => build("/contact"),

  // Points history
  pointsHistory: {
    index: () => build("/customers/points-history"),
  },

  // Raffles (user-facing)
  raffles: {
    index: () => build("/raffles"),
    history: () => build("/raffles/history"),
  },

  // Admin routes
  admin: {
    // User Management
    users: {
      index: () => build("/admin/users"),
      show: (id) => build(`/admin/users/${id}`),
      store: () => build("/admin/users"),
      update: (id) => build(`/admin/users/${id}`),
      destroy: (id) => build(`/admin/users/${id}`),
      updatePoints: (id) => build(`/admin/users/${id}/points`),
      updateReputation: (id) => build(`/admin/users/${id}/reputation`),
      vehicleStats: () => build('/admin/vehicles/stats'),
      vehicles: (id) => build(`/admin/users/${id}/vehicles`),
      storeVehicle: (id) => build(`/admin/users/${id}/vehicles`),
      updateVehicle: (userId, vehicleId) => build(`/admin/users/${userId}/vehicles/${vehicleId}`),
      destroyVehicle: (userId, vehicleId) => build(`/admin/users/${userId}/vehicles/${vehicleId}`),
    },
    
    // Delete Requests Management
    deleteRequests: {
      index: () => build("/admin/delete-requests"),
      show: (id) => build(`/admin/delete-requests/${id}`),
      execute: (id) => build(`/admin/delete-requests/${id}/execute`),
      cancel: (id) => build(`/admin/delete-requests/${id}/cancel`),
    },
    
    // Parking Management
    parkings: {
      index: () => build("/admin/parkings"),
      store: () => build("/admin/parkings"),
      destroy: (id) => build(`/admin/parkings/${id}`),
      history: (userId) => build(`/admin/parkings/history/${userId}`),
    },
    
    // Raffle Management
    raffles: {
      index: () => build("/admin/raffles"),
      store: () => build("/admin/raffles"),
      show: (id) => build(`/admin/raffles/${id}`),
      participants: (id) => build(`/admin/raffles/${id}/participants`),
      execute: (id) => build(`/admin/raffles/${id}/execute`),
      close: (id) => build(`/admin/raffles/${id}/close`),
      reopen: (id) => build(`/admin/raffles/${id}/reopen`),
    },
    
    // App Store Management
    appStore: {
      stats: () => build("/admin/app-store/stats"),
      updateStats: () => build("/admin/app-store/stats"),
      reviews: () => build("/admin/app-store/reviews"),
      storeReview: () => build("/admin/app-store/reviews"),
      updateReview: (id) => build(`/admin/app-store/reviews/${id}`),
      destroyReview: (id) => build(`/admin/app-store/reviews/${id}`),
      toggleReview: (id) => build(`/admin/app-store/reviews/${id}/toggle`),
    },
    serverStatus: () => build('/up'),
  },
};

export default apiRoutes;
