import '../shared/env.js';
import { LlmAgent } from '@google/adk';
import { financialSimulator } from './tools.js'; // Asegúrate de que el archivo exista
import { readFileSync } from 'fs';

// Esta sintaxis requiere que el tsconfig esté en NodeNext
const templates = JSON.parse(
    readFileSync(new URL('../data/templates.json', import.meta.url), 'utf-8')
);

export const criticAgent = new LlmAgent({
    name: 'AbogadoDelDiabloFinanciero',
    model: 'gemini-1.5-flash',
    description: 'Agente crítico de viabilidad económica.',
    instruction: `Eres un auditor financiero. Criterio: ${templates.financial_check}`,
    tools: [financialSimulator],
});