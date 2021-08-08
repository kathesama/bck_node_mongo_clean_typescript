export class GenericError extends Error {
  name: string;
  content: string;
  statusCode?: number | string;
  timestamp?: Date;

  constructor(error: Error | string, code: number | string = 'UNINITIALIZED', errorName: string, timestamp: Date = new Date(), getFullStack = false) {
    super(`${error}`);
    this.name = `${errorName}`;
    this.content = `${error}`;
    this.statusCode = code;
    this.timestamp = timestamp;

    if (!getFullStack) {
      this.stack = this.stack.split('\n')[0];
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
