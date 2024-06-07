export const wifiConnections = Variable<string>(Utils.exec(`sh -c "nmcli connection show | grep wifi | awk -F ' ' '{print $1}'"`))

