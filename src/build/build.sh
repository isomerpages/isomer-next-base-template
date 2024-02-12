#!/bin/sh

echo "Build started..."

#######################################################################
# Download package.json and package-lock.json files from central repo #
#######################################################################

curl https://raw.githubusercontent.com/isomerpages/isomer-template/master/build/package.json -o package.json
curl https://raw.githubusercontent.com/isomerpages/isomer-template/master/build/package-lock.json -o package-lock.json

#######################################################################
# Generate sitemap.json and search index #
#######################################################################

curl https://raw.githubusercontent.com/isomerpages/isomer-next-build/main/scripts/generate-sitemap.js -o src/scripts/generate-sitemap.js
curl https://raw.githubusercontent.com/isomerpages/isomer-next-build/main/scripts/generate-search-index.js -o src/scripts/generate-search-index.js

#######################
# Install NPM modules #
#######################

npm install

#####################
# Build the website #
#####################

npm run build