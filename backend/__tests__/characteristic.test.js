const { sequelize, Characteristic } = require('../db/db_test');
const CharacteristicRepository = require('../repositories/CharacteristicRepository');
const characteristicRepo = new CharacteristicRepository(Characteristic);

afterAll(async () => {
  await sequelize.sync({ force: true });
  await sequelize.close();
});

describe('Characteristic Model', () => {
  it('should create a characteristic successfully', async () => {
    const characteristicData = {
      name: 'Strength',
      unit: 'kg',
    };
    const characteristic = await characteristicRepo.createCharacteristic(characteristicData);

    expect(characteristic).toBeDefined();
    expect(characteristic.name).toBe('Strength');
    expect(characteristic.unit).toBe('kg');
  });
});

describe('Characteristic Model - Multiple Characteristics', () => {
  it('should create multiple characteristics with unique IDs', async () => {
    const characteristics = [
      { name: 'Strength', unit: 'kg' },
      { name: 'Speed', unit: 'm/s' },
      { name: 'Endurance', unit: 'minutes' },
    ];

    const createdCharacteristics = [];
    for (const data of characteristics) {
      const characteristic = await characteristicRepo.createCharacteristic(data);
      createdCharacteristics.push(characteristic);
    }

    expect(createdCharacteristics).toHaveLength(3);
    expect(new Set(createdCharacteristics.map(c => c.characteristic_id)).size).toBe(3);
  });
});
