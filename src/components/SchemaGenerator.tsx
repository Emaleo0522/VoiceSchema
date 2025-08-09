import React, { useState } from 'react';
import { Bot, Download, Copy, CheckCircle, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { GeneratedSchema, TranscriptSegment } from '../types';
import { GeminiService } from '../utils/geminiService';

interface SchemaGeneratorProps {
  transcriptSegments: TranscriptSegment[];
  apiKey: string;
}

export function SchemaGenerator({ transcriptSegments, apiKey }: SchemaGeneratorProps) {
  const [schema, setSchema] = useState<GeneratedSchema | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  const generateSchema = async () => {
    if (!apiKey) {
      setError('Por favor configura tu API key de Gemini');
      return;
    }

    if (transcriptSegments.length === 0) {
      setError('No hay transcripción disponible para procesar');
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      const fullTranscript = transcriptSegments.map(s => s.text).join(' ');
      const geminiService = new GeminiService(apiKey);
      const generatedSchema = await geminiService.generateSchema(fullTranscript);
      setSchema(generatedSchema);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Error desconocido');
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(type);
      setTimeout(() => setCopied(null), 2000);
    } catch (error) {
      console.error('Error al copiar:', error);
    }
  };

  const downloadSchema = () => {
    if (!schema) return;

    const content = `# ${schema.projectTitle}

## Descripción
${schema.description}

## Esquema de Funcionalidades

${schema.sections.map(section => `
### ${section.title} (Prioridad: ${section.priority})
${section.content.map(item => `- ${item}`).join('\n')}
`).join('\n')}

## Stack Tecnológico
${schema.techStack.map(tech => `- ${tech}`).join('\n')}

## Prompt Final para IA
${schema.finalPrompt}
`;

    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${schema.projectTitle.toLowerCase().replace(/\s+/g, '-')}-schema.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-500 bg-red-100 dark:bg-red-900/20';
      case 'medium': return 'text-yellow-500 bg-yellow-100 dark:bg-yellow-900/20';
      case 'low': return 'text-green-500 bg-green-100 dark:bg-green-900/20';
      default: return 'text-gray-500 bg-gray-100 dark:bg-gray-900/20';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-center">
        <motion.button
          onClick={generateSchema}
          disabled={isGenerating || !apiKey || transcriptSegments.length === 0}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center gap-3 px-4 sm:px-6 lg:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-500 to-purple-600
                   hover:from-blue-600 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500
                   text-white rounded-xl font-semibold shadow-lg hover:shadow-xl
                   transition-all duration-300 disabled:cursor-not-allowed"
        >
          <Bot className={`w-5 h-5 ${isGenerating ? 'animate-spin' : ''}`} />
          {isGenerating ? 'Generando Esquema...' : 'Generar Esquema con IA'}
        </motion.button>
      </div>

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4"
          >
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-red-500" />
              <p className="text-red-700 dark:text-red-400">{error}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {schema && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* Header del proyecto */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/20">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">
                    {schema.projectTitle}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    {schema.description}
                  </p>
                </div>
                <div className="flex gap-2 mt-4 sm:mt-0">
                  <motion.button
                    onClick={downloadSchema}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 bg-green-500 hover:bg-green-600 text-white rounded-lg
                             transition-colors shadow-md"
                  >
                    <Download className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>

              {/* Stack tecnológico */}
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {schema.techStack.map((tech, index) => (
                  <span
                    key={index}
                    className="px-2 sm:px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300
                             rounded-full text-xs sm:text-sm font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Secciones */}
            <div className="grid gap-4">
              {schema.sections.map((section, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/5 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/10"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-200">
                      {section.title}
                    </h3>
                    <span className={`px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs font-medium ${getPriorityColor(section.priority)}`}>
                      {section.priority}
                    </span>
                  </div>
                  <ul className="space-y-2">
                    {section.content.map((item, itemIndex) => (
                      <li
                        key={itemIndex}
                        className="flex items-start gap-2 text-gray-600 dark:text-gray-400"
                      >
                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>

            {/* Prompt final */}
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20
                          rounded-xl p-4 sm:p-6 border border-purple-200 dark:border-purple-800">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-200">
                  Prompt Optimizado para IA
                </h3>
                <motion.button
                  onClick={() => copyToClipboard(schema.finalPrompt, 'prompt')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-2 sm:px-3 py-1 bg-purple-500 hover:bg-purple-600
                           text-white rounded-lg transition-colors text-xs sm:text-sm"
                >
                  {copied === 'prompt' ? (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      Copiado
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Copiar
                    </>
                  )}
                </motion.button>
              </div>
              <div className="bg-white/20 rounded-lg p-4 max-h-64 overflow-y-auto">
                <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap text-sm leading-relaxed">
                  {schema.finalPrompt}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}