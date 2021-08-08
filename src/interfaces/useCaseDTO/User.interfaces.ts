import { UserModel } from '../../domain/models/User.model';

// aca se crean las interfaces para luego ser implementadas en el useCase de DB
export interface IUserModelInterface {
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  password: string;
  image: string;
  role: string;
  isActive: boolean;

  toJson(): string;
}

export interface GetUserInterface {
  // eslint-disable-next-line no-unused-vars
  get: (props: Record<string, unknown>) => Promise<IUserModelInterface>;
}

export interface GetOneUserInterface {
  // eslint-disable-next-line no-unused-vars
  getOne: (id: string) => Promise<IUserModelInterface>;
}

export interface GetOneUserAndUpdateInterface {
  // eslint-disable-next-line no-unused-vars
  findOneAndActivate: (id: string) => Promise<IUserModelInterface>;
}

export interface AddUserInterface {
  // eslint-disable-next-line no-unused-vars
  add: (user: UserModel) => Promise<IUserModelInterface>;
}

export interface PatchUserInterface {
  // eslint-disable-next-line no-unused-vars
  patch: (id: string, user: UserModel) => Promise<IUserModelInterface>;
}

export interface DeleteUserInterface {
  // eslint-disable-next-line no-unused-vars
  delete: (id: string) => Promise<IUserModelInterface>;
}
