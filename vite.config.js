import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
    plugins: [react()],
    base: '/ingdanielemasone/',
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src')
        }
    },
    server: {
        port: 3000,
        open: true
    },
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './src/setupTests.js',
        include: ['src/**/*.{test,spec}.{js,jsx}'],
        coverage: {
            reporter: ['text', 'html'],
            exclude: [
                'src/assets/**',
                'src/i18n/**',
                'src/locales/**',
                '**/*.test.*',
                '**/*.spec.*'
            ]
        }
    },
    build: {
        outDir: 'dist',
        sourcemap: true,
        rollupOptions: {
            output: {
                manualChunks: {
                    react: ['react', 'react-dom', 'react-router', 'react-router-dom'],
                    i18n: ['i18next', 'react-i18next', 'i18next-browser-languagedetector'],
                    motion: ['framer-motion', '@headlessui/react'],
                    charts: ['chart.js', 'react-chartjs-2'],
                    icons: ['lucide-react', 'react-icons', 'simple-icons', 'boring-avatars']
                }
            }
        }
    },
    preview: {
        port: 4173
    }
})
