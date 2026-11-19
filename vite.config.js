import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  // En GitHub Pages el sitio vive en /fs-2-Gas-El-Volcan/;
  // en el EC2 se sirve en la raíz, por eso se puede sobreescribir con VITE_BASE_PATH.
  base: process.env.VITE_BASE_PATH ?? (command === 'build' ? '/fs-2-Gas-El-Volcan/' : '/'),
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    tailwindcss(),
  ],
}))
