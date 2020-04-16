rm -rf ../h5_static/other/visual/*
cp -rf build/* ../h5_static/other/visual
sed -i '' 's/\/static/\.\/static/g' ../h5_static/other/visual/index.html
