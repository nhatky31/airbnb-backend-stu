'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    Review.belongsTo(models.User,{foreignKey:'userId',as:'user'});
    Review.belongsTo(models.Room,{foreignKey:'roomId',as:'room'});
    }
  }
  Review.init({
    content: DataTypes.TEXT,
    roomId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};