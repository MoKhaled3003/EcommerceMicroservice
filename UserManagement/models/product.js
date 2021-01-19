 
'use strict';
module.exports = (sequelize, DataTypes) => {
  let Product = sequelize.define('Product', {
    name: DataTypes.STRING(45),
    brand: DataTypes.STRING(255),
    price : DataTypes.DECIMAL(10, 2)
    }, {});

    Product.associate = function(models) {
        Product.belongsTo(models.Category,{foreignKey:'category_id'});
      };
  return Product;
};