'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
  }, {
    underscored: true
  });
  User.associate = function(models) {
    // associations can be defined here
    User.belongsTo(models.Account,{foreignKey: 'account_id'});
  };
  return User;
};