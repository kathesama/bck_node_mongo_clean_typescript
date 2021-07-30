/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */

import { RoleModel } from '../models/Role.model';
import RoleRepository from '../repositories/role.repository';

class RoleService {
  async get(): Promise<any> {
    const all: any = RoleRepository.find({});
    return all;
  }

  async getById(id: string): Promise<any> {
    const one: any = RoleRepository.findById(id);
    return one;
  }

  async add(role: string): Promise<any> {
    const one: any = RoleRepository.create(role);
    return one;
  }
}

export default RoleService;
