 
'use strict';
module.exports = (sequelize, DataTypes) => {
  let Holded_Amount = sequelize.define('Holded_Amount', {
    amount: DataTypes.DECIMAL(10,2),
    tran_id: DataTypes.STRING(15)
    }, {});

  return Holded_Amount;
};