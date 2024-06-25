#!/bin/sh

buildCode() {
  $BIN/esbuild $WORK_DIR/$1 --outdir=$2 --bundle --format=esm --external:resource://* --external:gi://* --external:file://*
}

loadCode() {
  ags -b $2 -q
  ags -c $1 -b $2 $3
}
