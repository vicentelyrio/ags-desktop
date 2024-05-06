#!/bin/sh

buildStyle() {
  $BIN/sass $WORK_DIR/styles/main.scss $DEST_STYLE
}

reloadStyle() {
  ags -b $BUS_NAME --run-js "App.resetCss(); App.applyCss('$DEST_STYLE');"
}
