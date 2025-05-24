import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc'; // ✅ you are using this

export default defineConfig({
  base: '/',
  plugins: [react()],
});
