import React, { useState, useEffect } from 'react';
import { Send, X, Search } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@components/ui/dialog';
import { Button } from '@components/ui/button';
import { Input } from '@components/ui/input';
import { Label } from '@components/ui/label';
import { Textarea } from '@components/ui/textarea';
import adminUserService from '@services/adminUserService';
import adminEmailService from '@services/adminEmailService';
import { useSwal } from '@hooks/useSwal';

export default function SendEmailModal({ isOpen, onClose, onSuccess }) {
  const swal = useSwal();
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searching, setSearching] = useState(false);
  
  const [formData, setFormData] = useState({
    user_id: '',
    subject: '',
    message: ''
  });

  // Search users for autocomplete
  useEffect(() => {
    const searchUsers = async () => {
      if (!searchTerm || searchTerm.length < 2) return;
      
      setSearching(true);
      try {
        const response = await adminUserService.getUsers({ search: searchTerm, per_page: 5 });
        setUsers(response.data);
      } catch (error) {
        console.error('Error searching users:', error);
      } finally {
        setSearching(false);
      }
    };

    const timer = setTimeout(searchUsers, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.user_id) {
      swal.fire({ title: 'Error', text: 'Debes seleccionar un usuario destinatario', icon: 'error' });
      return;
    }

    setLoading(true);
    try {
      await adminEmailService.sendEmail(formData);
      
      swal.fire({
        title: 'Email Enviado',
        text: 'El correo ha sido enviado exitosamente',
        icon: 'success',
        timer: 2000
      });
      
      onSuccess();
      onClose();
      setFormData({ user_id: '', subject: '', message: '' });
      setSearchTerm('');
    } catch (error) {
      swal.fire({
        title: 'Error',
        text: error.response?.data?.message || 'Error al enviar el email',
        icon: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const selectUser = (user) => {
    setFormData({ ...formData, user_id: user.id });
    setSearchTerm(`${user.name || user.username} (${user.email})`);
    setUsers([]); // Hide dropdown
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Send className="w-5 h-5 text-blue-500" />
            Enviar Email
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2 relative">
            <Label htmlFor="user">Destinatario</Label>
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <Input
                id="user"
                placeholder="Buscar usuario por nombre o email..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  if (formData.user_id) setFormData({ ...formData, user_id: '' }); // Reset selection on edit
                }}
                className="pl-10"
                autoComplete="off"
              />
            </div>
            
            {/* User Dropdown */}
            {users.length > 0 && !formData.user_id && (
              <div className="absolute z-10 w-full bg-white dark:bg-slate-800 border border-border rounded-md shadow-lg mt-1 max-h-48 overflow-y-auto">
                {users.map(user => (
                  <div
                    key={user.id}
                    className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer text-sm"
                    onClick={() => selectUser(user)}
                  >
                    <div className="font-medium">{user.name || user.username}</div>
                    <div className="text-xs text-muted-foreground">{user.email}</div>
                  </div>
                ))}
              </div>
            )}
            {searching && <div className="text-xs text-muted-foreground">Buscando...</div>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject">Asunto</Label>
            <Input
              id="subject"
              placeholder="Asunto del correo"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Mensaje</Label>
            <Textarea
              id="message"
              placeholder="Escribe tu mensaje aquí..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="min-h-[150px]"
              required
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" disabled={loading || !formData.user_id}>
              {loading ? 'Enviando...' : 'Enviar Email'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
