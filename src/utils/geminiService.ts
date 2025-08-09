import { GoogleGenerativeAI } from '@google/generative-ai';
import { GeneratedSchema } from '../types';

export class GeminiService {
  private genAI: GoogleGenerativeAI | null = null;

  constructor(apiKey: string) {
    if (apiKey) {
      this.genAI = new GoogleGenerativeAI(apiKey);
    }
  }

  async generateSchema(transcriptText: string): Promise<GeneratedSchema> {
    if (!this.genAI) {
      throw new Error('API key no configurada');
    }

    const model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `
    Analiza el siguiente texto transcrito de una sesión de brainstorming para crear una aplicación o sitio web, y organiza las ideas en un esquema estructurado:

    TEXTO TRANSCRITO:
    "${transcriptText}"

    Por favor, genera una respuesta en formato JSON con la siguiente estructura:
    {
      "projectTitle": "Título sugerido para el proyecto",
      "description": "Descripción clara y concisa del proyecto",
      "sections": [
        {
          "title": "Funcionalidades Principales",
          "content": ["funcionalidad 1", "funcionalidad 2", "etc"],
          "priority": "high"
        },
        {
          "title": "Características de UI/UX",
          "content": ["característica 1", "característica 2", "etc"],
          "priority": "medium"
        },
        {
          "title": "Integraciones y APIs",
          "content": ["integración 1", "integración 2", "etc"],
          "priority": "medium"
        }
      ],
      "techStack": ["tecnología 1", "tecnología 2", "etc"],
      "finalPrompt": "Un prompt optimizado y detallado que se puede usar directamente con otra IA para crear la aplicación/sitio web. El prompt debe incluir todas las especificaciones técnicas, funcionalidades, diseño y requisitos identificados."
    }

    Asegúrate de:
    1. Identificar todas las funcionalidades mencionadas
    2. Organizar las ideas por prioridad y categoría
    3. Sugerir tecnologías apropiadas
    4. Crear un prompt final completo y detallado para desarrollo
    `;

    try {
      const result = await model.generateContent(prompt);
      const response = result.response.text();
      
      // Extraer JSON del response
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('No se pudo extraer JSON de la respuesta');
      }

      return JSON.parse(jsonMatch[0]);
    } catch (error) {
      console.error('Error al generar esquema:', error);
      throw new Error('Error al procesar la información con Gemini AI');
    }
  }
}