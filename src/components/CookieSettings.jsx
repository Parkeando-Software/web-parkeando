import { useState, useEffect } from 'react';
import { useCookie } from '@/context/CookieContext';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const CookieSettings = () => {
  const { savePreferences, consent, settingsOpen, setSettingsOpen } = useCookie();
  const [preferences, setPreferences] = useState({
    essential: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    if (consent) {
      setPreferences({
        essential: true,
        analytics: consent.analytics,
        marketing: consent.marketing,
      });
    }
  }, [consent]);

  const handleSave = () => {
    savePreferences({
      ...preferences,
      timestamp: new Date().toISOString(),
    });
    setSettingsOpen(false);
  };

  return (
    <Dialog open={settingsOpen} onOpenChange={setSettingsOpen}>
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
        <DialogHeader className="p-6 pb-2">
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <span className="text-[#00B100]">Preferencias</span> de Cookies
          </DialogTitle>
          <DialogDescription className="text-gray-500 dark:text-gray-400">
            Personaliza tu experiencia de navegación.
          </DialogDescription>
        </DialogHeader>
        
        <div className="px-6 py-4 space-y-6">
          {/* Essential */}
          <div className="flex items-start justify-between p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800">
            <div className="space-y-1">
              <Label htmlFor="essential" className="text-base font-semibold flex items-center gap-2">
                Esenciales
                <span className="text-[10px] uppercase tracking-wider bg-gray-200 dark:bg-gray-700 px-2 py-0.5 rounded-full text-gray-600 dark:text-gray-300">Requerido</span>
              </Label>
              <p className="text-sm text-gray-500 dark:text-gray-400 max-w-[280px]">
                Necesarias para que el sitio funcione correctamente. No se pueden desactivar.
              </p>
            </div>
            <Switch id="essential" checked={true} disabled className="data-[state=checked]:bg-[#00B100]/50" />
          </div>

          {/* Analytics */}
          <div className="flex items-start justify-between p-4 rounded-xl border border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
            <div className="space-y-1">
              <Label htmlFor="analytics" className="text-base font-semibold">
                Analíticas
              </Label>
              <p className="text-sm text-gray-500 dark:text-gray-400 max-w-[280px]">
                Nos ayudan a mejorar nuestro sitio web entendiendo cómo lo usas.
              </p>
            </div>
            <Switch
              id="analytics"
              checked={preferences.analytics}
              onCheckedChange={(checked) =>
                setPreferences((prev) => ({ ...prev, analytics: checked }))
              }
              className="data-[state=checked]:bg-[#00B100]"
            />
          </div>

          {/* Marketing */}
          <div className="flex items-start justify-between p-4 rounded-xl border border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
            <div className="space-y-1">
              <Label htmlFor="marketing" className="text-base font-semibold">
                Marketing
              </Label>
              <p className="text-sm text-gray-500 dark:text-gray-400 max-w-[280px]">
                Permiten mostrarte publicidad personalizada según tus intereses.
              </p>
            </div>
            <Switch
              id="marketing"
              checked={preferences.marketing}
              onCheckedChange={(checked) =>
                setPreferences((prev) => ({ ...prev, marketing: checked }))
              }
              className="data-[state=checked]:bg-[#00B100]"
            />
          </div>
        </div>

        <DialogFooter className="p-6 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-100 dark:border-gray-800 gap-2">
          <Button 
            variant="outline" 
            onClick={() => setSettingsOpen(false)}
            className="border-gray-200 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-800"
          >
            Cancelar
          </Button>
          <Button 
            onClick={handleSave}
            className="bg-[#00B100] hover:bg-[#009000] text-white border-0"
          >
            Guardar preferencias
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CookieSettings;
