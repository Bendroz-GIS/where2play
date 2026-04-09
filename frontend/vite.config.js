import { defineConfig } from 'vite';
import path from 'path';
import { createHtmlPlugin } from 'vite-plugin-html';

export default defineConfig({
  root: path.resolve(__dirname, 'src'),
  envDir: path.resolve(__dirname),
  publicDir: path.resolve(__dirname, 'public'),
  plugins: [
    createHtmlPlugin({
      pages: [
        { filename: 'index.html', template: 'index.html' },
        { filename: 'login.html', template: 'login.html' },
        { filename: 'register.html', template: 'register.html' },
        { filename: 'dashboard.html', template: 'dashboard.html' },
      ],
    }),
  ],
  build: {
    outDir: path.resolve(__dirname, 'dist'), // Dossier en sortie
    emptyOutDir: true, // Supprime dist puis recrée
  },

  }
);