const { sequelize, User, Trainee, WeightTrack } = require('../db/db_test');

const UserRepository = require('../repositories/UserRepository');
const TraineeRepository = require('../repositories/TraineeRepository');
const WeightTrackRepository = require('../repositories/WeightTrackRepository');

const userRepo = new UserRepository(User);
const traineeRepo = new TraineeRepository(Trainee);
const weightTrackRepo = new WeightTrackRepository(WeightTrack);

describe('Trainee & WeightTrack Models', () => {
  let user, trainee, weightTracks;

  beforeAll(async () => {
    await sequelize.sync({ force: true });

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

    const weightTrackDataList = [
      { date: new Date('2024-01-01'), weight: 65, trainee_id: trainee.trainee_id },
      { date: new Date('2024-02-01'), weight: 64.5, trainee_id: trainee.trainee_id },
      { date: new Date('2024-03-01'), weight: 63.8, trainee_id: trainee.trainee_id },
    ];

    weightTracks = [];
    for (const entry of weightTrackDataList) {
      const created = await weightTrackRepo.createWeightTrack(entry);
      weightTracks.push(created);
    }
  });

  afterAll(async () => {
    await sequelize.sync({ force: true });
    await sequelize.close();
  });

  // CREATE
  it('should create a trainee and multiple weight tracks successfully', async () => {
    expect(trainee).toBeDefined();
    expect(trainee.first_name).toBe('Jane');
    expect(weightTracks.length).toBe(3);
    expect(weightTracks[0].weight).toBe(65);
    expect(weightTracks[2].weight).toBe(63.8);
  });

  // READ
  it('should get all weight tracks for a trainee', async () => {
    const allTracks = await weightTrackRepo.getAllWeightTracks();
    expect(allTracks).toBeDefined();
    expect(allTracks.length).toBeGreaterThanOrEqual(3);
    expect(allTracks[0].trainee_id).toBe(trainee.trainee_id);
  });

  it('should get a weight track by ID', async () => {
    const fetched = await weightTrackRepo.getWeightTrackById(weightTracks[0].weight_track_id
);
    expect(fetched).toBeDefined();
    expect(fetched.weight).toBe(65);
  });

  it('should return null for a non-existent weight track', async () => {
    const result = await weightTrackRepo.getWeightTrackById(9999);
    expect(result).toBeNull();
  });

  // UPDATE
  it('should update a weight track successfully', async () => {
    const updated = await weightTrackRepo.updateWeightTrack(weightTracks[1].weight_track_id
, {
      weight: 63,
    });
    expect(updated).toBeDefined();
    expect(updated.weight).toBe(63);
  });

  it('should return null when updating a non-existent track', async () => {
    const updated = await weightTrackRepo.updateWeightTrack(9999, { weight: 70 });
    expect(updated).toBeNull();
  });

  // DELETE
  it('should delete a weight track successfully', async () => {
    const deleted = await weightTrackRepo.deleteWeightTrack(weightTracks[2].weight_track_id
);
    expect(deleted).toBeTruthy();

    const check = await weightTrackRepo.getWeightTrackById(weightTracks[2].weight_track_id
);
    expect(check).toBeNull();
  });

  it('should return 0 when deleting a non-existent weight track', async () => {
    const deleted = await weightTrackRepo.deleteWeightTrack(9999);
    expect(deleted).toBe(0);
  });

  // EDGE CASES
  it('should throw or fail gracefully when creating a weight track with invalid data', async () => {
    await expect(weightTrackRepo.createWeightTrack({ weight: null })).rejects.toThrow();
  });

  it('should return empty array if no weight tracks exist (after deletion)', async () => {
    await weightTrackRepo.deleteWeightTrack(weightTracks[0].weight_track_id
);
    await weightTrackRepo.deleteWeightTrack(weightTracks[1].weight_track_id
);

    const remaining = await weightTrackRepo.getAllWeightTracks();
    expect(Array.isArray(remaining)).toBe(true);
    expect(remaining.length).toBe(0);
  });
});
