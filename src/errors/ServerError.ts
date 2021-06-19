export class ServerError extends Error{
  constructor(stack: string){
    super(`error in server: ${stack}`);

    this.name = 'Error internal server';
    this.stack = stack;
  }
}
