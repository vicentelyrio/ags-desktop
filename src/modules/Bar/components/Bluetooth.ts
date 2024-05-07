const bluetooth = await Service.import('bluetooth')

export function Bluetooth() {
  // const connectedList = Widget.Box({
  //   setup: self => self.hook(bluetooth, self => {
  //     self.children = bluetooth.connected_devices
  //       .map(({ icon_name, name }) => Widget.Box([
  //         Widget.Icon(icon_name + '-symbolic'),
  //         Widget.Label(name),
  //       ]));
  //
  //     self.visible = bluetooth.connected_devices.length > 0;
  //   }, 'notify::connected-devices'),
  // })

  const indicator = Widget.Icon({
    icon: bluetooth.bind('enabled').as(on =>
      `bluetooth-${on ? 'active' : 'disabled'}-symbolic`),
    size: 16
  })

  return indicator
}
