'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    
        // associations can be defined here
        Image.belongsTo(models.Location, {
          foreignKey: 'locationId',
          onDelete: 'CASCADE'
        })
      
      return Image
    }
  };
  Image.init({
    name: DataTypes.STRING,
    imageBase64: DataTypes.TEXT,
    locationId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Image',
  });
  return Image;
};