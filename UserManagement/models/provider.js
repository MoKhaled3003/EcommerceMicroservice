 
'use strict';
module.exports = (sequelize, DataTypes) => {
  let Provider = sequelize.define('Provider', {
    name: DataTypes.STRING(45)
    }, {});

  return Provider;
};