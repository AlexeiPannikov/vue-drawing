import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from '@vuetify/vite-plugin'
import {ViteAliases} from 'vite-aliases'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        ViteAliases(),
        vuetify({
            autoImport: true,
        }),
    ],
    define: {'process.env': {}},
    build: {
        outDir: 'dist'
    },

    server: {
        port: 3000,
        host: '0.0.0.0',
        hmr: true
    }
})
