'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
  }, {
    underscored: true
  });
  
  User.prototype.toJSON =  function () {
    var values = Object.assign({}, this.get()); 
    delete values.password;
    return values;
  }
  User.associate = function(models) {
    // associations can be defined here
    User.belongsTo(models.Account,{foreignKey: 'account_id'});
  };
  return User;
};