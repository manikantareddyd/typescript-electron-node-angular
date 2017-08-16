

function do_server {
    rm -r dist/server
    rm -r dist/assets
    cp -r .\src\assets .\dist\assets
    gulp
}

function do_client_aot {
    rm -r dist/client
    cp -r ./src/client ./dist/client
    
    # Configure AOT files
    cp .\dist\client\aot-files\tsconfig.json .\dist\client\tsconfig.json
    cp .\dist\client\aot-files\index.html .\dist\server\index.html
    cp .\dist\client\aot-files\index.html .\dist\client\index.html
    node_modules/.bin/ngc -p dist/client/tsconfig.json
    cp .\dist\client\aot-files\main.ts .\dist\client\main.ts
    node_modules/.bin/ngc -p dist/client/tsconfig.json
    node_modules\.bin\rollup -c dist/client/aot-files/rollup-config.js
    
    # Clean Other Files
    cp .\dist\client\build.js .\dist\build.js
    rm -r .\dist\client
    mkdir .\dist\client
    cp .\dist\build.js .\dist\client\build.js
    cp .\dist\server\index.html .\dist\client\index.html
    rm .\dist\build.js
}

function do_client {
    rm -r dist/client
    cp -r ./src/client ./dist/client
    cp ./dist/client/systemjs/* ./dist/client
    cp .\dist\client\index.html .\dist\server\index.html
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
        rm -r dist
    }
    "start" {
        npm start
    }
}
