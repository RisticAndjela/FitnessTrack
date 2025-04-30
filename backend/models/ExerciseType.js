// Exercise type  got id, name
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('ExerciseType', {
    type_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true 
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: false
    }
  }, {
    tableName: 'exercise_types',
    timestamps: false
  });
};
