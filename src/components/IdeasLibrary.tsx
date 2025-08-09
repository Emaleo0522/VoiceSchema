import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Lightbulb, 
  Plus, 
  Search, 
  Mic, 
  Edit3, 
  Trash2, 
  Clock, 
  Tag,
  CheckCircle2,
  Circle,
  PlayCircle,
  Calendar
} from 'lucide-react';
import { useIdeas } from '../hooks/useIdeas';
import { IdeaItem } from '../types';

interface IdeasLibraryProps {
  onSelectIdea?: (idea: IdeaItem) => void;
  onStartRecording?: (ideaId?: string) => void;
}

export function IdeasLibrary({ onSelectIdea, onStartRecording }: IdeasLibraryProps) {
  const { 
    ideas, 
    createIdea, 
    updateIdea, 
    deleteIdea, 
    toggleIdeaCompletion,
    searchIdeas 
  } = useIdeas();

  const [searchQuery, setSearchQuery] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newIdeaTitle, setNewIdeaTitle] = useState('');
  const [editTitle, setEditTitle] = useState('');

  const filteredIdeas = searchQuery ? searchIdeas(searchQuery) : ideas;

  const handleCreateIdea = () => {
    if (newIdeaTitle.trim()) {
      const idea = createIdea(newIdeaTitle.trim());
      setNewIdeaTitle('');
      setIsCreating(false);
      onStartRecording?.(idea.id);
    }
  };

  const handleEditIdea = (id: string) => {
    const idea = ideas.find(i => i.id === id);
    if (idea) {
      setEditTitle(idea.title);
      setEditingId(id);
    }
  };

  const handleSaveEdit = () => {
    if (editingId && editTitle.trim()) {
      updateIdea(editingId, { title: editTitle.trim() });
      setEditingId(null);
      setEditTitle('');
    }
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) return 'Hoy';
    if (days === 1) return 'Ayer';
    if (days < 7) return `Hace ${days} días`;
    return date.toLocaleDateString('es-ES', { 
      day: 'numeric', 
      month: 'short' 
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-xl relative z-30"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-yellow-500 rounded-lg">
            <Lightbulb className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
              Biblioteca de Ideas
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {ideas.length} ideas guardadas
            </p>
          </div>
        </div>
        
        <motion.button
          onClick={() => setIsCreating(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 
                   text-white rounded-lg transition-colors text-sm font-medium"
        >
          <Plus className="w-4 h-4" />
          Nueva Idea
        </motion.button>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
        <input
          type="text"
          placeholder="Buscar ideas..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/20 rounded-lg
                   text-gray-800 dark:text-gray-200 placeholder-gray-500 text-sm
                   focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20"
        />
      </div>

      {/* Create New Idea Form */}
      <AnimatePresence>
        {isCreating && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-4 p-4 bg-white/5 rounded-lg border border-white/10 relative z-40"
          >
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Título de tu idea..."
                value={newIdeaTitle}
                onChange={(e) => setNewIdeaTitle(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleCreateIdea()}
                autoFocus
                className="flex-1 px-3 py-2 bg-white/5 border border-white/20 rounded-lg
                         text-gray-800 dark:text-gray-200 placeholder-gray-500 text-sm
                         focus:outline-none focus:border-blue-400"
              />
              <button
                onClick={handleCreateIdea}
                className="px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg
                         transition-colors text-sm"
              >
                Crear
              </button>
              <button
                onClick={() => setIsCreating(false)}
                className="px-3 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg
                         transition-colors text-sm"
              >
                Cancelar
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ideas List */}
      <div className="space-y-3 max-h-96 overflow-y-auto relative z-30">
        <AnimatePresence>
          {filteredIdeas.map((idea, index) => (
            <motion.div
              key={idea.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ delay: index * 0.1 }}
              className={`p-4 rounded-lg border transition-all cursor-pointer
                ${idea.isCompleted 
                  ? 'bg-green-50/10 border-green-200/20 opacity-75' 
                  : 'bg-white/5 border-white/10 hover:bg-white/10'
                }`}
              onClick={() => onSelectIdea?.(idea)}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 flex-1">
                  {/* Completion toggle */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleIdeaCompletion(idea.id);
                    }}
                    className="mt-1 text-gray-400 hover:text-blue-500 transition-colors"
                  >
                    {idea.isCompleted ? (
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                    ) : (
                      <Circle className="w-4 h-4" />
                    )}
                  </button>

                  <div className="flex-1 min-w-0">
                    {editingId === idea.id ? (
                      <div className="flex gap-2 mb-2">
                        <input
                          type="text"
                          value={editTitle}
                          onChange={(e) => setEditTitle(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && handleSaveEdit()}
                          onBlur={handleSaveEdit}
                          autoFocus
                          className="flex-1 px-2 py-1 bg-white/10 border border-white/20 rounded
                                   text-gray-800 dark:text-gray-200 text-sm"
                        />
                      </div>
                    ) : (
                      <h3 className={`font-medium text-gray-800 dark:text-gray-200 mb-1 truncate
                        ${idea.isCompleted ? 'line-through text-gray-500' : ''}`}>
                        {idea.title}
                      </h3>
                    )}
                    
                    {idea.description && (
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 truncate">
                        {idea.description}
                      </p>
                    )}

                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {formatDate(idea.createdAt)}
                      </div>
                      
                      {idea.transcriptSegments.length > 0 && (
                        <div className="flex items-center gap-1">
                          <Mic className="w-3 h-3" />
                          {idea.transcriptSegments.length} grabación(es)
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onStartRecording?.(idea.id);
                    }}
                    className="p-1 text-gray-400 hover:text-green-500 transition-colors"
                    title="Añadir grabación"
                  >
                    <Mic className="w-4 h-4" />
                  </button>
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditIdea(idea.id);
                    }}
                    className="p-1 text-gray-400 hover:text-blue-500 transition-colors"
                    title="Editar"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteIdea(idea.id);
                    }}
                    className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                    title="Eliminar"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {filteredIdeas.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            {searchQuery ? (
              <div>
                <Search className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No se encontraron ideas con "{searchQuery}"</p>
              </div>
            ) : (
              <div>
                <Lightbulb className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>Aún no tienes ideas guardadas</p>
                <p className="text-sm mt-1">Crea tu primera idea para comenzar</p>
              </div>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}