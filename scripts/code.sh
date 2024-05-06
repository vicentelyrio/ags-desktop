#!/bin/sh

buildCode() {
  $BIN/esbuild $WORK_DIR/main.ts --outdir=$DEST_DIR --bundle --format=esm --external:resource://* --external:gi://* --external:file://*
}

reloadCode() {
  ags -b $BUS_NAME -q
  ags -b $BUS_NAME -c $DEST_FILE &
}
