import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// relative base + hash routing = works on GitHub Pages from any repo path
export default defineConfig({
  plugins: [react()],
  base: './',
})
