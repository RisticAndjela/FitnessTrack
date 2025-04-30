class TraineeRepository {
    constructor(traineeModel) {
      this.trainee = traineeModel;
    }
  
    async createTrainee(data) {
      return await this.trainee.create(data);
    }
  
    async getAllTrainees() {
      return await this.trainee.findAll();
    }
  
    async getTraineeById(id) {
      return await this.trainee.findByPk(id);
    }
  
    async updateTrainee(id, data) {
      const [updated] = await this.trainee.update(data, { where: { trainee_id: id } });
      if (updated) return await this.getTraineeById(id);
      return null;
    }
  
    async deleteTrainee(id) {
      return await this.trainee.destroy({ where: { trainee_id: id } });
    }
  }
  
  module.exports = TraineeRepository;
  