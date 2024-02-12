#!/bin/sh

echo "Prebuild started..."
mkdir -p src/scripts/
curl https://raw.githubusercontent.com/isomerpages/isomer-next-build/main/scripts/build.sh -o src/scripts/runBuild.sh
sh src/scripts/runBuild.sh
echo "Prebuild completed"