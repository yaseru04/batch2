'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class menu extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.kategori, {
        foreignKey: 'kategori',
        as: 'kategori'
      })
      // define association here
    }
  }
  menu.init({
    nama: DataTypes.STRING,
    harga: DataTypes.INTEGER,
    deskripsi: DataTypes.STRING,
    kategori: DataTypes.STRING,
    Image : DataTypes.STRING
  }, {
    sequelize,
    modelName: 'menu',
  });
  return menu;
};