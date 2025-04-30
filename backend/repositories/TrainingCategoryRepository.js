class TrainingCategoryRepository {
    constructor(trainingCategoryModel) {
      this.trainingCategory = trainingCategoryModel;
    }
  
    async createCategory(data) {
      return await this.trainingCategory.create(data);
    }
  
    async getAllCategories() {
      return await this.trainingCategory.findAll();
    }
  
    async getCategoryById(id) {
      return await this.trainingCategory.findByPk(id);
    }
  
    async updateCategory(id, data) {
      const [updated] = await this.trainingCategory.update(data, { where: { category_id: id } });
      if (updated) return await this.getCategoryById(id);
      return null;
    }
  
    async deleteCategory(id) {
      return await this.trainingCategory.destroy({ where: { category_id: id } });
    }
  }
  
  module.exports = TrainingCategoryRepository;
  