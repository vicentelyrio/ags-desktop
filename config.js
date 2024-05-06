const entry = `${App.configDir}/src/main.ts`
const destFile = '/tmp/ags/js/main.js'

try {
  await Utils.execAsync([
    './node_modules/esbuild/bin/esbuild',
    '--bundle',
    entry,
    '--format=esm',
    `--outfile=${destFile}`,
    '--external:resource://*',
    '--external:gi://*',
    '--external:file://*',
  ])
  await import(`file://${destFile}`)
} catch (error) {
  console.error(error)
}
