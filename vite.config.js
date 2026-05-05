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
                manualChunks(id) {
                    const normalizedId = id.replaceAll('\\', '/');

                    if (!normalizedId.includes('node_modules')) return;

                    if (
                        normalizedId.includes('/react/') ||
                        normalizedId.includes('/react-dom/') ||
                        normalizedId.includes('/react-router/') ||
                        normalizedId.includes('/react-router-dom/')
                    ) {
                        return 'react';
                    }

                    if (
                        normalizedId.includes('/i18next/') ||
                        normalizedId.includes('/react-i18next/') ||
                        normalizedId.includes('/i18next-browser-languagedetector/')
                    ) {
                        return 'i18n';
                    }

                    if (
                        normalizedId.includes('/framer-motion/') ||
                        normalizedId.includes('/@headlessui/react/')
                    ) {
                        return 'motion';
                    }

                    if (
                        normalizedId.includes('/chart.js/') ||
                        normalizedId.includes('/react-chartjs-2/')
                    ) {
                        return 'charts';
                    }

                    if (
                        normalizedId.includes('/lucide-react/') ||
                        normalizedId.includes('/react-icons/') ||
                        normalizedId.includes('/simple-icons/') ||
                        normalizedId.includes('/boring-avatars/')
                    ) {
                        return 'icons';
                    }

                    return 'vendor';
                },
            },
        },
    },
    preview: {
        port: 4173
    }
})
