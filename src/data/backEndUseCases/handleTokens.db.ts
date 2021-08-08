import { TokenModel } from '../../domain/models/Token.model';
import TokenService from '../../domain/services/token.service';
import {
  // AddTokenInterface,
  // DeleteTokenInterface,
  // GetOneTokenInterface,
  GetTokenInterface,
  ITokenModelInterface,
  // PatchTokenInterface,
} from '../../interfaces/useCaseDTO/Token.interfaces';

// implements GetTokenInterface, GetOneTokenInterface, AddTokenInterface, PatchTokenInterface, DeleteTokenInterface
export class HandleTokenUseCaseDB implements GetTokenInterface {
  tokenService: any;

  constructor() {
    this.tokenService = TokenService;
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async get(props: Record<string, unknown>): Promise<ITokenModelInterface> {
    const tokenDB: any = await this.tokenService.get(props);

    return new Promise((resolve) => resolve(tokenDB));
  }

  async getOne(token: string): Promise<ITokenModelInterface> {
    const tokenDB: any = await this.tokenService.getById(token);

    return new Promise((resolve) => resolve(tokenDB));
  }

  async add(token: TokenModel): Promise<ITokenModelInterface> {
    const tokenDB: any = await this.tokenService.add(token);

    return new Promise((resolve) => resolve(tokenDB));
  }

  async patch(id: string, token: TokenModel): Promise<ITokenModelInterface> {
    const tokenDB: any = await this.tokenService.patch(id, token);

    return new Promise((resolve) => resolve(tokenDB));
  }

  async delete(id: string): Promise<ITokenModelInterface> {
    const tokenDB: any = await this.tokenService.delete(id);

    return new Promise((resolve) => resolve(tokenDB));
  }
}
