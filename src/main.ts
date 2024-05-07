import { Bar } from 'src/modules/Bar/Bar'

App.config({
  style: './main.css',
  icons: `${App.configDir}/assets`,
  windows: [
    Bar(0)
  ]
})

