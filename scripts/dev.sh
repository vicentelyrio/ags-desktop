#!/bin/sh

set -e

AGS_DIR="$HOME/.config/ags"

source $AGS_DIR/scripts/vars.sh
source $AGS_DIR/scripts/code.sh
source $AGS_DIR/scripts/style.sh

BUS_NAME="dev"

# build resources
buildCode
buildStyle

# start resources
reloadCode
reloadStyle

# watch for changes on src
inotifywait -m $WORK_DIR -e create,modify,delete -r |
  while read -r directory action file; do
    case "$file" in
      (*.ts)
        buildCode
        reloadCode
      ;;
    esac
    case "$file" in
      (*.scss)
        buildStyle
        reloadStyle
      ;;
    esac
  done
