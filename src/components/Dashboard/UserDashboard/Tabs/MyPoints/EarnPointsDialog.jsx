import React from 'react';
import { Diamond, Star, CheckCircle2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription
} from "@/components/ui/dialog";

export default function EarnPointsDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="w-full flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/30 rounded-xl shadow-sm border border-green-200 dark:border-green-800 hover:bg-green-100 dark:hover:bg-green-900/50 transition min-h-[50px]">
          <span className="font-semibold text-sm text-green-700 dark:text-green-300">
            ¿Cómo ganar más?
          </span>
          <span className="text-green-600 dark:text-green-400">+</span>
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl">¿Cómo ganar más puntos?</DialogTitle>
          <DialogDescription>
            Sigue estos consejos para aumentar tus puntos y reputación en Parkeando.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl text-blue-600 dark:text-blue-400 shrink-0">
              <Diamond size={24} />
            </div>
            <div>
              <h4 className="font-semibold text-base text-slate-900 dark:text-white">Libera plazas</h4>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                Gana puntos cada vez que notifiques que dejas una plaza libre y otro usuario la ocupe.
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-4">
            <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-xl text-yellow-600 dark:text-yellow-400 shrink-0">
              <Star size={24} />
            </div>
            <div>
              <h4 className="font-semibold text-base text-slate-900 dark:text-white">Mantén buena reputación</h4>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                Recibe valoraciones positivas por información precisa y puntualidad.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-xl text-green-600 dark:text-green-400 shrink-0">
              <CheckCircle2 size={24} />
            </div>
            <div>
              <h4 className="font-semibold text-base text-slate-900 dark:text-white">Confirma ocupación</h4>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                Ayuda a la comunidad confirmando si una plaza sigue libre o ya se ocupó.
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
