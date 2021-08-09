import { logger } from '../../main/config';
import { TokenModel } from '../models/Token.model';
import TokenRepository from '../repositories/token.repository';

class TokenService {
  public create = async (token: TokenModel): Promise<any> => {
    return TokenRepository.create(token);
  };

  public deleteMany = async (query: any): Promise<any> => {
    return TokenRepository.deleteMany(query, (err: any) => {
      if (err) {
        logger.error(err);
        throw new Error(err);
      }
    });
  };

  public findOne = async (token: any): Promise<any> => {
    return TokenRepository.findOne(token, (err: any) => {
      if (err) {
        logger.error(err);
        throw new Error(err);
      }
    });
  };

  public countDocuments = async (query: any): Promise<any> => {
    return TokenRepository.countDocuments(query);
  };

  public findOneAndUpdate = async (query: any, update: any): Promise<any> => {
    return TokenRepository.findOneAndUpdate(query, update, { returnOriginal: false });
  };

  public blacklistToken = async (token: string, tokenType: string): Promise<any> => {
    const query = {
      _id: token,
      type: tokenType,
    };

    const update = {
      $set: { blacklisted: true },
    };

    const one: any = await TokenRepository.findOneAndUpdate(query, update, { returnOriginal: false });
    return one;
  };
}

export default new TokenService();
