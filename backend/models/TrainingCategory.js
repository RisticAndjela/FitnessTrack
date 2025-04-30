// Training Category got id, name
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('TrainingCategory', {
    category_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true 
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: false
    }
  }, {
    tableName: 'training_categories',
    timestamps: false
  });
};
