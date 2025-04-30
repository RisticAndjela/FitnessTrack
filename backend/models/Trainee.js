// Trainee contains id, first and last name. current height, connection to the coach
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Trainee', {
    trainee_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true, 
    },
    first_name: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    current_height: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    coach_id: {
      type: DataTypes.INTEGER,
      allowNull: true // I am my own coach
    }
  }, {
    tableName: 'trainees',
    timestamps: false
  });
};
