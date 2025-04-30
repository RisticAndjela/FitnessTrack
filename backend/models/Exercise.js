// Exercise got id, type, connection to training
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Exercise', {
    exercise_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true 
    },
    type_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    training_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'exercises',
    timestamps: false
  });
};
