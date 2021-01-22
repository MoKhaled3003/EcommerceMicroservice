'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config')[env];
const db = {};

let sequelize;
if (config) {
  sequelize = new Sequelize(config);
} else {
  console.log('no env')
  sequelize = new Sequelize(process.env.MYSQL_DB, process.env.MYSQL_USERNAME, process.env.MYSQL_PASSWORD, {
    host:process.env.MYSQL_HOST,
    dialect: "mysql",
    dialectOptions: {
      useUTC: false, //for reading from database
      dateStrings: true,
      typeCast: function (field, next) { // for reading from database
        if (field.type === 'DATETIME') {
          return field.string()
        }
          return next()
        },
    },
    timezone: 'Africa/Cairo'
  });
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
