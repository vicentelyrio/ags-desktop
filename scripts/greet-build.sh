#!/bin/sh

set -e

AGS_DIR="$HOME/.config/ags"
DEST_DIR="$AGS_DIR/greet"
WORK_DIR="$AGS_DIR/src/greet"
BIN="$AGS_DIR/node_modules/.bin"

source $AGS_DIR/scripts/code.sh
source $AGS_DIR/scripts/style.sh
source $AGS_DIR/scripts/assets.sh

# build resources
buildCode greet.ts $DEST_DIR
buildStyle $WORK_DIR/styles/greet.scss $DEST_DIR/greet.css

# copy to greet
sudo cp $DEST_DIR/greet.js /etc/greetd/greet.js
sudo cp $DEST_DIR/greet.css /etc/greetd/greet.css
