

function do_server {
    Remove-Item -r dist/server
    Remove-Item -r dist/assets
    Copy-Item -r ./src/assets ./dist/assets
    gulp server
}

function do_client_aot {
    Remove-Item -r dist/client
    Copy-Item -r ./src/client ./dist/client
    
    # Configure AOT files
    Copy-Item ./dist/client/aot-files/tsconfig.json ./dist/client/tsconfig.json
    Copy-Item ./dist/client/aot-files/index.html ./dist/server/index.html
    Copy-Item ./dist/client/aot-files/index.html ./dist/client/index.html
    node_modules/.bin/ngc -p dist/client/tsconfig.json
    Copy-Item ./dist/client/aot-files/main.ts ./dist/client/main.ts
    node_modules/.bin/ngc -p dist/client/tsconfig.json
    node_modules/.bin/rollup -c dist/client/aot-files/rollup-config.js
    
    # Clean Other Files
    Copy-Item ./dist/client/build.js ./dist/build.js
    Remove-Item -r ./dist/client
    mkdir ./dist/client
    Copy-Item ./dist/build.js ./dist/client/build.js
    Copy-Item ./dist/server/index.html ./dist/client/index.html
    Remove-Item ./dist/build.js
}

function do_client {
    Remove-Item -r dist/client
    Copy-Item -r ./src/client ./dist/client
    Copy-Item ./dist/client/index.html ./dist/server/index.html
    node_modules/.bin/ngc -p dist/client/tsconfig.json
}

function do_all_aot {
    do_server;
    do_client_aot;
}

function do_all {
    do_server;
    do_client;
}
switch ($args[0]) {
    "all_aot" {
        do_all_aot
    }
    "all" {
        do_all
    }
    "server" {
        do_server
    }
    "client_aot" {
        do_client_aot
    }
    "client" {
        do_client
    }
    "clean" {
        Remove-Item -r dist
    }
    "start" {
        npm start
    }
}
