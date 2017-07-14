function do_all {
    rm -r dist
    gulp
    cp -r ./src/client ./dist/client
    node_modules/.bin/ngc -p dist/client/tsconfig-aot.json
    cp .\dist\client\main-aot.txt .\dist\client\main.ts
    node_modules/.bin/ngc -p dist/client/tsconfig-aot.json
    cp .\dist\client\index.html .\dist\server\index.html
    node_modules\.bin\rollup -c dist/client/rollup-config.js
}

function do_server {
    gulp build_server
}

function do_client {
    rm -r dist/client
    cp -r ./src/client ./dist/client
    node_modules/.bin/ngc -p dist/client/tsconfig-aot.json
    cp .\dist\client\main-aot.txt .\dist\client\main.ts
    node_modules/.bin/ngc -p dist/client/tsconfig-aot.json
    cp .\dist\client\index.html .\dist\server\index.html
    node_modules\.bin\rollup -c dist/client/rollup-config.js
}

switch ($args[0]) {
    "all" {
        do_all
    }
    "server" {
        do_server
    }
    "client" {
        do_client
    }
    "clean" {
        rm -r dist
    }
    "start" {
        npm start
    }
}
