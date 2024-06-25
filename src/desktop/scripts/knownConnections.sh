#!/bin/bash

# List all connection UUIDs
connections=$(nmcli -g UUID connection show)

for uuid in $connections; do
    # Check if the connection has a stored password
    password=$(nmcli -s -g 802-11-wireless-security.psk connection show "$uuid")

    if [ -n "$password" ]; then
        # Get connection name
        conn_name=$(nmcli -g connection.id connection show "$uuid")
        # Try to connect to the network
        nmcli connection up "$uuid" > /dev/null 2>&1
        if [ $? -eq 0 ]; then
            echo "Connection: $conn_name ($uuid) has a valid password."
            # Disconnect if the connection was successful
            nmcli connection down "$uuid" > /dev/null 2>&1
        else
            echo "Connection: $conn_name ($uuid) has an invalid password."
        fi
    fi
done
