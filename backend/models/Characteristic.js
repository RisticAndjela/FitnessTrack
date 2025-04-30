// Characteristic got id, name, unit
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Characteristic', {
    characteristic_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true, 
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    unit: {
      type: DataTypes.STRING(45),
      allowNull: false
    }
  }, {
    tableName: 'characteristics',
    timestamps: false
  });
};
