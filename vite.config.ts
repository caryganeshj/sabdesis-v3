import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // 'base' is often required for GitHub Pages if you are not deploying to a custom domain root.
  // It ensures assets are loaded relatively (e.g., ./asset.css) instead of absolutely (/asset.css).
  base: './', 
})