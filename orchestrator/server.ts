import express from 'express';
import cors from 'cors';
import { mirrorAgent } from './agent.js'; // Importamos el consolidador

const app = express();

app.use(cors());
app.use(express.json());

// Esta es la ruta exacta que tu frontend en Angular consumirá (Puerto 8001)
app.post('/chat', async (req, res) => {
  try {
    const { message } = req.body;
    console.log('📬 Petición entrante de la UI en Angular:', message);

    if (!message) {
       res.status(400).json({ reply: 'El mensaje no puede estar vacío.' });
       return;
    }

    // Ejecutamos la orquestación distribuida
    const finalResponse = await mirrorAgent(message);

    res.json({
      reply: finalResponse
    });

  } catch (error: any) {
    console.error('❌ Fallo en el endpoint /chat del Orquestador:', error.message);
    res.status(500).json({
      reply: 'Disculpas, MirrorAgent experimenta una desconexión temporal en sus nodos de IA.'
    });
  }
});

app.listen(8001, () => {
  console.log('🚀 [Orchestrator] Ecosistema Multiagente escuchando en el puerto 8001');
});