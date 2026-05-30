import { Agent, InMemoryRunner, Gemini } from '@google/adk';
import express from 'express';
import 'dotenv/config';

// 1. Instanciamos el modelo usando la propiedad correcta
const geminiModel = new Gemini({
  model: 'gemini-2.5-flash',
  apiKey: process.env.GEMINI_API_KEY
});

// 2. Configuramos el agente usando 'model' e 'instruction'
const googleEmpathyAgent = new Agent({
  name: 'EmpathyAgent',
  description: 'Agente encargado de dar contención empática al emprendedor.',
  model: geminiModel,
  instruction: 'Escucha al emprendedor y valida sus emociones de forma empática.'
});

// 3. Servidor de comunicación
const app = express();
app.use(express.json());

app.post('/', async (req, res) => {
  try {
    const { message } = req.body;
    console.log(`[Empathy] Procesando mensaje con Google ADK...`);

    // Instanciamos el runner con el agente empático
    const runner = new InMemoryRunner({ agent: googleEmpathyAgent });
    
    // CORRECCIÓN: El método oficial del ADK para ejecutar es runTask
    const result = await (runner as any).runTask(message);

    const reply = result?.text || 'Entiendo perfectamente tu situación. Sigamos analizando.';
    res.json({ reply });
  } catch (error: any) {
    console.error('❌ Error en el nodo Empathy:', error.message);
    
    console.log('⚠️ Activando respuesta empática de contingencia local...');
    const respuestasLocales = [
      "¡Hola! Me alegra mucho que estés aquí. Como tu socio espejo, estoy completamente listo para escuchar tus ideas, entender tus desafíos y acompañarte con empatía en cada paso de tu camino emprendedor. Cuéntame, ¿qué tienes en mente hoy?",
      "Emprender es un viaje lleno de emociones y retos. Estoy aquí para darte el respaldo y la motivación que necesitas para estructurar tu negocio con confianza. ¡Hablemos de tu proyecto!"
    ];
    const replyFallback = respuestasLocales[Math.floor(Math.random() * respuestasLocales.length)];
    
    res.json({ reply: replyFallback });
  }
});

app.listen(8003, () => {
  console.log('💖 [Empathy Agent] Servidor ADK expuesto en el puerto 8003');
});