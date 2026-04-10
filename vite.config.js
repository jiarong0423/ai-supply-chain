import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ⚠️ 把 'ai-supply-chain' 改成你的 GitHub repo 名稱
export default defineConfig({
  plugins: [react()],
  base: '/ai-supply-chain/',
})
