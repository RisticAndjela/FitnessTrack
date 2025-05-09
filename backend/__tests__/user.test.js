const { sequelize, User } = require('../db/db_test');
const UserRepository = require('../repositories/UserRepository');
const userRepo = new UserRepository(User);

describe('User Model - CRUD Operations & Edge Cases', () => {
  let createdUser;

  beforeAll(async () => {
    const userData = {
      username: 'edgeuser',
      password: 'pass999',
      first_name: 'Edge',
      last_name: 'Case',
      type: 'Regular'
    };
    createdUser = await userRepo.createUser(userData);
  });
  
  afterAll(async () => {
    await sequelize.sync({ force: true });
    await sequelize.close();
  });

  it('should retrieve all users', async () => {
    const users = await userRepo.getAllUsers();
    expect(users.length).toBeGreaterThanOrEqual(1);
    expect(users.find(u => u.username === 'edgeuser')).toBeDefined();
  });

  it('should get a user by ID', async () => {
    const fetched = await userRepo.getUserById(createdUser.user_id);
    expect(fetched).toBeDefined();
    expect(fetched.username).toBe('edgeuser');
  });

  it('should return null for non-existent user by ID', async () => {
    const nonExistent = await userRepo.getUserById(999999);
    expect(nonExistent).toBeNull();
  });

  it('should update a user successfully', async () => {
    const updated = await userRepo.updateUser(createdUser.user_id, {
      first_name: 'Updated',
      last_name: 'Name'
    });
    expect(updated).toBeDefined();
    expect(updated.first_name).toBe('Updated');
  });

  it('should return null when updating non-existent user', async () => {
    const result = await userRepo.updateUser(999999, { first_name: 'Nope' });
    expect(result).toBeNull();
  });



  it('should throw or fail gracefully when creating user with invalid data', async () => {
    await expect(userRepo.createUser({})).rejects.toThrow();
  });
  
  it('should find a user by username', async () => {
    const foundUser = await userRepo.findByUsername('edgeuser');
    expect(foundUser.username).toBe('edgeuser');
    
  });
  
  it('should return null for non-existent username', async () => {
    const nonExistentUser = await userRepo.findByUsername('nonexistentuser');
    expect(nonExistentUser).toBeNull();
  });
  

  it('should delete a user successfully', async () => {
    const deleted = await userRepo.deleteUser(createdUser.user_id);
    expect(deleted).toBe(1); 
    
    const check = await userRepo.getUserById(createdUser.user_id);
    expect(check).toBeNull();
  });

  it('should return 0 when deleting non-existent user', async () => {
    const result = await userRepo.deleteUser(999999);
    expect(result).toBe(0);
  });
  
});
