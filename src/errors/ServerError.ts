export class ServerError extends Error {
  constructor(stack: string) {
    super(`${stack}`);

    this.name = 'Error Internal in the Server';
    this.stack = stack;
  }
}
