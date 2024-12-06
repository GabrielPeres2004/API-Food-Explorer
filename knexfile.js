const path = require('path');

module.exports = {
  development: {
    client: process.env.DB_CLIENT,
    connection: {
      host: process.env.DB_HOST_LOCAL,
      port: process.env.DB_PORT_LOCAL,
      user: process.env.DB_USER_LOCAL,
      password: process.env.DB_PASSWORD_LOCAL,
      database: process.env.DB_NAME_LOCAL
    },
    pool: {
      min: 2,
      max: 10
    },
    production: {
      client: process.env.DB_CLIENT,
      connection: {
        host: process.env.DB_HOST_DEPLOY,
        port: process.env.DB_PORT_DEPLOY,
        user: process.env.DB_USER_DEPLOY,
        password: process.env.DB_PASSWORD_DEPLOY,
        database: process.env.DB_NAME_DEPLOY
      }
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: path.resolve(__dirname, './src', './database', './knex', './migrations')
    }
  }
};
