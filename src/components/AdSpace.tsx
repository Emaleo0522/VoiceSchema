import React from 'react';
import { motion } from 'framer-motion';

export function AdSpace() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700
                 rounded-xl p-8 border-2 border-dashed border-gray-300 dark:border-gray-600
                 text-center"
    >
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-400">
          Espacio Publicitario
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-500">
          320x240 • Aquí puedes colocar tu anuncio
        </p>
        <div className="w-80 h-60 bg-gray-200 dark:bg-gray-700 rounded-lg mx-auto flex items-center justify-center">
          <span className="text-gray-400 dark:text-gray-500 text-sm">
            Tu anuncio aquí
          </span>
        </div>
      </div>
    </motion.div>
  );
}