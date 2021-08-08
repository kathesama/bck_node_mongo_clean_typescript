import jwt from 'jsonwebtoken';
import { AuthenticationToken } from '../../interfaces/jwtToken.interface';

export class JwtAdapter implements AuthenticationToken {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  constructor(private readonly seed: string, private readonly expire: any) {
    this.seed = seed;
    this.expire = expire;
  }

  async token(value: string): Promise<string> {
    const token = await jwt.sign(
      {
        value: value,
      },
      this.seed,
      { expiresIn: this.expire }
    );

    return token;
  }
}
