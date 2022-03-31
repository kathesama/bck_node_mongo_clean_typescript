import { RoleModel } from '../models/Role.model';
import RoleRepository from '../repositories/role.repository';

class RoleService {
  async get(): Promise<any> {
    const query = { isActive: true };
    const all: any = RoleRepository.find(query);
    return all;
  }

  async getById(id: any): Promise<any> {
    const query = {
      $and: [{ _id: id }, { isActive: true }],
    };
    const one: any = RoleRepository.find(query);
    return one;
  }

  async getByName(name: string): Promise<any> {
    const query = {
      $and: [{ role: name }, { isActive: true }],
    };
    const one: any = RoleRepository.findOne(query);
    return one;
  }

  async add(role: string): Promise<any> {
    const one: any = RoleRepository.create(role);
    return one;
  }

  async patch(id: string, role: RoleModel): Promise<any> {
    const one: any = RoleRepository.findByIdAndUpdate(id, role, {
      returnOriginal: false,
    });

    return one;
  }

  async delete(id: string): Promise<any> {
    const one: any = RoleRepository.findByIdAndUpdate(id, { isActive: false }, { returnOriginal: false });

    return one;
  }
}

export default new RoleService();
