import {
  Model,
  type CreationAttributes,
  type ModelStatic,
  type WhereOptions,
  type Attributes,
} from "sequelize";

abstract class BaseRepository<T extends Model> {
  protected model: ModelStatic<T>;
  constructor(model: ModelStatic<T>) {
    this.model = model;
  }

  async findById(id: number): Promise<T | null> {
    const record = await this.model.findByPk(id);
    if (!record) {
      return null;
    }

    return record;
  }

  async findAll(): Promise<T[]> {
    const records = await this.model.findAll({});
    if (!records) {
      return [];
    }

    return records;
  }

  async deleteById(whereOptions: WhereOptions<T>): Promise<void> {
    const record = await this.model.destroy({
      where: {
        ...whereOptions,
      },
    });
    if (!record) {
      throw new Error(`Record with id ${whereOptions} not found `);
    }
    return;
  }

  async create(data: CreationAttributes<T>): Promise<T> {
    const record = await this.model.create(data);
    if (!record) {
      throw new Error("Record Not Created");
    }
    return record;
  }

  async update(id: number, data: Partial<Attributes<T>>) {
    const record = await this.model.findByPk(id);

    if (!record) {
      throw new Error(`Record with id:${id} not found`);
    }

    await record.update(data);

    return record;
  }
}

export default BaseRepository;
