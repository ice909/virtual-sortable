import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';

export default defineConfig({
  plugins: [vue(), vueJsx()],
  build: {
    lib: {
      entry: './src/index.ts',
      name: 'VirtualSortable',
      fileName: (format) => `virtual-sortable.${format}.js`,
    },
    rollupOptions: {
      external: ['vue'],
      output: [
        {
          format: 'es', // ES Module 输出
          dir: 'dist',
          entryFileNames: 'virtual-sortable.es.js',
        },
        {
          format: 'umd', // UMD/CommonJS 输出
          dir: 'dist',
          name: 'VirtualSortable',
          entryFileNames: 'virtual-sortable.umd.js',
          globals: {
            vue: 'Vue',
          },
          // 关键：对混合导出使用 'named' 模式
          exports: 'named',
        },
      ],
    },
  },
});
