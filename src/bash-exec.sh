#!/usr/bin/env bash
# Usage: sh src/bash-exec.sh . vendor/bin,src,. sh

CHECK_PASSED=true

FOLDERS=$2

# TODO We need to check if a dot is specified and set SEARCH_IN_ROOT to true if yes
#   and remove the comma properly then
SEARCH_IN_ROOT=false

# Remove spaces
FOLDERS=${FOLDERS// /}
# Replace comma with slash and vertical separator
FOLDERS=${FOLDERS//,/\/\|}
if [ -z "$FOLDERS" ]; then
  # No folders specified
  FOLDERS=".*"
else
  # Adding slash for the last folder
  FOLDERS="$FOLDERS\/"
fi

EXTENSIONS=$3
# Remove spaces
EXTENSIONS=${EXTENSIONS// /}
# Replace comma with vertical separator
EXTENSIONS=${EXTENSIONS//,/\|}
if [ -z "$EXTENSIONS" ]; then
  # No extensions specified, looking for all
  EXTENSIONS=".*"
fi

REGEX="\.\/($FOLDERS).*\.($EXTENSIONS)"

if [ $SEARCH_IN_ROOT ]; then
  REGEX="$REGEX|\.\/[^\/]*(sh)"
fi

echo "$REGEX"

find $1 -type f -regextype posix-extended -regex "REGEX" | while read file; do
  if [ ! -x "$file" ]; then
    echo "$file is not executable"
    CHECK_PASSED=false
  fi
done
if $CHECK_PASSED; then
  exit 1
fi
