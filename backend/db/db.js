const { Sequelize } = require('sequelize');

const DB_NAME = 'fitnesstrackdb';
const HOST = 'localhost';
const USER = 'root';
const PASSWORD = 'andjela';

const sequelize = new Sequelize(DB_NAME, USER, PASSWORD, {
  host: HOST,
  dialect: 'mysql',
});

// initialize models
const User = require('../models/User')(sequelize);
const Trainee = require('../models/Trainee')(sequelize);
const TrainingCategory = require('../models/TrainingCategory')(sequelize);
const Training = require('../models/Training')(sequelize);
const Characteristic = require('../models/Characteristic')(sequelize);
const Exercise = require('../models/Exercise')(sequelize);
const ExerciseType = require('../models/ExerciseType')(sequelize);
const Rep = require('../models/Rep')(sequelize);
const WeightTrack = require('../models/WeightTrack')(sequelize);

// associations
Training.belongsTo(TrainingCategory, { foreignKey: 'category_id', onDelete: 'SET NULL' });
Training.belongsTo(Trainee, { foreignKey: 'trainee_id', onDelete: 'CASCADE' });

WeightTrack.belongsTo(Trainee, { foreignKey: 'trainee_id', onDelete: 'CASCADE' });

Trainee.belongsTo(User, { foreignKey: 'coach_id', onDelete: 'SET NULL' });

Rep.belongsTo(Exercise, { foreignKey: 'exercise_id', onDelete: 'CASCADE' });
Rep.belongsTo(Characteristic, { foreignKey: 'characteristic_one_id', onDelete: 'RESTRICT' });
Rep.belongsTo(Characteristic, { foreignKey: 'characteristic_two_id', onDelete: 'SET NULL' });
Rep.belongsTo(Characteristic, { foreignKey: 'characteristic_three_id', onDelete: 'SET NULL' });

Exercise.belongsTo(Training, { foreignKey: 'training_id', onDelete: 'CASCADE' });
Exercise.belongsTo(ExerciseType, { foreignKey: 'type_id', onDelete: 'RESTRICT' });

module.exports = {
  sequelize,
  User,
  Trainee,
  Training,
  TrainingCategory,
  Characteristic,
  Exercise,
  ExerciseType,
  Rep,
  WeightTrack,
};
