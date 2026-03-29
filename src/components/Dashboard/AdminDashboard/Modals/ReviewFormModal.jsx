import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@components/ui/button';

export default function ReviewFormModal({ review, onSave, onClose }) {
  const [formData, setFormData] = useState({
    author_name: '',
    rating: 5,
    comment: '',
    review_date: new Date().toISOString().split('T')[0],
    is_active: true,
    display_order: 0
  });

  useEffect(() => {
    if (review) {
      setFormData({
        author_name: review.author_name || '',
        rating: review.rating || 5,
        comment: review.comment || '',
        review_date: review.review_date || new Date().toISOString().split('T')[0],
        is_active: review.is_active ?? true,
        display_order: review.display_order || 0
      });
    } else {
      setFormData({
        author_name: '',
        rating: 5,
        comment: '',
        review_date: new Date().toISOString().split('T')[0],
        is_active: true,
        display_order: 0
      });
    }
  }, [review]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-card rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto bg-white dark:bg-slate-900"
      >
        <div className="p-6">
          <h3 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">
            {review ? 'Editar Reseña' : 'Nueva Reseña'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">Nombre del Autor</label>
              <input
                type="text"
                value={formData.author_name}
                onChange={(e) => setFormData({...formData, author_name: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">Calificación</label>
              <select
                value={formData.rating}
                onChange={(e) => setFormData({...formData, rating: parseInt(e.target.value)})}
                className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              >
                {[5,4,3,2,1].map(n => (
                  <option key={n} value={n}>{n} estrellas</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">Comentario</label>
              <textarea
                value={formData.comment}
                onChange={(e) => setFormData({...formData, comment: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                rows="4"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">Fecha</label>
                <input
                  type="date"
                  value={formData.review_date}
                  onChange={(e) => setFormData({...formData, review_date: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">Orden de visualización</label>
                <input
                  type="number"
                  value={formData.display_order}
                  onChange={(e) => setFormData({...formData, display_order: parseInt(e.target.value)})}
                  className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="is_active"
                checked={formData.is_active}
                onChange={(e) => setFormData({...formData, is_active: e.target.checked})}
                className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="is_active" className="text-sm font-medium text-slate-700 dark:text-slate-300">Mostrar en landing</label>
            </div>
            <div className="flex gap-2 justify-end pt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancelar
              </Button>
              <Button type="submit">
                Guardar
              </Button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
