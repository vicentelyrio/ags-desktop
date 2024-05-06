#!/bin/sh

AGS_DIR="$HOME/.config/ags"
DEST_DIR="$AGS_DIR/build"
DEST_FILE="$DEST_DIR/main.js"
DEST_STYLE="$DEST_DIR/main.css"
BUS_NAME=$1

# build resources
yarn build

# run ags
ags -b $BUS_NAME -q
ags -b $BUS_NAME -c $DEST_FILE &
ags -b $BUS_NAME --run-js "App.resetCss(); App.applyCss('$DEST_STYLE');"
