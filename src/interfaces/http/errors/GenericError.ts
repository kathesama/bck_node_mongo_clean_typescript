export class GenericError extends Error {
  name: string;
  content: string;
  statusCode?: number | string;
  timestamp?: Date;

  constructor(error: Error | any, code: number | string = 'UNINITIALIZED', errorName: string, timestamp: Date = new Date()) {
    super(`${error}`);
    this.name = `${errorName}`;
    this.content = `${error.message}`;
    this.statusCode = code;
    this.timestamp = timestamp;
    Error.captureStackTrace(this, this.constructor);
  }
}
