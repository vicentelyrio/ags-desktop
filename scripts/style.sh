#!/bin/sh

buildStyle() {
  $BIN/sass $WORK_DIR/styles/main.scss $DEST_STYLE
}

reloadStyle() {
  ags --run-js "App.resetCss(); App.applyCss('$DEST_STYLE');"
}
