#!/usr/bin/env bash
# Usage: sh src/bash-exec.sh . vendor/bin,src,. sh

CHECK_PASSED=true

FOLDERS="$2"

# Remove spaces
FOLDERS=${FOLDERS// /}

# Adding comma at the beginning and the end
FOLDERS=",$FOLDERS,"

# Remove double commas
FOLDERS=${FOLDERS//,,/,}

# Search in root if ,., is specified
if [[ "$FOLDERS" == *,.,* ]]; then
  SEARCH_IN_ROOT=true
  # Replace ,., with comma
  FOLDERS=${FOLDERS//,.,/,}
else
  SEARCH_IN_ROOT=false
fi

# Replace slashes with escaped slashes
FOLDERS=${FOLDERS//\//\\/}

# Remove the first and the last comma
#FOLDERS=${FOLDERS:1:-1}
FOLDERS=$(echo "$FOLDERS" | cut -c 2- | rev | cut -c 2- | rev)

EXTENSIONS="$3"

# Adding comma at the beginning and the end
EXTENSIONS=",$EXTENSIONS,"

# Remove double commas
EXTENSIONS=${EXTENSIONS//,,/,}

# Replace slashes with escaped slashes
EXTENSIONS=${EXTENSIONS//\//\\/}

# Remove the first and the last comma
#EXTENSIONS=${EXTENSIONS:1:-1}
EXTENSIONS=$(echo "$EXTENSIONS" | cut -c 2- | rev | cut -c 2- | rev)

# Replace comma with slash and vertical separator
FOLDERS=${FOLDERS//,/\/\|}

if [ -z "$FOLDERS" ]; then
  # No folders specified
  FOLDERS=".*"
else
  # Adding slash for the last folder
  FOLDERS="$FOLDERS\/"
fi

if [ -z "$EXTENSIONS" ]; then
  # No extensions specified, looking for all
  EXTENSIONS=".*"
fi

REGEX="\.\/($FOLDERS).*\.($EXTENSIONS)"

if [[ $2 == .* ]]; then
  SEARCH_IN_ROOT=true
fi

if [ $SEARCH_IN_ROOT == true ]; then
  REGEX="$REGEX|\.\/[^\/]*($EXTENSIONS)"
fi

echo "$REGEX"
echo "$1 -type f -regextype posix-extended -regex "$REGEX""

find $1 -type f -regextype posix-extended -regex "$REGEX" | while read file; do
  if [ ! -x "$file" ]; then
    echo "$file is not executable"
    CHECK_PASSED=false
  fi
done

if $CHECK_PASSED ; then
  exit 1
fi
