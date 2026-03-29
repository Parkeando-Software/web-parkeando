import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Power, Search, User, MapPin, Users as UsersIcon } from 'lucide-react';
import logo from '@assets/logo.png';
import { ThemeToggle } from '@components/Landing/ThemeToggle';
import { useAuth } from '@context/AuthContext';
import api from '@/config/api';
import apiRoutes from '@/config/apiRoutes';
import { Input } from '@components/ui/input';
import AdminMobileMenu from './AdminMobileMenu';
import * as adminUserService from '@services/adminUserService';
import * as adminParkingService from '@services/adminParkingService';

// IMPORTAR EL COMPONENTE AVATAR
import Avatar from '@components/Dashboard/UserDashboard/Tabs/Profile/Avatar'; 

export default function AdminDashboardHeader({ activeSection, onSectionChange }) {

  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState({ users: [], parkings: [] });
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const searchRef = useRef(null);

  // Variables Dinámicas del Usuario
  const userName = user?.username || 'Administrador';
  const userEmail = user?.email || 'admin@parkeando.com';

  const handleLogout = async () => {
    setIsDropdownOpen(false);

    try {
      await api.post(apiRoutes.logout());
    } catch (error) {
      console.error('Error al cerrar sesión en el servidor:', error);
    } finally {
      logout();
      navigate('/login');
    }
  };

  // Search functionality with debouncing
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (searchQuery.trim().length >= 2) {
        setSearchLoading(true);
        try {
          const [usersRes, parkingsRes] = await Promise.all([
            adminUserService.getUsers({ 
              search: searchQuery, 
              per_page: 5 
            }),
            adminParkingService.getParkings({ 
              search_user: searchQuery, 
              per_page: 5 
            }),
          ]);

          setSearchResults({
            users: usersRes.data || [],
            parkings: parkingsRes.data || [],
          });
          setShowSearchResults(true);
        } catch (error) {
          console.error('Error searching:', error);
        } finally {
          setSearchLoading(false);
        }
      } else {
        setSearchResults({ users: [], parkings: [] });
        setShowSearchResults(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSearchResults(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchResultClick = (type, id) => {
    if (type === 'user') {
      onSectionChange('usuarios');
    } else if (type === 'parking') {
      onSectionChange('parkings');
    }
    setSearchQuery('');
    setShowSearchResults(false);
  };

  return (
    <>
      <header className="fixed w-full z-50 bg-white dark:bg-slate-900 border-b border-border shadow-sm">
        <div className="h-20 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Link to="/">
              <img src={logo} alt="Logo" className="w-12 h-12 hover:opacity-80 transition-opacity" />
            </Link>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-foreground">Admin Panel</h1>
              <p className="text-xs text-muted-foreground">Parkeando Dashboard</p>
            </div>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-md mx-8" ref={searchRef}>
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Buscar usuarios, parkings..."
                className="pl-10 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              
              {/* Search Results Dropdown */}
              <AnimatePresence>
                {showSearchResults && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full mt-2 w-full bg-card rounded-xl shadow-lg border border-border overflow-hidden max-h-96 overflow-y-auto z-50"
                  >
                    {searchLoading ? (
                      <div className="p-4 text-center text-muted-foreground">
                        Buscando...
                      </div>
                    ) : (
                      <>
                        {/* Users Results */}
                        {searchResults.users.length > 0 && (
                          <div>
                            <div className="px-4 py-2 bg-muted/50 text-xs font-semibold text-muted-foreground">
                              USUARIOS
                            </div>
                            {searchResults.users.map((user) => (
                              <button
                                key={`user-${user.id}`}
                                onClick={() => handleSearchResultClick('user', user.id)}
                                className="w-full px-4 py-3 hover:bg-accent transition-colors flex items-center gap-3 text-left"
                              >
                                <UsersIcon className="w-4 h-4 text-blue-500" />
                                <div className="flex-1">
                                  <p className="text-sm font-medium">{user.username}</p>
                                  <p className="text-xs text-muted-foreground">{user.email}</p>
                                </div>
                              </button>
                            ))}
                          </div>
                        )}

                        {/* Parkings Results */}
                        {searchResults.parkings.length > 0 && (
                          <div>
                            <div className="px-4 py-2 bg-muted/50 text-xs font-semibold text-muted-foreground">
                              PARKINGS
                            </div>
                            {searchResults.parkings.map((parking) => (
                              <button
                                key={`parking-${parking.id}`}
                                onClick={() => handleSearchResultClick('parking', parking.id)}
                                className="w-full px-4 py-3 hover:bg-accent transition-colors flex items-center gap-3 text-left"
                              >
                                <MapPin className="w-4 h-4 text-green-500" />
                                <div className="flex-1">
                                  <p className="text-sm font-medium">{parking.user?.username || 'N/A'}</p>
                                  <p className="text-xs text-muted-foreground">
                                    {parking.latitude?.toFixed(6)}, {parking.longitude?.toFixed(6)}
                                  </p>
                                </div>
                              </button>
                            ))}
                          </div>
                        )}

                        {/* No Results */}
                        {searchResults.users.length === 0 && searchResults.parkings.length === 0 && (
                          <div className="p-4 text-center text-muted-foreground text-sm">
                            No se encontraron resultados
                          </div>
                        )}
                      </>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <ThemeToggle />

            {/* Admin Avatar Dropdown */}
            <div ref={dropdownRef} className="relative hidden lg:block">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 p-2 hover:bg-accent rounded-lg transition-colors"
                aria-label="Menú de administrador"
              >
                <Avatar avatar={user?.avatar ?? 0} size="md" />
                <span className="text-sm font-medium hidden xl:block">{userName}</span>
              </button>

              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-2 w-48 bg-card rounded-xl shadow-lg border border-border overflow-hidden"
                >
                  {/* Información dinámica del usuario */}
                  <div className="p-3 border-b border-border">
                    <p className="text-sm font-medium">{userName}</p>
                    <p className="text-xs text-muted-foreground">{userEmail}</p>
                  </div>

                  {/* Enlace al panel de usuario */}
                  <Link
                    to="/user"
                    onClick={() => setIsDropdownOpen(false)}
                    className="flex items-center w-full px-4 py-2 hover:bg-accent transition-colors"
                  >
                    <User className="mr-2 w-4 h-4 text-blue-500" />
                    <span className="text-sm">Panel Usuario</span>
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-2 hover:bg-accent transition-colors text-red-500"
                  >
                    <Power className="mr-2 w-4 h-4" />
                    <span className="text-sm">Cerrar sesión</span>
                  </button>
                </motion.div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 hover:bg-accent rounded-lg transition-colors"
              aria-label="Abrir menú móvil"
            >
              <Avatar avatar={user?.avatar ?? 0} size="sm" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AdminMobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        activeSection={activeSection}
        onSectionChange={onSectionChange}
        user={user}
      />
    </>
  );
}