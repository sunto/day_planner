import tailwindcss from "@tailwindcss/vite"
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from "node:url"
import { defineConfig } from 'vite'
import RubyPlugin from 'vite-plugin-ruby'

export default defineConfig({
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./app/frontend", import.meta.url)),
    },
  },
  plugins: [
    react(),
    tailwindcss(),
    RubyPlugin(),
  ],
})
