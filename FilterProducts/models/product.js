 
'use strict';
module.exports = (sequelize, DataTypes) => {
  let Product = sequelize.define('Product', {
    name: DataTypes.STRING(45),
    image_uri: DataTypes.STRING(255),
    featured : DataTypes.BOOLEAN
    }, {});

    Product.associate = function(models) {
        Product.belongsTo(models.Category,{foreignKey:'category_id'});
      };
  return Product;
};