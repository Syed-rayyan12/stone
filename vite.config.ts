import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig(() => {
  return {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'index.html'),
          about: path.resolve(__dirname, 'about.html'),
          services: path.resolve(__dirname, 'services.html'),
          dementia_home_prep: path.resolve(__dirname, 'dementia-home-prep.html'),
          house_clearance: path.resolve(__dirname, 'house-clearance.html'),
          pricing: path.resolve(__dirname, 'pricing.html'),
          referrals: path.resolve(__dirname, 'referrals.html'),
          contact: path.resolve(__dirname, 'contact.html'),
        },
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
