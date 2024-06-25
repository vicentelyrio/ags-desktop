#!/bin/sh

set -e

AGS_DIR="$HOME/.config/ags"
DEST_DIR="$AGS_DIR/build"
WORK_DIR="$AGS_DIR/src/desktop"
BIN="$AGS_DIR/node_modules/.bin"

source $AGS_DIR/scripts/code.sh
source $AGS_DIR/scripts/style.sh
source $AGS_DIR/scripts/assets.sh

# build resources
copyAssets $AGS_DIR/src/assets $DEST_DIR
sleep 1
buildCode main.ts $DEST_DIR
buildStyle $WORK_DIR/styles/main.scss $DEST_DIR/main.css

# start resources
loadCode $DEST_DIR/main.js ags &
loadStyle $DEST_DIR/main.css

# watch for changes on src
inotifywait -m $WORK_DIR -e create,modify,delete -r |
  while read -r directory action file; do
    case "$file" in
      (*.svg)
        copyAssets $AGS_DIR/src/assets $DEST_DIR
        sleep 1
        loadCode $DEST_DIR/main.js ags &
      ;;
    esac
    case "$file" in
      (*.ts)
        buildCode main.ts $DEST_DIR
        loadCode $DEST_DIR/main.js ags &
      ;;
    esac
    case "$file" in
      (*.scss)
        buildStyle $WORK_DIR/styles/main.scss $DEST_DIR/main.css
        loadStyle $DEST_DIR/main.css
      ;;
    esac
  done
