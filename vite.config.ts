import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import envCompatible from 'vite-plugin-env-compatible';
import dotenv from 'dotenv';

dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  envPrefix: "VITE_",
  plugins: [
    envCompatible(),
    react(),
  ],
  define:{
    'process.env.VITE_GEMINI_PRO_API_KEY': JSON.stringify(process.env.VITE_GEMINI_PRO_API_KEY)
  }
})
