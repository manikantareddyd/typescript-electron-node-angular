rm -r dist
gulp
node_modules/.bin/ngc -p dist/client/tsconfig-aot.json
cp .\dist\client\main-aot.txt .\dist\client\main.ts
node_modules/.bin/ngc -p dist/client/tsconfig-aot.json
cp .\dist\client\index.html .\dist\server\index.html
node_modules\.bin\rollup -c dist/client/rollup-config.js