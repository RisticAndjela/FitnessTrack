class WeightTrackRepository {
    constructor(weightTrackModel) {
      this.weightTrack = weightTrackModel;
    }
  
    async createWeightTrack(data) {
      return await this.weightTrack.create(data);
    }
  
    async getAllWeightTracks() {
      return await this.weightTrack.findAll();
    }
  
    async getWeightTrackById(id) {
      return await this.weightTrack.findByPk(id);
    }
  
    async updateWeightTrack(id, data) {
      const [updated] = await this.weightTrack.update(data, { where: { weight_track_id: id } });
      if (updated) return await this.getWeightTrackById(id);
      return null;
    }
  
    async deleteWeightTrack(id) {
      return await this.weightTrack.destroy({ where: { weight_track_id: id } });
    }
  }
  
  module.exports = WeightTrackRepository;
  