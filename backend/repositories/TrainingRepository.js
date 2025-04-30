class TrainingRepository {
    constructor(trainingModel) {
      this.training = trainingModel;
    }
  
    async createTraining(data) {
      return await this.training.create(data);
    }
  
    async getAllTrainings() {
      return await this.training.findAll();
    }
  
    async getTrainingById(id) {
      return await this.training.findByPk(id);
    }
  
    async updateTraining(id, data) {
      const [updated] = await this.training.update(data, { where: { training_id: id } });
      if (updated) return await this.getTrainingById(id);
      return null;
    }
  
    async deleteTraining(id) {
      return await this.training.destroy({ where: { training_id: id } });
    }
  }
  
  module.exports = TrainingRepository;
  