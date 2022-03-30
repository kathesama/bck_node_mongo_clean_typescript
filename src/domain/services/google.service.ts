import { OAuth2Client } from 'google-auth-library';
import { GoogleModel } from '../models/Google.model';
import { TokenPayload } from 'google-auth-library/build/src/auth/loginticket';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
class GoogleService {
  async validate(user: GoogleModel): Promise<TokenPayload> {
    const one: any = client.verifyIdToken({
      idToken: user.idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    return one;
  }
}

export default new GoogleService();
