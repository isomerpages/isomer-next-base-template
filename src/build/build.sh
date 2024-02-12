#!/bin/sh

echo "Prebuild started..."
mkdir -p src/scripts/
curl https://raw.githubusercontent.com/isomerpages/isomer-next-build/main/scripts/build.sh -o src/scripts/build.sh
sh src/scripts/build.sh
echo "Prebuild completed"