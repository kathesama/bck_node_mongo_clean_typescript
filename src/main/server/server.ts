import app  from '../config/app';
import { environment, logger } from '../config/';
import ConnectDB from '../../infraestructure/databases/mongodb/MongoConnection';

app.listen(environment().serverConfig.PORT, () => {
  logger.info(`Server up at port: \x1b[32m%s\x1b[0m`, `${environment().serverConfig.PORT}`);

  ConnectDB();
});
