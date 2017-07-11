import { Sequelize } from 'sequelize-typescript';
var SQLZ = function SQLZ {
    let sqlz;
    const config = require(__dirname + '/config')['development'];
    console.log(config, "config");
    sqlz = new Sequelize({
        name: config.database,
        username: config.username,
        password: config.password,
        dialect: config.dialect,
        host: config.host,
        port: config.port,
        modelPaths: [__dirname + '/models']
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