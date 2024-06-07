import { Bar } from 'src/modules/Bar/Bar'
import { Launcher } from 'src/modules/Launcher/Launcher'
import { NotificationPopups } from './modules/Notification/Notification'
import { MediaPreview } from './modules/MediaPreview/MediaPreview'
import { Network } from './modules/Network/Network'

// import { IconBrowser } from './modules/IconBrowser/IconBrowser'

App.config({
  style: './main.css',
  icons: `${App.configDir}/assets`,
  windows: [
    Bar(0),
    MediaPreview(0),
    ...Network(0),
    Launcher(0),
    NotificationPopups(0),

    // IconBrowser
  ]
})
