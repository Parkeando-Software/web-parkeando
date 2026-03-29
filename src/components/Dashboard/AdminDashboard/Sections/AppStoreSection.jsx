import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Store, Star, Plus, Edit, Trash2, Eye, EyeOff, Save, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import api from '@config/api';
import apiRoutes from '@config/apiRoutes';
import Swal from 'sweetalert2';
import ReviewFormModal from '../Modals/ReviewFormModal';

export default function AppStoreSection() {
  const [stats, setStats] = useState({
    total_downloads: '0',
    average_rating: 5.0,
    total_reviews: 0
  });
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingStats, setEditingStats] = useState(false);
  const [editForm, setEditForm] = useState({});
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [editingReview, setEditingReview] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [statsRes, reviewsRes] = await Promise.all([
        api.get(apiRoutes.admin.appStore.stats()),
        api.get(apiRoutes.admin.appStore.reviews())
      ]);
      setStats(statsRes.data);
      setReviews(reviewsRes.data.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      Swal.fire('Error', 'No se pudieron cargar los datos', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStats = async () => {
    try {
      await api.put(apiRoutes.admin.appStore.updateStats(), editForm);
      Swal.fire('¡Éxito!', 'Estadísticas actualizadas correctamente', 'success');
      setEditingStats(false);
      fetchData();
    } catch (error) {
      Swal.fire('Error', 'No se pudieron actualizar las estadísticas', 'error');
    }
  };

  const handleSaveReview = async (reviewData) => {
    try {
      if (editingReview) {
        await api.put(apiRoutes.admin.appStore.updateReview(editingReview.id), reviewData);
        Swal.fire('¡Éxito!', 'Reseña actualizada correctamente', 'success');
      } else {
        await api.post(apiRoutes.admin.appStore.storeReview(), reviewData);
        Swal.fire('¡Éxito!', 'Reseña creada correctamente', 'success');
      }
      setShowReviewModal(false);
      setEditingReview(null);
      fetchData();
    } catch (error) {
      Swal.fire('Error', 'No se pudo guardar la reseña', 'error');
    }
  };

  const handleDeleteReview = async (id) => {
    const result = await Swal.fire({
      title: '¿Eliminar reseña?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    });

    if (result.isConfirmed) {
      try {
        await api.delete(apiRoutes.admin.appStore.destroyReview(id));
        Swal.fire('¡Eliminada!', 'La reseña ha sido eliminada', 'success');
        fetchData();
      } catch (error) {
        Swal.fire('Error', 'No se pudo eliminar la reseña', 'error');
      }
    }
  };

  const handleToggleReview = async (id) => {
    try {
      await api.patch(apiRoutes.admin.appStore.toggleReview(id));
      fetchData();
    } catch (error) {
      Swal.fire('Error', 'No se pudo cambiar el estado', 'error');
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center py-20">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
    </div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Store className="text-blue-500" />
            Gestión de App Store
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Administra las estadísticas y reseñas de Play Store
          </p>
        </div>
      </div>

      {/* Stats Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Estadísticas de Play Store</CardTitle>
            {!editingStats ? (
              <Button onClick={() => {
                setEditingStats(true);
                setEditForm(stats);
              }} size="sm">
                <Edit className="w-4 h-4 mr-2" />
                Editar
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button onClick={handleUpdateStats} size="sm">
                  <Save className="w-4 h-4 mr-2" />
                  Guardar
                </Button>
                <Button onClick={() => setEditingStats(false)} variant="outline" size="sm">
                  <X className="w-4 h-4 mr-2" />
                  Cancelar
                </Button>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {editingStats ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Total Descargas</label>
                <input
                  type="text"
                  value={editForm.total_downloads}
                  onChange={(e) => setEditForm({...editForm, total_downloads: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="ej: 1k+, 10k+"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Calificación Promedio</label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="5"
                  value={editForm.average_rating}
                  onChange={(e) => setEditForm({...editForm, average_rating: parseFloat(e.target.value)})}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Total Reseñas</label>
                <input
                  type="number"
                  value={editForm.total_reviews}
                  onChange={(e) => setEditForm({...editForm, total_reviews: parseInt(e.target.value)})}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Total Descargas</p>
                <p className="text-3xl font-bold text-blue-600">{stats.total_downloads}</p>
              </div>
              <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Calificación Promedio</p>
                <p className="text-3xl font-bold text-yellow-600 flex items-center justify-center gap-1">
                  {stats.average_rating} <Star className="w-6 h-6 fill-current" />
                </p>
              </div>
              <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Total Reseñas</p>
                <p className="text-3xl font-bold text-green-600">{stats.total_reviews}</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Reviews Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Reseñas de Play Store</CardTitle>
            <Button onClick={() => {
              setEditingReview(null);
              setShowReviewModal(true);
            }}>
              <Plus className="w-4 h-4 mr-2" />
              Nueva Reseña
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {reviews.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">No hay reseñas registradas</p>
            ) : (
              reviews.map((review) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={`p-4 border rounded-lg ${!review.is_active ? 'opacity-50' : ''}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-semibold">{review.author_name}</h4>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{review.comment}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(review.review_date).toLocaleDateString('es-ES')} • Orden: {review.display_order}
                      </p>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleToggleReview(review.id)}
                      >
                        {review.is_active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setEditingReview(review);
                          setShowReviewModal(true);
                        }}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDeleteReview(review.id)}
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Review Modal */}
      {showReviewModal && (
        <ReviewFormModal
          review={editingReview}
          onSave={handleSaveReview}
          onClose={() => {
            setShowReviewModal(false);
            setEditingReview(null);
          }}
        />
      )}
    </div>
  );
}


