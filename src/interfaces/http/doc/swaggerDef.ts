import { environmentConfig } from '../../../main/config';

const swaggerDef = {
  openapi: '3.0.0',
  info: {
    title: 'node-rest-server API documentation',
    version: environmentConfig().VERSION,
    license: {
      name: 'Apache-2.0',
      // eslint-disable-next-line quotes
      url: `https://github.com/kathesama/bck_node_mongo_clean/blob/V${environmentConfig().VERSION}/LICENSE`,
    },
  },
  servers: [
    {
      url: `http://localhost:${environmentConfig().serverConfig.PORT}`,
    },
  ],
};

export { swaggerDef as swaggerDefinition };
