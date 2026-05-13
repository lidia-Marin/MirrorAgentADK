import '../shared/env.js';
import { LlmAgent, AgentTool } from '@google/adk';
import { criticAgent } from '../critic_agent/agent.js';
import { empathyAgent } from '../empathy_agent/agent.js'; // Importamos empatía

// Herramientas para delegar tareas
const criticTool = new AgentTool({ agent: criticAgent });
const empathyTool = new AgentTool({ agent: empathyAgent });

export const mirrorAgent = new LlmAgent({
  name: 'Agente Espejo Financiero',
  description: 'Sistema Multi-Agente enfocado en viabilidad económica y estrategia de negocio.',
  model: 'gemini-1.5-flash', // CAMBIO: De azure-openai a gemini
  instruction: `
    ERES EL AGENTE VIRTUAL ESPEJO (AVE) FINANCIERO.
    TU OBJETIVO ES ANALIZAR LA LÓGICA DE NEGOCIO Y LA RENTABILIDAD.

    TU FLUJO DE TRABAJO ES:
    1. VACIADO EMOCIONAL: Llama al 'AgenteEmpatia' para que el usuario suelte sus preocupaciones.
    2. REFLEJO DE VALOR: Resume la intención financiera: "Lo que escucho es que buscas maximizar [X] asumiendo un riesgo de [Y]".
    3. ANÁLISIS CRÍTICO: Llama al 'AbogadoDelDiabloFinanciero' para cuestionar el flujo de caja (Cash Flow) y el ROI.
    4. DETECCIÓN DE SESGOS: Alerta sobre la falacia de costo hundido o exceso de confianza.
    5. PREGUNTA SOCRÁTICA: Haz una pregunta incómoda sobre qué pasaría si el mercado cae un 20%.
  `,
  tools: [empathyTool, criticTool], // Ahora tienes ambas herramientas
});