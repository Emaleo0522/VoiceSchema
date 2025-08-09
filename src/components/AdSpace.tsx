import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

export function AdSpace() {
  useEffect(() => {
    // Load Adsterra script if not already loaded
    const existingScript = document.querySelector('script[src*="profitableratecpm.com"]');
    if (!existingScript) {
      const script = document.createElement('script');
      script.async = true;
      script.setAttribute('data-cfasync', 'false');
      script.src = '//pl27377848.profitableratecpm.com/781f85236894765a79a75ac7e8950eca/invoke.js';
      document.head.appendChild(script);
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/20 shadow-lg
                 text-center overflow-hidden"
    >
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
          Patrocinado
        </h3>
        <div 
          id="container-781f85236894765a79a75ac7e8950eca"
          className="w-full min-h-[200px] flex items-center justify-center"
        >
          {/* Adsterra banner will load here */}
          <div className="text-gray-400 dark:text-gray-500 text-sm">
            Cargando anuncio...
          </div>
        </div>
      </div>
    </motion.div>
  );
}