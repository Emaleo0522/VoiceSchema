import React, { useState } from 'react';
import { HelpCircle, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function ApiKeyGuide() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-blue-50/50 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between w-full text-left"
      >
        <div className="flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-blue-500" />
          <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
            ¿Cómo obtener tu API Key de Gemini?
          </span>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-4 h-4 text-blue-500" />
        ) : (
          <ChevronDown className="w-4 h-4 text-blue-500" />
        )}
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden mt-4"
          >
            <div className="space-y-3 text-sm text-blue-700 dark:text-blue-300">
              <div className="flex items-start gap-2">
                <span className="w-5 h-5 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0 mt-0.5">
                  1
                </span>
                <div>
                  <p className="font-medium">Visita Google AI Studio</p>
                  <a
                    href="https://aistudio.google.com/app/apikey"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 transition-colors"
                  >
                    aistudio.google.com/app/apikey
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <span className="w-5 h-5 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0 mt-0.5">
                  2
                </span>
                <p>Inicia sesión con tu cuenta de Google</p>
              </div>

              <div className="flex items-start gap-2">
                <span className="w-5 h-5 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0 mt-0.5">
                  3
                </span>
                <p>Haz clic en "Create API Key" y selecciona tu proyecto</p>
              </div>

              <div className="flex items-start gap-2">
                <span className="w-5 h-5 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0 mt-0.5">
                  4
                </span>
                <p>Copia la API key generada y pégala en el campo de arriba</p>
              </div>

              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3 mt-4">
                <p className="text-xs text-yellow-700 dark:text-yellow-300">
                  <strong>Nota:</strong> La API de Gemini tiene un nivel gratuito generoso. 
                  Tu API key se guarda localmente en tu navegador y nunca se envía a nuestros servidores.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}