class CharacteristicRepository {
    constructor(characteristicModel) {
      this.characteristic = characteristicModel;
    }
  
    async createCharacteristic(data) {
      return await this.characteristic.create(data);
    }
  
    async getAllCharacteristics() {
      return await this.characteristic.findAll();
    }
  
    async getCharacteristicById(id) {
      return await this.characteristic.findByPk(id);
    }
  
    async updateCharacteristic(id, data) {
      const [updated] = await this.characteristic.update(data, { where: { characteristic_id: id } });
      if (updated) return await this.getCharacteristicById(id);
      return null;
    }
  
    async deleteCharacteristic(id) {
      return await this.characteristic.destroy({ where: { characteristic_id: id } });
    }
  }
  
  module.exports = CharacteristicRepository;
  