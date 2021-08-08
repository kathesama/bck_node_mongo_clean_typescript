/* eslint-disable jest/no-conditional-expect */
import { serverErrorHelper } from '../helpers/http.helper';
import { URlLogin } from './protocolHttp';

describe('Protocols and Query', () => {
  it('Login valid URL', () => {
    const parsedURL = URlLogin.parseURL('http://localhost:3000/login');

    expect(parsedURL.href).toBe('http://localhost:3000/login');
    expect(parsedURL.port).toBe('3000');
  });

  it('Login response query', () => {
    const expectedAuth = {
      user: 'user',
      password: 'password',
    };

    const parsedURL = URlLogin.parseURL(`http://localhost:3000/login?user=${expectedAuth['user']}&password=${expectedAuth['password']}`);

    // Object.fromEntries convierte un map object en un objeto JS
    const parsedURLQuery = Object.fromEntries(new URLSearchParams(parsedURL.search));

    expect(parsedURLQuery).toEqual(expectedAuth);
  });

  it('User invalid URL', () => {
    try {
      URlLogin.parseURL('');
    } catch (err) {
      // console.log(err);
      const error = serverErrorHelper(new Error('Error: Invalid URL'));

      // eslint-disable-next-line jest/no-try-expect
      expect(err.statusCode).toEqual(error.statusCode);
    }
  });
});
