// Weight track have id, date, weight, connection to trainee
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('WeightTrack', {
    weight_track_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true 
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    weight: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    trainee_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'weight_tracks',
    timestamps: false
  });
};
