/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
const rootDir = typeof __dirname !== 'undefined' ? __dirname : dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  plugins: [
    vue(),
    dts({
      tsconfigPath: join(rootDir, 'tsconfig.app.json'),
      insertTypesEntry: true
    })
  ],
  resolve: {
    alias: {
      '@src': join(rootDir, 'src')
    }
  },
  build: {
    sourcemap: true,
    cssCodeSplit: true,
    lib: {
      entry: {
        index: join(rootDir, 'src/index.ts'),
        'themes/alpa': join(rootDir, 'src/themes/alpa.ts'),
        'themes/king': join(rootDir, 'src/themes/king.ts')
      },
      formats: ['es', 'cjs'],
      fileName: (format, entryName) => {
        if (format === 'es') {
          return `${entryName}.js`;
        }
        return `${entryName}.cjs`;
      }
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        assetFileNames: 'assets/[name][extname]'
      }
    }
  }
})
