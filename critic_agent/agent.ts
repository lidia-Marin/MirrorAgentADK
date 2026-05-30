import { askAI } from '../shared/ai.js';

export async function criticAgent(message: string) {
  const prompt = `
Eres un crítico financiero experto de MirrorAgent AI.
Analiza los riesgos financieros del siguiente negocio:

${message}

Nota: Tienes a tu disposición una herramienta para generar escenarios financieros (inversión y burn rate). Si el usuario proporciona estos datos numéricos, utilízalos para dar un diagnóstico exacto.
Sé directo y profesional.
`;

  return await askAI(prompt);
}