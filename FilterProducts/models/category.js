 
'use strict';
module.exports = (sequelize, DataTypes) => {
  let Category = sequelize.define('Category', {
    name: DataTypes.STRING(45),
    parent_id: DataTypes.INTEGER,
    }, {});

  return Category;
};