import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Zap } from 'lucide-react';
import { VoiceRecorder } from './components/VoiceRecorder';
import { SchemaGenerator } from './components/SchemaGenerator';
import { ThemeToggle } from './components/ThemeToggle';
import { ApiKeyInput } from './components/ApiKeyInput';
import { AdSpace } from './components/AdSpace';
import { useTheme } from './hooks/useTheme';
import { useLocalStorage } from './hooks/useLocalStorage';
import { TranscriptSegment } from './types';

function App() {
  const { theme, toggleTheme } = useTheme();
  const [apiKey, setApiKey] = useLocalStorage<string>('gemini-api-key', '');
  const [transcriptSegments, setTranscriptSegments] = useState<TranscriptSegment[]>([]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 
                    dark:from-gray-900 dark:via-gray-800 dark:to-purple-900 transition-colors duration-500">
      {/* Efectos de fondo 3D */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl"
        />
      </div>

      {/* Header */}
      <header className="relative z-10 p-4 sm:p-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <div className="relative">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl
                         flex items-center justify-center shadow-lg"
              >
                <Sparkles className="w-5 h-5 text-white" />
              </motion.div>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-xl opacity-20"
              />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 
                           bg-clip-text text-transparent">
                VoiceSchema
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                De voz a esquema con IA
              </p>
            </div>
          </motion.div>
          
          <ThemeToggle theme={theme} onToggle={toggleTheme} />
        </div>
      </header>

      {/* Main content */}
      <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Columna principal */}
          <div className="lg:col-span-2 space-y-6 lg:space-y-8">
            {/* API Key Configuration */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <ApiKeyInput value={apiKey} onChange={setApiKey} />
            </motion.section>

            {/* Voice Recorder */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 sm:p-6 lg:p-8 border border-white/30 shadow-xl"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-red-500 rounded-lg">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-200">
                  Grabación de Voz
                </h2>
              </div>
              <VoiceRecorder onTranscriptChange={setTranscriptSegments} />
            </motion.section>

            {/* Schema Generator */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 sm:p-6 lg:p-8 border border-white/30 shadow-xl"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-blue-500 rounded-lg">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-200">
                  Generador de Esquemas
                </h2>
              </div>
              <SchemaGenerator
                transcriptSegments={transcriptSegments}
                apiKey={apiKey}
              />
            </motion.section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6 lg:space-y-8">
            {/* Ad Space */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <AdSpace />
            </motion.section>

            {/* Info Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-white/30 shadow-xl"
            >
              <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
                ¿Cómo funciona?
              </h3>
              <div className="space-y-4 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-semibold">
                    1
                  </span>
                  <p>Configura tu API key de Gemini AI</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-semibold">
                    2
                  </span>
                  <p>Graba tu voz describiendo tu idea de app/web</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-semibold">
                    3
                  </span>
                  <p>La IA organiza tus ideas en un esquema estructurado</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-semibold">
                    4
                  </span>
                  <p>Obtén un prompt optimizado para crear tu proyecto</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 text-center py-6 text-sm text-gray-500 dark:text-gray-400">
        <p>VoiceSchema • Transforma tus ideas en esquemas estructurados con IA</p>
      </footer>
    </div>
  );
}

export default App;