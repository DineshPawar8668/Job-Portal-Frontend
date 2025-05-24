import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// export default defineConfig({
//   base: '/',
//   plugins: [react()],
// });


export default defineConfig({
base: '/job-portal-frontend/',
plugins: [react()],
});
