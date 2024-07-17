#!/bin/bash

# Use bluetoothctl to scan for devices
bluetoothctl << EOF
scan on
EOF

sleep $1

# Stop scanning
bluetoothctl << EOF
scan off
EOF
