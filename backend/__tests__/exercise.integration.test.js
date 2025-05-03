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
describe('Exercise Model', () => {
  let exercise, exerciseType, training, trainingCategory;
  let user, trainee, characteristic, rep;

  beforeAll(async () => {
    await sequelize.sync({ force: true });

    exerciseType = await exerciseTypeRepo.createType({ name: 'Leg extension' });
    trainingCategory = await trainingCategoryRepo.createCategory({ name: 'Leg workout' });

    user = await userRepo.createUser({
      username: 'user1',
      password: 'pass1',
      first_name: 'John',
      last_name: 'Doe',
      type: 'Coach',
    });

    trainee = await traineeRepo.createTrainee({
      first_name: 'Jane',
      last_name: 'Smith',
      current_height: '165',
      coach_id: user.user_id,
    });

    training = await trainingRepo.createTraining({
      category_id: trainingCategory.category_id,
      trainee_id: trainee.trainee_id,
      name: "Jane's leg workout",
      date: Date.now()
    });

    exercise = await exerciseRepo.createExercise({
      type_id: exerciseType.type_id,
      training_id: training.training_id,
    });

    characteristic = await characteristicRepo.createCharacteristic({
      name: 'Strength',
      unit: 'kg',
    });

    rep = await repRepo.createRep({
      exercise_id: exercise.exercise_id,
      characteristic_one_id: characteristic.characteristic_id,
      value_one: 12,
      characteristic_two_id: characteristic.characteristic_id,
      value_two: 50,
      characteristic_three_id: characteristic.characteristic_id,
      value_three: 70,
    });
  });

  afterAll(async () => {
    await sequelize.sync({ force: true });
    await sequelize.close();
  });

  it('should create and verify exerciseType', () => {
    expect(exerciseType).toBeDefined();
    expect(exerciseType.name).toBe('Leg extension');
  });

  it('should create and verify trainingCategory', () => {
    expect(trainingCategory).toBeDefined();
    expect(trainingCategory.name).toBe('Leg workout');
  });

  it('should create and verify user', () => {
    expect(user).toBeDefined();
    expect(user.username).toBe('user1');
  });

  it('should create and verify trainee', () => {
    expect(trainee).toBeDefined();
    expect(trainee.coach_id).toBe(user.user_id);
  });

  it('should create and verify training', () => {
    expect(training).toBeDefined();
    expect(training.trainee_id).toBe(trainee.trainee_id);
  });

  it('should create and verify exercise', () => {
    expect(exercise).toBeDefined();
    expect(exercise.type_id).toBe(exerciseType.type_id);
  });

  it('should create and verify characteristic', () => {
    expect(characteristic).toBeDefined();
    expect(characteristic.name).toBe('Strength');
  });

  it('should create and verify rep', () => {
    expect(rep).toBeDefined();
    expect(rep.exercise_id).toBe(exercise.exercise_id);
    expect(rep.value_one).toBe(12);
    expect(rep.value_three).toBe(70);
  });
  it('should get all reps from DB', async () => {
    const reps = await repRepo.getAllReps();
    expect(reps.length).toBeGreaterThan(0);
    expect(reps[0].exercise_id).toBe(exercise.exercise_id);
  });

  it('should get a rep by ID', async () => {
    const fetchedRep = await repRepo.getRepById(rep.rep_id);
    expect(fetchedRep).toBeDefined();
    expect(fetchedRep.value_two).toBe(50);
  });

  it('should return null for non-existent rep ID', async () => {
    const nonExistentRep = await repRepo.getRepById(9999);
    expect(nonExistentRep).toBeNull();
  });

  it('should update a rep successfully', async () => {
    const updated = await repRepo.updateRep(rep.rep_id, {
      value_one: 20,
      value_two: 55,
      value_three: 80
    });
    expect(updated.value_one).toBe(20);
    expect(updated.value_three).toBe(80);
  });

  it('should return null when updating non-existent rep', async () => {
    const updated = await repRepo.updateRep(9999, { value_one: 999 });
    expect(updated).toBeNull();
  });

  it('should delete a rep successfully', async () => {
    const deleted = await repRepo.deleteRep(rep.rep_id);
    expect(deleted).toBeTruthy();

    const shouldBeNull = await repRepo.getRepById(rep.rep_id);
    expect(shouldBeNull).toBeNull();
  });

  it('should return 0 when deleting non-existent rep', async () => {
    const deleted = await repRepo.deleteRep(9999);
    expect(deleted).toBe(0);
  });

  it('should fail gracefully when creating a rep with missing data', async () => {
    await expect(repRepo.createRep({ exercise_id: null })).rejects.toThrow();
  });

});

