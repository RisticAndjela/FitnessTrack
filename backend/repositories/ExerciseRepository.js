class ExerciseRepository {
    constructor(exerciseModel) {
      this.exercise = exerciseModel;
    }
  
    async createExercise(data) {
      return await this.exercise.create(data);
    }
  
    async getAllExercises() {
      return await this.exercise.findAll();
    }
  
    async getExerciseById(id) {
      return await this.exercise.findByPk(id);
    }
  
    async updateExercise(id, data) {
      const [updated] = await this.exercise.update(data, { where: { exercise_id: id } });
      if (updated) return await this.getExerciseById(id);
      return null;
    }
  
    async deleteExercise(id) {
      return await this.exercise.destroy({ where: { exercise_id: id } });
    }
  }
  
  module.exports = ExerciseRepository;
  