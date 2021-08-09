import { tokenTypes } from '../../domain/enums/token.enum';
import { TokenModel } from '../../domain/models/Token.model';
import TokenService from '../../domain/services/token.service';
import * as TokenHelper from '../../helpers/token.helper';
import {
  findOneAndUpdateTokenInterface,
  DeleteTokenInterface,
  GetOneTokenInterface,
  GetTokenInterface,
  ITokenModelInterface,
  createTokenInterface,
  CountDocumentTokenInterface,
  handleTokensInterface,
  handleVerifyEmailTokensInterface,
  handleVerifyTokenInterface,
  handleBlacklistTokenInterface,
} from '../../interfaces/useCaseDTO/Token.interfaces';

export class HandleTokenUseCaseDB
  implements
    GetTokenInterface,
    createTokenInterface,
    DeleteTokenInterface,
    GetOneTokenInterface,
    CountDocumentTokenInterface,
    findOneAndUpdateTokenInterface,
    handleTokensInterface,
    handleVerifyEmailTokensInterface,
    handleVerifyTokenInterface,
    handleBlacklistTokenInterface
{
  tokenService: any;
  tokenHelper: any;

  constructor() {
    this.tokenService = TokenService;
    this.tokenHelper = TokenHelper;
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async get(props: Record<string, unknown>): Promise<ITokenModelInterface> {
    const tokenDB: any = await this.tokenService.get(props);

    return new Promise((resolve) => resolve(tokenDB));
  }

  async create(token: TokenModel): Promise<ITokenModelInterface> {
    const tokenDB: any = await this.tokenService.create(token);

    return new Promise((resolve) => resolve(tokenDB));
  }

  async deleteMany(id: string): Promise<ITokenModelInterface> {
    const tokenDB: any = await this.tokenService.deleteMany(id);

    return new Promise((resolve) => resolve(tokenDB));
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async findOne(token: any): Promise<ITokenModelInterface> {
    const tokenDB: any = await this.tokenService.findOne(token);

    return new Promise((resolve) => resolve(tokenDB));
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async countDocuments(query: any): Promise<ITokenModelInterface> {
    const tokenDB: any = await this.tokenService.countDocuments(query);

    return new Promise((resolve) => resolve(tokenDB));
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async findOneAndUpdate(query: any, update: any): Promise<ITokenModelInterface> {
    const tokenDB: any = await this.tokenService.findOneAndUpdate(query, update);

    return new Promise((resolve) => resolve(tokenDB));
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async handleTokens(user: any, fingerprint: string, option: string, deletePreviousTokens = false): Promise<ITokenModelInterface> {
    const tokenDB: any = await this.tokenHelper.handleTokens(user, fingerprint, option, deletePreviousTokens);

    return new Promise((resolve) => resolve(tokenDB));
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async generateVerifyEmailToken(user: any, fingerprint: string): Promise<string> {
    const tokenDB: any = await this.tokenHelper.generateVerifyEmailToken(user, fingerprint);

    return new Promise((resolve) => resolve(tokenDB));
  }

  async verifyToken(token: string, type: string, fingerprint: string): Promise<string> {
    const tokenDB: any = await this.tokenHelper.verifyToken(token, type, fingerprint);

    return new Promise((resolve) => resolve(tokenDB));
  }

  async blacklistToken(token: string, tokenType = tokenTypes.VERIFY_EMAIL): Promise<string> {
    const tokenDB: any = await this.tokenService.blacklistToken(token, tokenType);

    return new Promise((resolve) => resolve(tokenDB));
  }
}
