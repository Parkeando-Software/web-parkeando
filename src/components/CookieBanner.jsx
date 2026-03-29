import { useState } from 'react';
import { useCookie } from '@/context/CookieContext';
import { Button } from '@/components/ui/button';

import { Cookie } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CookieBanner = () => {
  const { isOpen, acceptAll, rejectAll, setSettingsOpen } = useCookie();

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-[400px] z-50"
        >
          <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md border border-gray-200 dark:border-gray-800 shadow-2xl rounded-2xl p-6">
            <div className="flex items-start gap-4 mb-4">
              <div className="p-2 bg-[#0083E6] dark:bg-[#0083E6]/30 rounded-xl text-slate-200">
                <Cookie className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                  Cookies
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  Usamos cookies para mejorar tu experiencia. Al continuar, aceptas nuestra política de privacidad.
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <Button 
                variant="outline" 
                onClick={() => setSettingsOpen(true)}
                className="w-full border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                Configurar
              </Button>
              <Button 
                onClick={acceptAll}
                className="w-full bg-[#0083E6] hover:bg-[#005ba1] text-white border-0"
              >
                Aceptar
              </Button>
            </div>
            <button 
              onClick={rejectAll}
              className="w-full mt-3 text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 underline transition-colors"
            >
              Rechazar todo
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieBanner;
