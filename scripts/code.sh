#!/bin/sh

buildCode() {
  $BIN/esbuild $WORK_DIR/main.ts --outdir=$DEST_DIR --bundle --format=esm --external:resource://* --external:gi://* --external:file://*
}

reloadCode() {
  ags -q
  ags -c $DEST_FILE &
}
