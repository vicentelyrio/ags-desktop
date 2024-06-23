#!/bin/sh

set -e

AGS_DIR="$HOME/.config/ags"
DEST_DIR="$AGS_DIR/build"
WORK_DIR="$AGS_DIR/src"
BIN="$AGS_DIR/node_modules/.bin"

source $AGS_DIR/scripts/code.sh
source $AGS_DIR/scripts/style.sh
source $AGS_DIR/scripts/assets.sh

# build resources
buildCode greet.ts $DEST_DIR
buildStyle $WORK_DIR/styles/greet.scss $DEST_DIR/greet.css

# start resources
loadCode $DEST_DIR/greet.js &
loadStyle $DEST_DIR/greet.css
