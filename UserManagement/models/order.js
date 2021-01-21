
'use strict';
module.exports = (sequelize, DataTypes) => {
    let Order = sequelize.define('Order', {
        status:DataTypes.ENUM('pending','shipped','delivered')
  }, {
    });
    Order.associate = function(models) {
      Order.belongsTo(models.User, { foreignKey: 'user_id' });
      };
  return Order;
};