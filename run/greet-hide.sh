#!/bin/sh

# hide greet
agsv1 -b ags_greet -q

# show desktop
agsv1 -b ags_desktop -c $HOME/.config/ags/build/main.js
