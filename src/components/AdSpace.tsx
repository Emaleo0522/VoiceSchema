import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export function AdSpace() {
  const [scriptStatus, setScriptStatus] = useState<'loading' | 'loaded' | 'error'>('loading');
  const [adVisible, setAdVisible] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    let intervalId: NodeJS.Timeout;

    // Check if script is already loaded
    const existingScript = document.querySelector('script[src*="profitableratecpm.com"]');
    
    if (existingScript) {
      setScriptStatus('loaded');
      
      // Monitor for ad content
      intervalId = setInterval(() => {
        const container = document.getElementById('container-781f85236894765a79a75ac7e8950eca');
        if (container) {
          const hasContent = container.children.length > 0 || 
                           container.innerHTML.trim().length > 0 ||
                           container.textContent?.trim() !== 'Cargando anuncio...';
          
          if (hasContent) {
            setAdVisible(true);
            clearInterval(intervalId);
          }
        }
      }, 1000);

      // Fallback timeout
      timeoutId = setTimeout(() => {
        if (!adVisible) {
          console.warn('Adsterra: Ad did not load within timeout period');
        }
        clearInterval(intervalId);
      }, 15000);
      
    } else {
      // Script not found - may indicate loading issue
      setScriptStatus('error');
      console.error('Adsterra script not found in DOM');
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      if (intervalId) clearInterval(intervalId);
    };
  }, [adVisible]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/20 shadow-lg
                 text-center overflow-hidden min-h-[250px]"
    >
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
          Patrocinado
        </h3>
        <div 
          id="container-781f85236894765a79a75ac7e8950eca"
          className="w-full min-h-[200px] flex items-center justify-center"
          style={{ minHeight: '200px' }}
        >
          {scriptStatus === 'error' && (
            <div className="text-red-400 dark:text-red-500 text-sm">
              Error: Script no encontrado
            </div>
          )}
          {scriptStatus === 'loaded' && !adVisible && (
            <div className="text-gray-400 dark:text-gray-500 text-sm animate-pulse">
              Cargando anuncio...
            </div>
          )}
          {scriptStatus === 'loading' && (
            <div className="text-gray-400 dark:text-gray-500 text-sm">
              Inicializando...
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}