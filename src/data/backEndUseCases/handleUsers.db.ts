import { UserModel } from '../../domain/models/User.model';
import UserService from '../../domain/services/user.service';
import {
  AddUserInterface,
  DeleteUserInterface,
  GetOneUserAndUpdateInterface,
  GetOneUserByEmailInterface,
  GetOneUserInterface,
  GetUserInterface,
  IUserModelInterface,
  PatchUserInterface,
} from '../../interfaces/useCaseDTO/User.interfaces';

export class HandleUserUseCaseDB
  implements
    GetUserInterface,
    GetOneUserInterface,
    AddUserInterface,
    PatchUserInterface,
    DeleteUserInterface,
    GetOneUserAndUpdateInterface,
    GetOneUserByEmailInterface
{
  userService: any;

  constructor() {
    this.userService = UserService;
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async get(props: Record<string, unknown>): Promise<IUserModelInterface> {
    const userDB: any = await this.userService.get(props);

    return new Promise((resolve) => resolve(userDB));
  }

  async getOneByEmail(email: string): Promise<IUserModelInterface> {
    const userDB: any = await this.userService.getByEmail(email);

    return new Promise((resolve) => resolve(userDB));
  }

  async getOne(user: string): Promise<IUserModelInterface> {
    const userDB: any = await this.userService.getById(user);

    return new Promise((resolve) => resolve(userDB));
  }

  async findOneAndActivate(user: string): Promise<IUserModelInterface> {
    const userDB: any = await this.userService.findOneAndActivate(user);

    return new Promise((resolve) => resolve(userDB));
  }

  async add(user: UserModel): Promise<IUserModelInterface> {
    const userDB: any = await this.userService.add(user);

    return new Promise((resolve) => resolve(userDB));
  }

  async patch(id: string, user: UserModel): Promise<IUserModelInterface> {
    const userDB: any = await this.userService.patch(id, user);

    return new Promise((resolve) => resolve(userDB));
  }

  async delete(id: string): Promise<IUserModelInterface> {
    const userDB: any = await this.userService.delete(id);

    return new Promise((resolve) => resolve(userDB));
  }
}
