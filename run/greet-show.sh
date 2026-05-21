#!/bin/sh

# hide desktop
agsv1 -b ags_desktop -q

# show greet
agsv1 -b ags_greet -c /etc/greetd/greet.js

