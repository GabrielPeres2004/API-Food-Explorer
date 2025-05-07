require('dotenv/config')
const path = require('path');

const isProduction = process.env.NODE_ENV === 'production';


module.exports = {

  development: {
    client: process.env.DB_CLIENT,
    connection: {
      host: isProduction ? process.env.DB_HOST_DEPLOY : process.env.DB_HOST_LOCAL,
      port: isProduction ? process.env.DB_PORT_DEPLOY : process.env.DB_PORT_LOCAL,
      user: isProduction ? process.env.DB_USER_DEPLOY : process.env.DB_USER_LOCAL,
      password: isProduction ? process.env.DB_PASSWORD_DEPLOY : process.env.DB_PASSWORD_LOCAL,
      database: isProduction ? process.env.DB_NAME_DEPLOY : process.env.DB_NAME_LOCAL
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: path.resolve(__dirname, './src', './database', './knex', './migrations')
    }
  }

}
