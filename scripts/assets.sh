#!/bin/sh

copyAssets() {
  rsync -a --delete --mkpath $1 $2
}

