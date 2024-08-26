import { defineConfig } from 'vite'
/* import { setup, teardown } from './vitest-environment/prisma' */
import tsconfigPaths from 'vitest-tsconfig-paths'

export default defineConfig({
  test: {
    environmentMatchGlobs: [
      ['src/http/controllers/**/*.spec.ts', './vitest-environment/prisma.ts'],
    ],
    dir: 'src',
  },
  plugins: [tsconfigPaths()],
})
