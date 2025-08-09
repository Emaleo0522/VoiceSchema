import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export function AdSpace() {
  const [adStatus, setAdStatus] = useState<'loading' | 'loaded' | 'error' | 'fallback'>('loading');
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 3;

  // Adsterra configuration - CORRECTED Zone ID from panel (FORCED REBUILD)
  const adConfig = {
    containerId: 'container-781f8523b894765a79a75ac7e8950eca',
    scriptUrls: [
      '//pl27377848.profitableratecpm.com/781f8523b894765a79a75ac7e8950eca/invoke.js',
      'https://pl27377848.profitableratecpm.com/781f8523b894765a79a75ac7e8950eca/invoke.js'
    ],
    buildTimestamp: '2025-08-09T01:04:00Z' // Force cache busting
  };

  const loadAdsterraScript = (url: string, attempt: number = 1): Promise<boolean> => {
    return new Promise((resolve) => {
      // Check if script already exists
      const existing = document.querySelector(`script[src="${url}"], script[src*="profitableratecpm.com"]`);
      if (existing) {
        console.log('Adsterra script already exists');
        resolve(true);
        return;
      }

      const script = document.createElement('script');
      script.async = true;
      script.setAttribute('data-cfasync', 'false');
      script.src = url;
      
      const timeout = setTimeout(() => {
        console.error(`Adsterra script timeout (attempt ${attempt})`);
        script.remove();
        resolve(false);
      }, 10000);

      script.onload = () => {
        clearTimeout(timeout);
        console.log(`Adsterra script loaded successfully (attempt ${attempt})`);
        resolve(true);
      };

      script.onerror = () => {
        clearTimeout(timeout);
        console.error(`Adsterra script failed to load (attempt ${attempt})`);
        script.remove();
        resolve(false);
      };

      document.head.appendChild(script);
    });
  };

  const tryLoadAd = async () => {
    setAdStatus('loading');
    console.log(`🔧 AdSpace component loaded with correct Zone ID: ${adConfig.containerId}`);
    console.log(`🚀 Build timestamp: ${adConfig.buildTimestamp}`);
    
    for (const url of adConfig.scriptUrls) {
      console.log(`Attempting to load Adsterra from: ${url}`);
      
      const success = await loadAdsterraScript(url, retryCount + 1);
      if (success) {
        setAdStatus('loaded');
        
        // Monitor for actual ad content
        const monitorAd = setInterval(() => {
          const container = document.getElementById(adConfig.containerId);
          if (container) {
            const hasRealContent = container.children.length > 0 && 
                                  !container.textContent?.includes('Cargando') &&
                                  !container.textContent?.includes('Error');
            
            if (hasRealContent) {
              console.log('Ad content detected!');
              clearInterval(monitorAd);
            }
          }
        }, 1000);
        
        // Clear monitor after 30 seconds
        setTimeout(() => clearInterval(monitorAd), 30000);
        return;
      }
    }

    // All URLs failed
    if (retryCount < maxRetries - 1) {
      setRetryCount(prev => prev + 1);
      setTimeout(() => tryLoadAd(), 5000); // Retry after 5 seconds
    } else {
      console.error('All Adsterra loading attempts failed');
      setAdStatus('error');
    }
  };

  const showFallbackAd = () => {
    setAdStatus('fallback');
  };

  useEffect(() => {
    // Initial load attempt
    tryLoadAd();

    // Cleanup function
    return () => {
      // Remove any pending timeouts or intervals
    };
  }, []);

  const getStatusMessage = () => {
    switch (adStatus) {
      case 'loading':
        return retryCount > 0 
          ? `Reintentando... (${retryCount + 1}/${maxRetries})`
          : 'Cargando anuncio...';
      case 'loaded':
        return 'Anuncio cargado';
      case 'error':
        return 'Error de conexión con Adsterra';
      case 'fallback':
        return 'Modo alternativo activo';
      default:
        return 'Inicializando...';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/20 shadow-lg
                 text-center overflow-hidden min-h-[280px]"
    >
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
            Espacio Publicitario
          </h3>
          {adStatus === 'error' && (
            <button
              onClick={showFallbackAd}
              className="text-xs bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded"
            >
              Activar alternativo
            </button>
          )}
        </div>
        
        <div 
          id={adConfig.containerId}
          className="w-full min-h-[200px] flex items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg"
          style={{ minHeight: '200px' }}
        >
          {adStatus === 'fallback' ? (
            <div className="text-center p-4">
              <div className="w-full h-32 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg flex items-center justify-center mb-3">
                <div className="text-center">
                  <div className="text-2xl mb-2">🚀</div>
                  <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    VoiceSchema
                  </div>
                  <div className="text-xs text-gray-500">
                    Tu asistente de IA para proyectos
                  </div>
                </div>
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Espacio disponible para publicidad
              </div>
            </div>
          ) : (
            <div className="text-center">
              <div className={`text-sm ${adStatus === 'error' ? 'text-red-400' : 'text-gray-400'} ${adStatus === 'loading' ? 'animate-pulse' : ''}`}>
                {getStatusMessage()}
              </div>
              {adStatus === 'loading' && (
                <div className="mt-2 w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
              )}
              {adStatus === 'error' && (
                <div className="mt-2 text-xs text-gray-500">
                  Verifique la conexión o configuración de Adsterra
                </div>
              )}
            </div>
          )}
        </div>
        
        <div className="text-xs text-gray-400 dark:text-gray-500">
          {adStatus === 'error' ? (
            <span>⚠️ Problema de conectividad detectado</span>
          ) : adStatus === 'fallback' ? (
            <span>💡 Contenido alternativo mostrado</span>
          ) : adStatus === 'loaded' ? (
            <span>✅ Sistema publicitario activo</span>
          ) : (
            <span>⏳ Conectando con servidor publicitario</span>
          )}
        </div>
      </div>
    </motion.div>
  );
}