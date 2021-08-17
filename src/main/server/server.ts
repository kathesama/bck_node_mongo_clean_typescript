import App from '../config/app';
import { logger } from '../config/';

const app = App;

app.start();

const exitHandler = () => {
  if (app) {
    app.close();
  }
};

const unexpectedErrorHandler = (error: any) => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  exitHandler();
  if (app) {
    app.close();
  }
});
