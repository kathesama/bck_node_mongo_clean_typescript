export class GenericError extends Error {
  name: string;
  content: string;
  code?: number | string;
  timestamp?: Date;

  constructor(error: Error, code: number | string = 'UNINITIALIZED', timestamp: Date = new Date()) {
    super(`${error}`);
    this.name = `${error.name}`;
    this.content = `${error.message}`;
    this.code = code;
    this.timestamp = timestamp;
    Error.captureStackTrace(this, this.constructor);
  }
}
