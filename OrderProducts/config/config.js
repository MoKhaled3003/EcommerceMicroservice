module.exports = {
  "development": {
    "username": "root",
    "password": "root12",
    "database": "ecommerce",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": process.env.MYSQL_USERNAME,
    "password": process.env.MYSQL_PASWWORD,
    "database": process.env.MYSQL_DB,
    "host": process.env.MYSQL_HOST,
    "dialect": "mysql"
  },
  "production": {
    "username": process.env.MYSQL_USERNAME,
    "password": process.env.MYSQL_PASWWORD,
    "database": process.env.MYSQL_DB,
    "host": process.env.MYSQL_HOST,
    "dialect": "mysql"
  }
}
