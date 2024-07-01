#!/bin/sh

# hide greet
ags -b ags_greet -q

# show desktop
ags -b ags_desktop -c $HOME/.config/ags/build/main.js
