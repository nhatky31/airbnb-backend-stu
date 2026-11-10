'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Room.belongsTo(models.Location,{foreignKey:'locationId',as:'location'});
      Room.hasMany(models.Review,{foreignKey:'roomId',as:'reviews'});
      Room.hasMany(models.Ticket,{foreignKey:'roomId',as:'tickets'});
    }
  }
  Room.init({
    name: DataTypes.STRING,
    guests: DataTypes.INTEGER,
    bedRoom: DataTypes.INTEGER,
    bath: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    price: DataTypes.INTEGER,
    elevator: DataTypes.BOOLEAN,
    hotTub: DataTypes.BOOLEAN,
    pool: DataTypes.BOOLEAN,
    indoorFireplace: DataTypes.BOOLEAN,
    dryer: DataTypes.BOOLEAN,
    gym: DataTypes.BOOLEAN,
    kitchen: DataTypes.BOOLEAN,
    wifi: DataTypes.BOOLEAN,
    heating: DataTypes.BOOLEAN,
    cableTV: DataTypes.BOOLEAN,
    image: DataTypes.STRING,
   
  }, {
    sequelize,
    modelName: 'Room',
  });
  return Room;
};