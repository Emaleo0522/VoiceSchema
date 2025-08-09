import React, { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, Square, Play, Pause } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { TranscriptSegment } from '../types';

interface VoiceRecorderProps {
  onTranscriptChange: (segments: TranscriptSegment[]) => void;
  currentIdeaId?: string;
  initialSegments?: TranscriptSegment[];
  onSaveToIdea?: (ideaId: string, segments: TranscriptSegment[]) => void;
}

export function VoiceRecorder({ onTranscriptChange, currentIdeaId, initialSegments = [], onSaveToIdea }: VoiceRecorderProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [transcriptSegments, setTranscriptSegments] = useState<TranscriptSegment[]>(initialSegments);
  const [isSupported, setIsSupported] = useState(true);
  
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const segmentIdRef = useRef(0);

  useEffect(() => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      setIsSupported(false);
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'es-ES';
    recognition.maxAlternatives = 1;

    recognition.onresult = (event) => {
      let finalTranscript = '';
      
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        
        if (event.results[i].isFinal) {
          finalTranscript += transcript;
        }
      }

      if (finalTranscript) {
        const newSegment: TranscriptSegment = {
          id: `segment-${segmentIdRef.current++}`,
          text: finalTranscript.trim(),
          timestamp: Date.now(),
        };

        setTranscriptSegments(prev => {
          const updated = [...prev, newSegment];
          onTranscriptChange(updated);
          
          // Auto-save to idea if we're recording for a specific idea
          if (currentIdeaId && onSaveToIdea) {
            onSaveToIdea(currentIdeaId, updated);
          }
          
          return updated;
        });
      }
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      if (event.error === 'no-speech' || event.error === 'audio-capture') {
        // Reintentar automáticamente después de errores temporales
        if (isRecording) {
          setTimeout(() => {
            if (recognitionRef.current && isRecording) {
              try {
                recognitionRef.current.start();
              } catch (e) {
                console.log('Error al reintentar reconocimiento:', e);
              }
            }
          }, 1000);
        }
      }
    };

    recognition.onend = () => {
      // Auto-restart si aún estamos grabando (evita que se detenga automáticamente)
      if (isRecording) {
        setTimeout(() => {
          if (recognitionRef.current && isRecording) {
            try {
              recognitionRef.current.start();
            } catch (e) {
              console.log('Error al reiniciar reconocimiento:', e);
            }
          }
        }, 100);
      }
    };

    recognitionRef.current = recognition;

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [onTranscriptChange, isRecording]);

  const startRecording = () => {
    if (recognitionRef.current && !isRecording) {
      recognitionRef.current.start();
      setIsRecording(true);
    }
  };

  const stopRecording = () => {
    if (recognitionRef.current && isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
    }
  };

  const clearTranscript = () => {
    setTranscriptSegments([]);
    onTranscriptChange([]);
  };

  if (!isSupported) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4">
        <p className="text-red-700 dark:text-red-400 text-center">
          Tu navegador no soporta reconocimiento de voz. Prueba con Chrome o Safari.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <motion.button
          onClick={isRecording ? stopRecording : startRecording}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`relative p-4 sm:p-6 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl ${
            isRecording
              ? 'bg-red-500 hover:bg-red-600 text-white'
              : 'bg-blue-500 hover:bg-blue-600 text-white'
          }`}
        >
          <AnimatePresence mode="wait">
            {isRecording ? (
              <motion.div
                key="recording"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
              >
                <Square className="w-6 h-6" />
              </motion.div>
            ) : (
              <motion.div
                key="idle"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
              >
                <Mic className="w-6 h-6" />
              </motion.div>
            )}
          </AnimatePresence>

          {isRecording && (
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-red-400"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          )}
        </motion.button>

        <div className="flex gap-2">
          {transcriptSegments.length > 0 && (
            <motion.button
              onClick={clearTranscript}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-3 sm:px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg
                       transition-all duration-200 text-xs sm:text-sm font-medium"
            >
              Limpiar
            </motion.button>
          )}
          
          {currentIdeaId && transcriptSegments.length > 0 && onSaveToIdea && (
            <motion.button
              onClick={() => onSaveToIdea(currentIdeaId, transcriptSegments)}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-3 sm:px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg
                       transition-all duration-200 text-xs sm:text-sm font-medium"
            >
              💾 Guardar en idea
            </motion.button>
          )}
        </div>
      </div>

      <div className="text-center">
        <span className={`text-sm font-medium ${
          isRecording ? 'text-red-500' : 'text-gray-500'
        }`}>
          {isRecording ? 'Grabando... Habla ahora' : currentIdeaId ? 'Añadir a idea existente' : 'Presiona para grabar'}
        </span>
      </div>

      <AnimatePresence>
        {transcriptSegments.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 max-h-64 overflow-y-auto"
          >
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              Transcripción:
            </h3>
            <div className="space-y-2">
              {transcriptSegments.map((segment) => (
                <motion.div
                  key={segment.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-sm text-gray-600 dark:text-gray-400 p-2 bg-white/5 rounded-lg"
                >
                  {segment.text}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}