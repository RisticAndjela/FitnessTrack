const { sequelize, Exercise, User, ExerciseType, Trainee, Training, TrainingCategory, Characteristic, Rep } = require('../db/db_test');

const ExerciseRepository = require('../repositories/ExerciseRepository');
const ExerciseTypeRepository = require('../repositories/ExerciseTypeRepository');
const UserRepository = require('../repositories/UserRepository');
const TraineeRepository = require('../repositories/TraineeRepository');
const TrainingRepository = require('../repositories/TrainingRepository');
const TrainingCategoryRepository = require('../repositories/TrainingCategoryRepository');
const CharacteristicRepository = require('../repositories/CharacteristicRepository');
const RepRepository = require('../repositories/RepRepository');

const exerciseRepo = new ExerciseRepository(Exercise);
const exerciseTypeRepo = new ExerciseTypeRepository(ExerciseType);
const userRepo = new UserRepository(User);
const traineeRepo = new TraineeRepository(Trainee);
const trainingRepo = new TrainingRepository(Training);
const trainingCategoryRepo = new TrainingCategoryRepository(TrainingCategory);
const characteristicRepo = new CharacteristicRepository(Characteristic)
const repRepo = new RepRepository(Rep)

afterAll(async () => {
  await sequelize.sync({ force: true });
  await sequelize.close();
});

describe('Exercise Model', () => {
  it('should create an exercise successfully', async () => {
    const exerciseTypeData = {
        name: 'Leg extension'
      }
    const exerciseType = await exerciseTypeRepo.createType(exerciseTypeData);
    
    const trainingCategoryData = {
        name: 'Leg workout'
    }
    const trainingCategory = await trainingCategoryRepo.createCategory(trainingCategoryData);
    
    const userData ={
        username: 'user1',
        password: 'pass1',
        first_name: 'John',
        last_name: 'Doe',
        type: 'Coach',
    }
    const user = await userRepo.createUser(userData);

    const traineeData = {
        first_name: 'Jane',
        last_name: 'Smith',
        current_height: '165',
        coach_id: user.user_id
    }
    const trainee = await traineeRepo.createTrainee(traineeData);

    const trainingData = {
        category_id: trainingCategory.category_id,
        trainee_id: trainee.trainee_id,
        name: 'Jane\'s leg workout',
        date: Date.now()
    
    }
    const training = await trainingRepo.createTraining(trainingData);

    const exerciseData = {
      type_id: exerciseType.type_id,
      training_id: training.training_id,
    };
    const exercise = await exerciseRepo.createExercise(exerciseData);

    const characteristicData = {
      name: 'Strength',
      unit: 'kg',
    };
    const characteristic = await characteristicRepo.createCharacteristic(characteristicData);

    const repData = {
      exercise_id: exercise.exercise_id,
      characteristic_one_id: characteristic.characteristic_id, 
      value_one: 12,
      characteristic_two_id: characteristic.characteristic_id,
      value_two: 50,
      characteristic_three_id: characteristic.characteristic_id,
      value_three: 70,
    }
    const rep = await repRepo.createRep(repData);

    // Exercise test
    expect(exercise).toBeDefined();
    expect(exercise.type_id).toBe(1);
    expect(exercise.training_id).toBe(1);

    // ExerciseType test
    expect(exerciseType).toBeDefined();
    expect(exerciseType.name).toBe('Leg extension');

    // TrainingCategory test
    expect(trainingCategory).toBeDefined();
    expect(trainingCategory.name).toBe('Leg workout');

    // User test
    expect(user).toBeDefined();
    expect(user.username).toBe('user1');
    expect(user.first_name).toBe('John');
    expect(user.last_name).toBe('Doe');
    expect(user.type).toBe('Coach');

    // Trainee test
    expect(trainee).toBeDefined();
    expect(trainee.first_name).toBe('Jane');
    expect(trainee.last_name).toBe('Smith');
    expect(trainee.current_height).toBe('165');
    expect(trainee.coach_id).toBe(1);

    // Training test
    expect(training).toBeDefined();
    expect(training.category_id).toBe(1);
    expect(training.trainee_id).toBe(1);
    expect(training.name).toBe('Jane\'s leg workout');

    // Characteristic test
    expect(characteristic).toBeDefined();
    expect(characteristic.name).toBe('Strength');
    expect(characteristic.unit).toBe('kg');

    // Rep test
    expect(rep).toBeDefined();
    expect(rep.exercise_id).toBe(exercise.exercise_id);
    expect(rep.characteristic_one_id).toBe(characteristic.characteristic_id);
    expect(rep.value_one).toBe(12);
    expect(rep.characteristic_two_id).toBe(characteristic.characteristic_id);
    expect(rep.value_two).toBe(50);
    expect(rep.characteristic_three_id).toBe(characteristic.characteristic_id);
    expect(rep.value_three).toBe(70);
    
  });
});

