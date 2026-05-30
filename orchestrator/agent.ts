import axios from 'axios';

export async function mirrorAgent(message: string): Promise<string> {
  try {
    console.log('--- Orquestando llamada distribuida a Micro-Agentes ---');

    // 1. Consultamos al Agente Empático (Puerto 8003)
    const empathyResponse = await axios.post('http://localhost:8003', { message });
    
    // Desempaquetamos la respuesta del ADK de forma ultra-segura
    let empathy = '';
    if (empathyResponse.data && typeof empathyResponse.data === 'object') {
      empathy = empathyResponse.data.reply || empathyResponse.data.response || JSON.stringify(empathyResponse.data);
    } else {
      empathy = empathyResponse.data;
    }

    // 2. Consultamos al Agente Crítico (Puerto 8002)
    const criticResponse = await axios.post('http://localhost:8002', { message });
    
    // Desempaquetamos la respuesta del ADK de forma ultra-segura
    let critic = '';
    if (criticResponse.data && typeof criticResponse.data === 'object') {
      critic = criticResponse.data.reply || criticResponse.data.response || JSON.stringify(criticResponse.data);
    } else {
      critic = criticResponse.data;
    }

    // 3. Fusión cognitiva del Espejo
    return `
🧠 [Dimensión Empática]
${empathy}

👿 [Dimensión Crítica Financiera]
${critic}
`;

  } catch (error: any) {
    // Esto nos dirá exactamente en la consola qué puerto falló y por qué (ej. Connection Refused)
    console.error('❌ Error detallado de red interna:', error.message);
    if (error.response) {
      console.error('Respuesta del nodo dañado:', error.response.data);
    }
    throw new Error('El sistema distribuido de agentes no pudo completar el análisis.');
  }
}