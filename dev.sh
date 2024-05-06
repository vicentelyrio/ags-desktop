#!/bin/sh

AGS_DIR="$HOME/.config/ags"
WORK_DIR="$AGS_DIR/src"
DEST_DIR="$AGS_DIR/build"
DEST_FILE="$DEST_DIR/main.js"
DEST_STYLE="$DEST_DIR/main.css"
BUS_NAME=$1

reloadStyles() {
  ags -b $BUS_NAME --run-js "App.resetCss(); App.applyCss('$DEST_STYLE');"
}

reloadApp() {
  ags -b $BUS_NAME -q
  ags -b $BUS_NAME -c $DEST_FILE &
}

# build resources
yarn build:sass
yarn build:ts

# run ags
reloadApp
reloadStyles

# watch for changes on src
inotifywait -m $WORK_DIR -e create,modify,delete -r |
  while read -r directory action file; do
    case "$file" in
      (*.ts)
        yarn build:ts
        reloadApp
      ;;
    esac
    case "$file" in
      (*.scss)
        yarn build:sass
        reloadStyles
      ;;
    esac
  done
