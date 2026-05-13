import dotenv from 'dotenv';
// @ts-ignore
import { config } from '@google/adk';

dotenv.config();

// Configuramos el ADK para que sepa usar tus llaves de Azure
export const envConfig = {
  azureApiKey: process.env.AZURE_OPENAI_API_KEY,
  azureEndpoint: process.env.AZURE_OPENAI_ENDPOINT,
  azureDeployment: process.env.AZURE_OPENAI_DEPLOYMENT_NAME,
  googleApiKey: process.env.GOOGLE_API_KEY,
};

export {};