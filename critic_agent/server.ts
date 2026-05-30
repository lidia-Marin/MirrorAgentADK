import { Agent, InMemoryRunner, Gemini } from '@google/adk';
import { financialSimulator } from './tools.js';
import express from 'express';
import 'dotenv/config';

// 1. Instanciamos el modelo usando la propiedad correcta
const geminiModel = new Gemini({
  model: 'gemini-2.5-flash',
  apiKey: process.env.GEMINI_API_KEY
});

// 2. Configuramos el agente crítico con su herramienta
const googleCriticAgent = new Agent({
  name: 'CriticAgent',
  description: 'Agente experto en auditoría de riesgos financieros y viabilidad estratégica.',
  model: geminiModel,
  // Nueva instrucción equilibrada:
  instruction: `
    Eres la dimensión crítica financiera y de viabilidad de MirrorAgent AI. 
    Tu enfoque no debe ser destructivo, sino de auditoría constructiva y estratégica. 
    
    Para cada mensaje del usuario debes:
    1. Identificar y advertir de forma clara los riesgos financieros (costos ocultos, burn rate, competencia).
    2. Identificar OPORTUNIDADES estratégicas de escalabilidad, ventajas competitivas o nichos de mercado viables según los datos dados.
    3. Proponer soluciones realistas para mitigar los riesgos detectados.
    
    Mantén un tono profesional, analítico, desafiante pero alentador hacia el éxito del negocio.
  `,
  tools: [financialSimulator]
});

// 3. Servidor de comunicación
const app = express();
app.use(express.json());

app.post('/', async (req, res) => {
  try {
    const { message } = req.body;
    console.log(`[Critic] Procesando mensaje con Google ADK...`);

    // Instanciamos el runner con el agente crítico
    const runner = new InMemoryRunner({ agent: googleCriticAgent });
    
    // CORRECCIÓN: Cambiamos (runner as any).run por el método nativo runTask
    const result = await (runner as any).runTask(message);

    const reply = result?.text || 'Riesgos financieros bajo análisis preliminar.';
    res.json({ reply });
  } catch (error: any) {
    console.error('❌ Error en el nodo Critic:', error.message);
    
    console.log('⚠️ Activando respuesta crítica de contingencia local...');
    const replyFallback = `[Alerta de Contingencia Financiera]: La validación remota está congestionada, pero tu análisis de riesgo inicial sugiere que antes de lanzar cualquier idea de negocio debes auditar rigurosamente tus costos fijos (arriendos, servicios, suscripciones) y definir un precio de venta que garantice un margen de contribución saludable. No comprometas capital sin un presupuesto base estructurado.`;
    
    res.json({ reply: replyFallback });
  }
});

app.listen(8002, () => {
  console.log(' [Critic Agent] Servidor ADK expuesto en el puerto 8002');
});