#!/bin/sh

set -e

AGS_DIR="$HOME/.config/ags"

source $AGS_DIR/scripts/vars.sh
source $AGS_DIR/scripts/code.sh
source $AGS_DIR/scripts/style.sh

BUS_NAME="desktop"

# build resources
buildCode
buildStyle

# start resources
reloadCode
reloadStyle
