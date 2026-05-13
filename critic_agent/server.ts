import * as ADK from '@google/adk';
import { criticAgent } from './agent.js';

// Forzamos la creación usando el nombre que aparecía en tus otros proyectos
// pero usando el acceso directo al módulo para evitar el error de "no exported member"
const ServerClass = (ADK as any).AgentServer || (ADK as any).HttpServer || (ADK as any).AgentRuntime;

if (ServerClass) {
    const server = new ServerClass(criticAgent, { port: 8002 });
    server.start();
    console.log('👿 Servidor iniciado en el puerto 8002');
} else {
    console.error('No se encontró una clase de servidor válida en @google/adk');
}