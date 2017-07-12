import { Sequelize } from 'sequelize-typescript';
import * as path from 'path';
var SQLZ = function () {
    let sqlz;
    const config = require(__dirname + '/config')['development'];
    console.log("Database config", config);
    sqlz = new Sequelize({
        name: config.database,
        username: config.username,
        password: config.password,
        dialect: config.dialect,
        host: config.host,
        port: config.port,
        modelPaths: [path.join(__dirname, '/models')]
    });
    sqlz
        .authenticate()
        .then(() => {
            console.log('Connection has been established successfully.');
        })
        .catch(err => {
            console.error('Unable to connect to the database:', err);
        });
    return sqlz;
}
export default SQLZ;