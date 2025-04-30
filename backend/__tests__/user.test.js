const { sequelize, User } = require('../db/db_test');
const UserRepository = require('../repositories/UserRepository');
const userRepo = new UserRepository(User);

afterAll(async () => {
  await sequelize.sync({ force: true });
  await sequelize.close();
});

describe('User Model', () => {
  it('should create a user successfully', async () => { 
    const userData = {
      username: 'testuser3',
      password: 'pass123',
      first_name: 'Test',
      last_name: 'User',
      type: 'Regular'
    };
    const user = await userRepo.createUser(userData);
    
    expect(user).toBeDefined();
    expect(user.username).toBe('testuser3');
    expect(user.type).toBe('Regular');
  });
});
describe('User Model - Multiple Users', () => {
    it('should create multiple users with unique IDs', async () => {
      const users = [
        {
          username: 'user1',
          password: 'pass1',
          first_name: 'John',
          last_name: 'Doe',
          type: 'Regular',
        },
        {
          username: 'user2',
          password: 'pass2',
          first_name: 'Jane',
          last_name: 'Smith',
          type: 'Coach',
        },
        {
          username: 'user3',
          password: 'pass3',
          first_name: 'Alice',
          last_name: 'Walker',
          type: 'Regular',
        },
      ];
  
      const createdUsers = [];
      for (const data of users) {
        const user = await userRepo.createUser(data);
        createdUsers.push(user);
      }
  
      expect(createdUsers).toHaveLength(3);
      expect(new Set(createdUsers.map(u => u.user_id)).size).toBe(3);
    });
  });
  
