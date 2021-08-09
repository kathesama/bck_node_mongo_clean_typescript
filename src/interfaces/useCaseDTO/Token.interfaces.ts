/* eslint-disable no-unused-vars */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { TokenModel } from '../../domain/models/Token.model';

// aca se crean las interfaces para luego ser implementadas en el useCase de DB
export interface ITokenModelInterface {
  token: string;
  fingerprint: string;
  user: string;
  type: string;
  expires: Date;
  blacklisted: boolean;
}

export interface GetTokenInterface {
  // eslint-disable-next-line no-unused-vars
  get: (props: Record<string, unknown>) => Promise<ITokenModelInterface>;
}

export interface GetOneTokenInterface {
  // eslint-disable-next-line no-unused-vars
  findOne: (token: any) => Promise<ITokenModelInterface>;
}

export interface createTokenInterface {
  // eslint-disable-next-line no-unused-vars
  create: (token: TokenModel) => Promise<ITokenModelInterface>;
}

export interface DeleteTokenInterface {
  // eslint-disable-next-line no-unused-vars
  deleteMany: (query: any) => Promise<ITokenModelInterface>;
}

export interface CountDocumentTokenInterface {
  // eslint-disable-next-line no-unused-vars
  countDocuments: (query: any) => Promise<ITokenModelInterface>;
}

export interface findOneAndUpdateTokenInterface {
  // eslint-disable-next-line no-unused-vars
  findOneAndUpdate: (query: any, update: any) => Promise<ITokenModelInterface>;
}

export interface handleTokensInterface {
  // eslint-disable-next-line no-unused-vars
  handleTokens: (user: any, fingerprint: string, option: string, deletePreviousTokens: boolean) => Promise<ITokenModelInterface>;
}

export interface handleVerifyEmailTokensInterface {
  // eslint-disable-next-line no-unused-vars
  generateVerifyEmailToken: (user: any, fingerprint: string) => Promise<string>;
}

export interface handleVerifyTokenInterface {
  // eslint-disable-next-line no-unused-vars
  verifyToken: (token: string, type: string, fingerprint: string) => Promise<any>;
}

export interface handleBlacklistTokenInterface {
  // eslint-disable-next-line no-unused-vars
  blacklistToken: (token: string, tokenType: string) => Promise<any>;
}
