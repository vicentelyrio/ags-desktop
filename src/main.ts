import { Bar } from 'src/modules/Bar/Bar'
import { Launcher } from 'src/modules/Launcher/Launcher'
// import { IconBrowser } from './modules/IconBrowser/IconBrowser'

App.config({
  style: './main.css',
  icons: `${App.configDir}/assets`,
  windows: [
    Bar(0),
    Launcher,
    // IconBrowser
  ]
})

