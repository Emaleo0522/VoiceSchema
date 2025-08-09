import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export function AdSpace() {
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [adLoaded, setAdLoaded] = useState(false);

  useEffect(() => {
    // Check if script is already in HTML
    const existingScript = document.querySelector('script[src*="profitableratecpm.com"]');
    
    if (existingScript) {
      setScriptLoaded(true);
      // Check for ad content periodically
      const checkAd = setInterval(() => {
        const adContainer = document.getElementById('container-781f85236894765a79a75ac7e8950eca');
        if (adContainer && adContainer.children.length > 0) {
          setAdLoaded(true);
          clearInterval(checkAd);
        }
      }, 1000);
      
      // Clear interval after 30 seconds
      setTimeout(() => clearInterval(checkAd), 30000);
      
      return () => clearInterval(checkAd);
    } else {
      // Fallback: Load script dynamically with error handling
      const script = document.createElement('script');
      script.async = true;
      script.setAttribute('data-cfasync', 'false');
      script.src = 'https://pl27377848.profitableratecpm.com/781f85236894765a79a75ac7e8950eca/invoke.js';
      
      script.onload = () => {
        setScriptLoaded(true);
        console.log('Adsterra script loaded successfully');
      };
      
      script.onerror = (error) => {
        console.error('Failed to load Adsterra script:', error);
        setScriptLoaded(false);
      };
      
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
          {!scriptLoaded && (
            <div className="text-red-400 dark:text-red-500 text-sm">
              Error cargando anuncio
            </div>
          )}
          {scriptLoaded && !adLoaded && (
            <div className="text-gray-400 dark:text-gray-500 text-sm animate-pulse">
              Cargando anuncio...
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}