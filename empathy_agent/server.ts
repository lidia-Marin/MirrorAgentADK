import * as ADK from '@google/adk';
import { empathyAgent } from './agent.js';

// Usamos el acceso seguro que probamos antes por si hay dudas con el nombre de la clase
const ServerClass = (ADK as any).AgentServer || (ADK as any).HttpServer || (ADK as any).AgentRuntime;

if (ServerClass) {
    const server = new ServerClass(empathyAgent, { port: 8003 });
    server.start().then(() => {
        console.log('💖 Agente de Empatía (Gemini) listo en el puerto 8003');
    });
} else {
    console.error('No se pudo encontrar la clase de servidor en @google/adk');
}