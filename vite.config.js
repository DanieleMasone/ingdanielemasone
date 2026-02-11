import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
// import path from 'path'
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
    plugins: [react(), tsconfigPaths()],
    base: '/ingdanielemasone/',
    // resolve: {
    //     alias: {
    //         '@': path.resolve(__dirname, './src')
    //     }
    // },
    server: {
        port: 3000,
        open: true
    },
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './src/setupTests.js',
        include: ['src/**/*.{test,spec}.{js,jsx}']
    },
    build: {
        outDir: 'dist',
        sourcemap: true
    },
    preview: {
        port: 4173
    }
})
