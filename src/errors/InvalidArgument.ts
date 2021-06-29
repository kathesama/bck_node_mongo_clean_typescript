export class InvalidArgument extends Error {
  constructor(stack: string) {
    super(`${stack}`);

    this.name = `Invalid argument`;
    this.stack = stack;
  }
}
