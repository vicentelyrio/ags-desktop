#!/bin/sh

buildStyle() {
  $BIN/sass $1 $2
}

loadStyle() {
  agsv1 --run-js "App.resetCss(); App.applyCss('$1');"
}
