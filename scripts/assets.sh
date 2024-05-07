#!/bin/sh

copyAssets() {
  rsync -a --delete $WORK_DIR/assets $DEST_DIR
}

