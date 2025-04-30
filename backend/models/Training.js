// Training have id, connection to category and trainee, name, date
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Training', {
    training_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true 
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    trainee_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    date: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'trainings',
    timestamps: false
  });
};
