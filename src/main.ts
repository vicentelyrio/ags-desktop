import { Bar } from 'src/modules/Bar/Bar'
import { Launcher } from 'src/modules/Launcher/Launcher'
import { NotificationPopups } from './modules/Notification/Notification'
import { MediaPreview } from './modules/MediaPreview/MediaPreview'
import { Network } from './modules/Network/Network'
import { SystemMenu } from './modules/SystemMenu/SystemMenu'
import { SystemInfo } from './modules/SystemInfo/SystemInfo'
import { SystemInfoHover } from './modules/SystemInfoHover/SystemInfoHover'

// import { IconBrowser } from './modules/IconBrowser/IconBrowser'

App.config({
  style: './main.css',
  icons: `${App.configDir}/assets`,
  windows: [
    Bar(0),
    MediaPreview(0),
    Launcher(0),
    NotificationPopups(0),
    SystemInfo(0),

    // Menus
    ...SystemMenu(0),
    ...Network(0),
    ...SystemInfoHover(0),

    // IconBrowser
  ]
})
