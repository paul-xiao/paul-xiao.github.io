#!/usr/bin/env sh
echo 'building start...'

echo 'compress image...'

# navigate into the build output directory
#cd .vuepress/plugins

# pwd
# compress
# node ./image-compress.js

# back to root
cd ../../

# build
vuepress build .

echo 'building end...'