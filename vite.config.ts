import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    strictPort: true,
    hmr: {
      port: 5173,
    },
    allowedHosts: [
      '5173-idd8xpmqhm0azma6l5fb5-82af95f9.manusvm.computer',
      'localhost',
      '127.0.0.1',
      '5173-itqe5cv4kbszq6exkvowb-c4330291.manusvm.computer',
      '5173-ibydd7a6y0zlzkl00qegy-c4330291.manusvm.computer'
    ]
  }
});

