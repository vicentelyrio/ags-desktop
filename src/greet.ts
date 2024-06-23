import GLib from 'gi://GLib?version=2.0'
import { Greetd } from './modules/Greetd/Greetd'

App.config({
  style: './greet.css',
  icons: `${App.configDir}/assets`,
  windows: [Greetd],
  cursorTheme: GLib.getenv('XCURSOR_THEME')!,
})

