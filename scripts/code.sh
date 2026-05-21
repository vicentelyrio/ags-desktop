#!/bin/sh

buildCode() {
  $BIN/esbuild $WORK_DIR/$1 --outdir=$2 --bundle --format=esm --external:resource://* --external:gi://* --external:file://*
}

loadCode() {
  agsv1 -b $2 -q
  agsv1 -c $1 -b $2 $3
}
