
'use strict';
module.exports = (sequelize, DataTypes) => {
    let Provider_Product = sequelize.define('Provider_Product', {
        price:DataTypes.DOUBLE,
        available:DataTypes.BOOLEAN
  }, {
    });
    Provider_Product.associate = function(models) {
        Provider_Product.belongsTo(models.Product, { foreignKey: 'product_id' });
        Provider_Product.belongsTo(models.Provider, { foreignKey: 'provider_id' });
      };
  return Provider_Product;
};



// //select inner.category_name , inner.product_name , inner.provider_name , min(inner.price) price
// //from 
// //(



// select cat.name  category_name , prod.name  product_name , prov.name provider_name ,
// pro.price  price

// from categories cat , products prod , providers prov , product_providers pro

// where cat.id = prod.category_id
// and prod.id = pro.products_id
// and prov.id = pro.providers_id
// and cat.id = 12345 // for example mobiles
// order by pro.price


// //) inner
// //group by inner.category_name , inner.product_name , inner.provider_name
