import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Cargamos el archivo .env desde la raíz real
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const apiKey = process.env.GEMINI_API_KEY;

console.log("Configurando Conector Nativo de Google...");
console.log("Clave GEMINI_API_KEY detectada:", apiKey ? "SÍ (Cargada con éxito)" : "NO (Falta en el .env)");

if (!apiKey) {
  throw new Error("Error de infraestructura: La variable GEMINI_API_KEY no está configurada.");
}

// Inicializamos el cliente oficial de Google
const ai = new GoogleGenAI({ apiKey: apiKey });

export async function askAI(prompt: string): Promise<string> {
  try {
    // Usamos gemini-1.5-flash: ideal para la arquitectura multi-agente por su baja latencia
    const response = await ai.models.generateContent({
     model: 'gemini-2.5-flash', // Cambiamos a la versión estándar de producción global
    contents: prompt,
    });

    if (response && response.text) {
      return response.text;
    } else {
      throw new Error("Google Gemini retornó una respuesta vacía.");
    }

  } catch (error: any) {
    console.error("❌ Fallo crítico en el nodo nativo de Gemini:");
    console.error("Mensaje de error:", error.message);
    throw new Error(`Error en el procesamiento cognitivo de Google: ${error.message}`);
  }
}