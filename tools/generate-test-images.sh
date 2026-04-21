#!/usr/bin/env bash

cd "$(dirname "$0")/.."

mkdir -p img

if [ -n "$1" ]; then
  src="$1"
  if ! [ -e "$src" ]; then
    echo "error: no such file: $src"
    exit 1
  fi
  set -x
else
  set -x
  # magick rose: -scale 1600% img/test.png
  src=img/test.png
fi

./tools/compress-group4.sh "$src" img/test.group4.tiff
./build/tiff_cli img/test.group4.tiff -o img/test.group4.tiff.bmp

./tools/compress-jpeg.sh "$src" img/test.jpeg.tiff
echo this should fail
./build/tiff_cli img/test.jpeg.tiff

# JBIG2 is out of scope
if false; then
  ./tools/compress-jbig2.sh "$src" img/test.jbig2
  ./tools/decompress-jbig2.sh img/test.jbig2 img/test.jbig2.pbm
fi
