const { sequelize, Characteristic } = require('../db/db_test');
const CharacteristicRepository = require('../repositories/CharacteristicRepository');
const characteristicRepo = new CharacteristicRepository(Characteristic);

let createdCharacteristics = [];

beforeAll(async () => {
  await sequelize.sync({ force: true });

  const characteristics = [
    { name: 'Strength', unit: 'kg' },
    { name: 'Speed', unit: 'm/s' },
    { name: 'Endurance', unit: 'minutes' },
  ];

  for (const data of characteristics) {
    const characteristic = await characteristicRepo.createCharacteristic(data);
    createdCharacteristics.push(characteristic);
  }
});

afterAll(async () => {
  await sequelize.close();
});

describe('Characteristic Model - CRUD Tests', () => {
  it('should get all characteristics from DB', async () => {
    const all = await characteristicRepo.getAllCharacteristics();
    expect(all).toHaveLength(3);
    expect(all[0].name).toBe('Strength');
    expect(all[0].unit).toBe('kg');
    expect(all[1].name).toBe('Speed');
    expect(all[1].unit).toBe('m/s');
    expect(all[2].name).toBe('Endurance');
    expect(all[2].unit).toBe('minutes');
  });

  it('should get each characteristic by ID', async () => {
    for (const c of createdCharacteristics) {
      const fromDb = await characteristicRepo.getCharacteristicById(c.characteristic_id);
      expect(fromDb.characteristic_id).toEqual(c.characteristic_id);
      expect(fromDb.name).toEqual(c.name);
      expect(fromDb.unit).toEqual(c.unit);
    }
  });

  it('should update a characteristic', async () => {
    const update = { name: 'Endurance', unit: 'seconds' };
    const id = createdCharacteristics[2].characteristic_id;
    const updated = await characteristicRepo.updateCharacteristic(id, update);
    expect(updated.unit).toBe('seconds');
  });

  it('should delete a characteristic', async () => {
    const id = createdCharacteristics[2].characteristic_id;
    await characteristicRepo.deleteCharacteristic(id);
    const all = await characteristicRepo.getAllCharacteristics();
    expect(all).toHaveLength(2);
    const deleted = await characteristicRepo.getCharacteristicById(id);
    expect(deleted).toBeNull();
  });
  it('should return null when trying to update a non-existent characteristic', async () => {
    const nonExistentId = 9999;
    const update = { name: 'Fake', unit: 'n/a' };
    const result = await characteristicRepo.updateCharacteristic(nonExistentId, update);
    expect(result).toBeNull();
  });
  it('should not crash when deleting a non-existent characteristic', async () => {
    const nonExistentId = 8888;
    const result = await characteristicRepo.deleteCharacteristic(nonExistentId);
    expect(result).toBe(0); 
  });
  it('should throw or fail gracefully when creating a characteristic with invalid data', async () => {
    const invalidData = { name: null, unit: 123 };
    await expect(characteristicRepo.createCharacteristic(invalidData))
      .rejects
      .toThrow();
  });
});
