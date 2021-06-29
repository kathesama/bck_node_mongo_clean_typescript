export class MissingFormalParamenter extends Error {
  constructor(stack: string) {
    super(`${stack}`);

    this.name = `Missing formal parameter`;
    this.stack = stack;
  }
}
