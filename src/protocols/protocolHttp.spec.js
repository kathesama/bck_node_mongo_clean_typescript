import InvalidArgument from '../errors/InvalidArgument.js';
import URlLogin from './protocolHttp.js';

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

    const parsedURL = URlLogin.parseURL(
      `http://localhost:3000/login?user=${expectedAuth.user}&password=${expectedAuth.password}`
    );

    // Object.fromEntries convierte un map object en un objeto JS
    const parsedURLQuery = Object.fromEntries(new URLSearchParams(parsedURL.search));

    expect(parsedURLQuery).toEqual(expectedAuth);
  });

  it('User invalid URL', () => {
    const expectError = () => {
      URlLogin.parseURL('');
    };

    expect(expectError).toThrowError(new InvalidArgument('Invalid URL'));
  });
});
