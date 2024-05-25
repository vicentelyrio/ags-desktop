#!/bin/sh

set -e

AGS_DIR="$HOME/.config/ags"

source $AGS_DIR/scripts/vars.sh
source $AGS_DIR/scripts/code.sh
source $AGS_DIR/scripts/style.sh
source $AGS_DIR/scripts/assets.sh

# build resources
copyAssets
buildCode
buildStyle

# start resources
loadCode &
loadStyle
