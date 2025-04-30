class ExerciseTypeRepository {
    constructor(exerciseTypeModel) {
      this.exerciseType = exerciseTypeModel;
    }
  
    async createType(data) {
      return await this.exerciseType.create(data);
    }
  
    async getAllTypes() {
      return await this.exerciseType.findAll();
    }
  
    async getTypeById(id) {
      return await this.exerciseType.findByPk(id);
    }
  
    async updateType(id, data) {
      const [updated] = await this.exerciseType.update(data, { where: { type_id: id } });
      if (updated) return await this.getTypeById(id);
      return null;
    }
  
    async deleteType(id) {
      return await this.exerciseType.destroy({ where: { type_id: id } });
    }
  }
  
  module.exports = ExerciseTypeRepository;
  