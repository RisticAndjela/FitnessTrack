const { sequelize, User, Trainee, WeightTrack } = require('../db/db_test');

const UserRepository = require('../repositories/UserRepository');
const TraineeRepository = require('../repositories/TraineeRepository');
const WeightTrackRepository = require('../repositories/WeightTrackRepository');

const userRepo = new UserRepository(User);
const traineeRepo = new TraineeRepository(Trainee);
const weightTrackRepo = new WeightTrackRepository(WeightTrack)

afterAll(async () => {
  await sequelize.sync({ force: true });
  await sequelize.close();
});

describe('Trainee Model', () => {
    it('should create a trainee and multiple weight tracks successfully', async () => {
      const userData = {
        username: 'user1',
        password: 'pass1',
        first_name: 'John',
        last_name: 'Doe',
        type: 'Coach',
      };
  
      const user = await userRepo.createUser(userData);
      const traineeData = {
        first_name: 'Jane',
        last_name: 'Smith',
        current_height: '165',
        coach_id: user.user_id,
      };
  
      const trainee = await traineeRepo.createTrainee(traineeData);
  
      const weightTrackDataList = [
        { date: new Date('2024-01-01'), weight: 65, trainee_id: trainee.trainee_id },
        { date: new Date('2024-02-01'), weight: 64.5, trainee_id: trainee.trainee_id },
        { date: new Date('2024-03-01'), weight: 63.8, trainee_id: trainee.trainee_id },
      ];
  
      const weightTracks = [];
  
      for (const entry of weightTrackDataList) {
        const created = await weightTrackRepo.createWeightTrack(entry);
        weightTracks.push(created);
      }
  
      expect(trainee).toBeDefined();
      expect(trainee.first_name).toBe('Jane');
      expect(weightTracks.length).toBe(3);
      expect(weightTracks[0].weight).toBe(65);
      expect(weightTracks[2].weight).toBe(63.8);
    });
  });
  

