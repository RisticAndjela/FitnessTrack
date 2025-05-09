class UserService {
    constructor(userRepository) {
      this.userRepository = userRepository;
    }
  
    async createUser(data) {
      return await this.userRepository.createUser(data);
    }
  
    async getAllUsers() {
      return await this.userRepository.getAllUsers();
    }
  
    async getUserById(id) {
      return await this.userRepository.getUserById(id);
    }
  
    async updateUser(id, data) {
      return await this.userRepository.updateUser(id, data);
    }
  
    async deleteUser(id) {
      return await this.userRepository.deleteUser(id);
    }

    async loginUser(username, password) {
        const user = await this.userRepository.findByUsername(username);
        console.log(user);
        if (!user) {
            return null;
        }
        if (user.password !== password) {
            return null;
        }
    
        return user;
    }
   
}

module.exports= UserService;