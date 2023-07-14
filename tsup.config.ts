import { defineConfig } from 'tsup'

export default defineConfig({
  entry: [
    'src/index.ts',
    'src/adapters/AdapterDateFns.ts',
    'src/adapters/AdapterDayjs.ts',
  ],
  clean: true,
  dts: true,
  format: ['cjs', 'esm'],
})
