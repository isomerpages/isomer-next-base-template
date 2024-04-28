#!/bin/sh

set -x

curl https://raw.githubusercontent.com/isomerpages/isomer-next-build/main/scripts/preBuild.sh -o scripts/preBuild.sh
sh scripts/preBuild.sh