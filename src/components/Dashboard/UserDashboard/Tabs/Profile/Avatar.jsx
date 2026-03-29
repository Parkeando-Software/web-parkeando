import React from 'react';

// Importar todos los avatares dinámicamente usando Vite's import.meta.glob
const avatarModules = import.meta.glob('@assets/avatars/avatar_*.png', { eager: true });

// Crear un mapa de avatares ordenado por número
const avatarMap = {};
const avatarKeys = Object.keys(avatarModules).sort((a, b) => {
  const numA = parseInt(a.match(/avatar_(\d+)\.png/)?.[1] || '0');
  const numB = parseInt(b.match(/avatar_(\d+)\.png/)?.[1] || '0');
  return numA - numB;
});

avatarKeys.forEach((key) => {
  const match = key.match(/avatar_(\d+)\.png/);
  if (match) {
    const avatarNumber = parseInt(match[1]);
    avatarMap[avatarNumber] = avatarModules[key].default;
  }
});

// Obtener el número total de avatares disponibles
export const TOTAL_AVATARS = Object.keys(avatarMap).length;

// Mapeo de tamaños
const sizeClasses = {
  sm: "w-8 h-8",   // 32x32px - Para Landing header
  md: "w-12 h-12", // 48x48px - Para DashboardHeader
  lg: "w-24 h-24", // 96x96px - Para DashboardMobileMenu y ProfileIdentity
};

export default function Avatar({ avatar = 0, size = "md", className = "" }) {
  // Asegurar que el avatar esté en el rango válido
  const maxAvatar = TOTAL_AVATARS - 1;
  const avatarNumber = Math.max(0, Math.min(maxAvatar, avatar ?? 0));
  
  // Obtener el avatar correspondiente (fallback a avatar 0 si no existe)
  const avatarSrc = avatarMap[avatarNumber] || avatarMap[0];
  
  // Obtener las clases de tamaño
  const sizeClass = sizeClasses[size] || sizeClasses.md;

  return (
    <div className={`${sizeClass} rounded-full overflow-hidden shrink-0 ${className}`}>
      <img 
        src={avatarSrc} 
        alt={`Avatar ${avatarNumber}`}
        className="w-full h-full object-contain"
      />
    </div>
  );
}
