class ServerError extends Error {
  constructor(stack = '') {
    super(`error in server: ${stack}`);

    this.name = 'Error internal server';
    this.stack = stack;
  }
}

export default ServerError;
