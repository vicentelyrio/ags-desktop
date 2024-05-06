import { Bar } from 'src/modules/Bar/Bar'

const styleDir = `src/styles`
const scss = `${styleDir}/base.css`
const css = `${styleDir}/base.scss`
const sassPath = '../node_modules/sass/sass.dart.js'

// Build sass
Utils.exec(`node ${sassPath} ${scss} ${css}`)

// Reload at change
Utils.monitorFile(
  styleDir,
  function() {
    Utils.exec(`node ${sassPath} ${scss} ${css}`)
    App.resetCss()
    App.applyCss(css)
  }
)

// Start App
App.config({
  style: css,
  windows: [
    Bar(0)
  ]
})

