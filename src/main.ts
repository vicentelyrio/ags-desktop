import { Bar } from 'src/modules/Bar/Bar'
import { Launcher } from 'src/modules/Launcher/Launcher'
import { NotificationPopups } from './modules/Notification/Notification'
import { MediaPreview } from './modules/MediaPreview/MediaPreview'
// import { IconBrowser } from './modules/IconBrowser/IconBrowser'

App.config({
  style: './main.css',
  icons: `${App.configDir}/assets`,
  windows: [
    Bar(0),
    Launcher(0),
    NotificationPopups(0),
    MediaPreview(0)
    // IconBrowser
  ]
})
