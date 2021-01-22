 
'use strict';
module.exports = (sequelize, DataTypes) => {
  let Holded_Amount = sequelize.define('Holded_Amount', {
    amount: DataTypes.DECIMAL(10,2),
    }, {});

    Holded_Amount.associate = function(models) {
      Holded_Amount.belongsTo(models.Order,{foreignKey:'order_id'});
      Holded_Amount.belongsTo(models.User,{foreignKey:'user_id'});

        };
  return Holded_Amount;
};