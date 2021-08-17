import { UserModel } from '../models/User.model';
import UserRepository from '../repositories/user.repository';

class UserService {
  async get(props: Record<string, unknown>): Promise<any> {
    const query = { isActive: true };
    // array destructuration
    const [total, users] = await Promise.all([
      UserRepository.countDocuments(query),
      UserRepository.find(query).skip(Number(props.from)).limit(Number(props.limit)),
    ]);

    return { total, users };
  }

  async getById(id: string): Promise<UserModel> {
    const query = {
      $and: [{ _id: id }, { isActive: true }],
    };
    const one: any = UserRepository.findOne(query);
    return one;
  }

  async getByEmail(email: string): Promise<UserModel> {
    const query = {
      $and: [{ email: email }, { isActive: true }],
    };
    // findOne devuelve un solo elemento, find devuelve un array
    const one: any = UserRepository.findOne(query);
    return one;
  }

  async getAllById(id: string): Promise<UserModel[]> {
    const query = {
      $and: [{ _id: id }],
    };
    const one: any = UserRepository.find(query);
    return one;
  }

  async add(user: UserModel): Promise<any> {
    const one: any = UserRepository.create(user);
    return one;
  }

  async patch(id: string, user: UserModel): Promise<any> {
    const one: any = UserRepository.findByIdAndUpdate(id, user, {
      returnOriginal: false,
    });

    return one;
  }

  async delete(id: string): Promise<any> {
    const one: any = UserRepository.findByIdAndUpdate(id, { isActive: false }, { returnOriginal: false });
    return one;
  }

  async findOneAndActivate(id: string): Promise<any> {
    const query = {
      _id: id,
      isActive: false,
    };

    const update = {
      $set: { isActive: true },
    };

    const one: any = await UserRepository.findOneAndUpdate(query, update, { returnOriginal: false });
    return one;
  }
}

export default new UserService();
