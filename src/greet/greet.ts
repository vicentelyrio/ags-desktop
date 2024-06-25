import GLib from 'gi://GLib?version=2.0'
import { Greet } from './modules/Greet/Greet'

App.config({
  style: `${App.configDir}/greet.css`,
  icons: `${App.configDir}/assets`,
  windows: [Greet],
  cursorTheme: GLib.getenv('XCURSOR_THEME')!,
})

