import { EntityRepository, Like, Repository } from 'typeorm';

import NewModule from '../models/NewModuleModel';

interface INewModule {
  name:string;
  isActive?: boolean;
}

@EntityRepository(NewModule)
export default class NewModuleRepository extends Repository<NewModule> {
  async createIfNotExist(
    name: string,
    isActive: boolean,
  ): Promise<void> {
    await this.createQueryBuilder()
      .insert()
      .values(this.create({
        name,
        isActive,
      }))
      .execute();
  }

  async findAll(): Promise<NewModule[]> {
    return this.find();
  }

  async findByName(name:string): Promise<NewModule> {
    return this.findOne({ name: Like(`%${name}%`) });
  }

  async findById(id:string): Promise<NewModule> {
    return this.findOne({ where: { id } });
  }

  async updateNewModule(id:string, updatedNewModules:INewModule): Promise<NewModule> {
    await this.update(id, updatedNewModules);
    return this.findById(id);
  }
}
