#!/bin/sh

set -e

AGS_DIR="$HOME/.config/ags"
DEST_DIR="$AGS_DIR/build"
WORK_DIR="$AGS_DIR/src/greet"
BIN="$AGS_DIR/node_modules/.bin"

source $AGS_DIR/scripts/code.sh
source $AGS_DIR/scripts/style.sh

# build resources
buildCode greet.ts $DEST_DIR
buildStyle $WORK_DIR/styles/greet.scss $DEST_DIR/greet.css

# start resources
loadCode $DEST_DIR/greet.js greet &
loadStyle $DEST_DIR/greet.css

# watch for changes on src
inotifywait -m $WORK_DIR -e create,modify,delete -r |
  while read -r directory action file; do
    case "$file" in
      (*.ts)
        buildCode greet.ts $DEST_DIR
        loadCode $DEST_DIR/greet.js greet &
      ;;
    esac
    case "$file" in
      (*.scss)
        buildStyle $WORK_DIR/styles/greet.scss $DEST_DIR/greet.css
        loadStyle $DEST_DIR/greet.css
      ;;
    esac
  done
