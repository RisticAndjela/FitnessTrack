class UserRepository {
  constructor(userModel) {
    this.user = userModel;
  }

  async createUser(data) {
    return await this.user.create(data);
  }

  async getAllUsers() {
    return await this.user.findAll();
  }

  async getUserById(id) {
    return await this.user.findByPk(id);
  }

  async updateUser(id, data) {
    const [updated] = await this.user.update(data, { where: { user_id: id } });
    if (updated) return await this.getUserById(id);
    return null;
  }

  async deleteUser(id) {
    return await this.user.destroy({ where: { user_id: id } });
  }

  async findByUsername(username) {
    return await this.user.findOne({ where: { username: username } });
  }
  
}

module.exports = UserRepository;
