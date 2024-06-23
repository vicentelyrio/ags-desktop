#!/bin/sh

buildStyle() {
  $BIN/sass $1 $2
}

loadStyle() {
  ags --run-js "App.resetCss(); App.applyCss('$1');"
}
