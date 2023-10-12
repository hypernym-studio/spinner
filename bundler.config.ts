import { defineConfig } from '@hypernym/bundler'

export default defineConfig({
  entries: [{ input: './src/index.ts' }, { types: './src/types/index.ts' }],
})
