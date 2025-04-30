// Rep got id, and 1-3x characteristics and their values, connection to exercise 
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Rep', {
    rep_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true 
    },
    characteristic_one_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    value_one: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    characteristic_two_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    value_two: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    characteristic_three_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    value_three: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    exercise_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'reps',
    timestamps: false
  });
};
