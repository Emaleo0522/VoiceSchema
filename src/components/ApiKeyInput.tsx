import React, { useState } from 'react';
import { Key, Eye, EyeOff, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ApiKeyGuide } from './ApiKeyGuide';

interface ApiKeyInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function ApiKeyInput({ value, onChange }: ApiKeyInputProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Key className="w-4 h-4 text-blue-400" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            API Key de Gemini
          </span>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-xs text-blue-500 hover:text-blue-400 transition-colors"
        >
          {isExpanded ? 'Ocultar' : 'Configurar'}
        </button>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="relative">
              <input
                type={isVisible ? 'text' : 'password'}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Ingresa tu API key de Gemini..."
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg
                         text-sm text-gray-700 dark:text-gray-300 placeholder-gray-500
                         focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20
                         transition-all duration-200"
              />
              <button
                onClick={() => setIsVisible(!isVisible)}
                className="absolute right-2 top-2 p-1 hover:bg-white/10 rounded transition-colors"
              >
                {isVisible ? (
                  <EyeOff className="w-4 h-4 text-gray-500" />
                ) : (
                  <Eye className="w-4 h-4 text-gray-500" />
                )}
              </button>
            </div>
            {value && (
              <div className="flex items-center gap-1 mt-2 text-xs text-green-500">
                <Check className="w-3 h-3" />
                <span>API key configurada</span>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-4">
        <ApiKeyGuide />
      </div>
    </motion.div>
  );
}