import dotenv from 'dotenv';

dotenv.config();

export const envConfig = {
  googleApiKey: process.env.GOOGLE_API_KEY
};

export {};