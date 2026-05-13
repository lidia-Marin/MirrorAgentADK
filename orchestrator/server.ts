import express from 'express';
import { mirrorAgent } from './agent.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

app.post('/chat', async (req, res) => {
  try {
    const { message } = req.body;

    // Llamada al agente usando la interfaz de Gemini en el ADK
    const response = await (mirrorAgent as any).sendMessage({
      role: 'user',
      parts: [{ kind: 'text', text: message }]
    });

    // Manejo flexible de la respuesta según la versión del SDK
    const replyText = response?.message?.parts?.[0]?.text || 
                      response?.output?.parts?.[0]?.text || 
                      "El agente procesó la idea pero no generó texto.";

    res.json({ reply: replyText });
  } catch (error) {
    console.error("Error en el Orquestador Espejo:", error);
    res.status(500).json({ error: "Error interno del servidor al procesar con Gemini" });
  }
});

const PORT = 8001;
app.listen(PORT, () => {
  console.log(`🚀 Orquestador Espejo (Gemini) Activo en puerto ${PORT}`);
});