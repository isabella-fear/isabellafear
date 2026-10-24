import { spawnSync } from 'node:child_process'
import { writeFile, copyFile } from 'node:fs/promises'

const result = spawnSync(process.execPath, ['node_modules/next/dist/bin/next', 'build'], {
  stdio: 'inherit',
  env: { ...process.env, PAGES_EXPORT: '1', NEXT_PUBLIC_SITE_URL: 'https://isabellafear.github.io' },
})
if (result.status !== 0) process.exit(result.status ?? 1)
await writeFile('out/.nojekyll', '')
await copyFile('out/og', 'out/og.png')
console.log('GitHub Pages files are ready in out/.')
