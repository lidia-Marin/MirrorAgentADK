import { LlmAgent } from '@google/adk';

export const empathyAgent = new LlmAgent({
  name: 'AgenteEmpatia',
  model: 'gemini-1.5-flash', 
  instruction: `
    Tu única misión es escuchar al emprendedor. 
    - Usa frases como "Te escucho", "Entiendo que esto es importante para ti".
    - No juzgues la idea todavía. 
    - Tu objetivo es que el usuario suelte todas sus preocupaciones (Vaciado).
  `
});