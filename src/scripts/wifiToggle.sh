#!/bin/bash

# Get the current status of the WiFi
status=$(nmcli radio wifi)

# Check the status and toggle accordingly
if [ "$status" = "enabled" ]; then
    echo "WiFi is currently enabled. Turning it off..."
    nmcli radio wifi off
else
    echo "WiFi is currently disabled. Turning it on..."
    nmcli radio wifi on
fi
