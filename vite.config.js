import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
const path = require('path')
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve:{
    alias:{
      '@':path.resolve(__dirname,'./src')
    }
  },
  server:{
    host:'0.0.0.0',
    port:3000,
    open:true,
    proxy:{
      '/api': {
        target:'http://localhost:8899',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
      // '/api':{
      //   target:'http://localhost:8899',
      //   changeOrigin:true,
      //   rewrite:(path) => path.replace(/^\/api/,'')
      // }
    }
  }
})
