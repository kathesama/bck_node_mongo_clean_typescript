import { RoleModel } from '../../domain/models/Role.model';

// aca se crean las interfaces para luego ser implementadas en el useCase de DB
export interface IRoleModelInterface {
  role: string;
}

export interface GetRoleInterface {
  get: () => Promise<IRoleModelInterface>;
}

export interface GetOneRoleInterface {
  // eslint-disable-next-line no-unused-vars
  getOne: (id: string) => Promise<IRoleModelInterface>;
}

export interface AddRoleInterface {
  // eslint-disable-next-line no-unused-vars
  add: (role: RoleModel) => Promise<IRoleModelInterface>;
}

export interface PatchRoleInterface {
  // eslint-disable-next-line no-unused-vars
  patch: (id: string, role: RoleModel) => Promise<IRoleModelInterface>;
}

export interface DeleteRoleInterface {
  // eslint-disable-next-line no-unused-vars
  delete: (id: string) => Promise<IRoleModelInterface>;
}
