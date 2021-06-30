import mongoose, { Mongoose, ConnectionOptions } from 'mongoose';
import { MongoError } from 'mongodb';
import * as dbModule from './MongoConnection';

import { logger } from '../../../main/config/';

describe('connectDatabase', () => {
  it('should connect database succesfully', () => {
    const consoleLogSpyOn = jest.spyOn(logger, 'info');

    const mongooseConnectSpyOn = jest
      .spyOn<Mongoose, 'connect'>(mongoose, 'connect')
      // eslint-disable-next-line no-unused-vars
      .mockImplementationOnce((uri: string, options?: ConnectionOptions, callback?: (err?: MongoError) => void) => {
        if (callback) {
          callback();
        }
        return Promise.resolve(mongoose);
      });

    dbModule.connectDatabase('localhost', { useCreateIndex: true, useNewUrlParser: true });

    expect(mongooseConnectSpyOn).toBeCalledWith(
      'localhost',
      { useCreateIndex: true, useNewUrlParser: true },
      dbModule.callback
    );

    // eslint-disable-next-line quotes
    expect(consoleLogSpyOn).toBeCalledWith(`Conectado a DB en el puerto: 27017 -> \x1b[32m%s\x1b[0m`, `online`);
    consoleLogSpyOn.mockRestore();
  });

  it('connect database error', () => {
    const consoleLogSpyOn = jest.spyOn(logger, 'error');

    const mongooseConnectSpyOn = jest
      .spyOn<Mongoose, 'connect'>(mongoose, 'connect')
      // eslint-disable-next-line no-unused-vars
      .mockImplementationOnce((uri: string, options?: ConnectionOptions, callback?: (err?: MongoError) => void) => {
        if (callback) {
          callback(new MongoError('connect error'));
        }
        return Promise.resolve(mongoose);
      });

    dbModule.connectDatabase('localhost', { useCreateIndex: true, useNewUrlParser: true });

    expect(mongooseConnectSpyOn).toBeCalledWith(
      'localhost',
      { useCreateIndex: true, useNewUrlParser: true },
      dbModule.callback
    );

    expect(consoleLogSpyOn).toBeCalledWith('connect error');
    consoleLogSpyOn.mockRestore();
  });
});
