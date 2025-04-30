class RepRepository {
    constructor(repModel) {
      this.rep = repModel;
    }
  
    async createRep(data) {
      return await this.rep.create(data);
    }
  
    async getAllReps() {
      return await this.rep.findAll();
    }
  
    async getRepById(id) {
      return await this.rep.findByPk(id);
    }
  
    async updateRep(id, data) {
      const [updated] = await this.rep.update(data, { where: { rep_id: id } });
      if (updated) return await this.getRepById(id);
      return null;
    }
  
    async deleteRep(id) {
      return await this.rep.destroy({ where: { rep_id: id } });
    }
  }
  
  module.exports = RepRepository;
  