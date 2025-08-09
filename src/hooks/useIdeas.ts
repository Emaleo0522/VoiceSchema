import { useState, useEffect } from 'react';
import { IdeaItem, TranscriptSegment } from '../types';
import { useLocalStorage } from './useLocalStorage';

export function useIdeas() {
  const [ideas, setIdeas] = useLocalStorage<IdeaItem[]>('ideas-library', []);

  const createIdea = (title: string, description?: string, transcriptSegments: TranscriptSegment[] = []): IdeaItem => {
    const newIdea: IdeaItem = {
      id: crypto.randomUUID(),
      title,
      description: description || '',
      transcriptSegments,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      tags: [],
      isCompleted: false,
    };

    setIdeas(prev => [newIdea, ...prev]);
    return newIdea;
  };

  const updateIdea = (id: string, updates: Partial<Omit<IdeaItem, 'id' | 'createdAt'>>) => {
    setIdeas(prev => prev.map(idea => 
      idea.id === id 
        ? { ...idea, ...updates, updatedAt: Date.now() }
        : idea
    ));
  };

  const deleteIdea = (id: string) => {
    setIdeas(prev => prev.filter(idea => idea.id !== id));
  };

  const addTranscriptToIdea = (id: string, segments: TranscriptSegment[]) => {
    updateIdea(id, {
      transcriptSegments: [...(ideas.find(i => i.id === id)?.transcriptSegments || []), ...segments]
    });
  };

  const toggleIdeaCompletion = (id: string) => {
    const idea = ideas.find(i => i.id === id);
    if (idea) {
      updateIdea(id, { isCompleted: !idea.isCompleted });
    }
  };

  const addTagToIdea = (id: string, tag: string) => {
    const idea = ideas.find(i => i.id === id);
    if (idea && !idea.tags.includes(tag)) {
      updateIdea(id, { tags: [...idea.tags, tag] });
    }
  };

  const removeTagFromIdea = (id: string, tag: string) => {
    const idea = ideas.find(i => i.id === id);
    if (idea) {
      updateIdea(id, { tags: idea.tags.filter(t => t !== tag) });
    }
  };

  const getIdeasByTag = (tag: string) => {
    return ideas.filter(idea => idea.tags.includes(tag));
  };

  const searchIdeas = (query: string) => {
    const lowercaseQuery = query.toLowerCase();
    return ideas.filter(idea => 
      idea.title.toLowerCase().includes(lowercaseQuery) ||
      idea.description.toLowerCase().includes(lowercaseQuery) ||
      idea.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    );
  };

  return {
    ideas,
    createIdea,
    updateIdea,
    deleteIdea,
    addTranscriptToIdea,
    toggleIdeaCompletion,
    addTagToIdea,
    removeTagFromIdea,
    getIdeasByTag,
    searchIdeas,
  };
}