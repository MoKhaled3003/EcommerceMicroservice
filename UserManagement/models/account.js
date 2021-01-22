 
'use strict';
module.exports = (sequelize, DataTypes) => {
  let Account = sequelize.define('Account', {
    balance: DataTypes.DECIMAL(10,2)
      }, {});

    Account.associate = function(models) {
      Account.belongsTo(models.User,{foreignKey:'user_id'});
        };

  return Account;
};