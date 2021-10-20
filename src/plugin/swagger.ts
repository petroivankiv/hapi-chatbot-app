import * as  Hapi from '@hapi/hapi';
import * as HapiSwagger from 'hapi-swagger';
import * as Inert from '@hapi/inert';
import * as Vision from '@hapi/vision';

const swaggerPlugin: Array<Hapi.ServerRegisterPluginObject<any>> = [
  {
    plugin: Inert
  },
  {
    plugin: Vision
  },
  {
    plugin: HapiSwagger,
    options: {
      info: {
        title: 'API Documentation',
        version: 'v1.0.0',
        contact: {
          name: 'John doe',
          email: 'johndoe@johndoe.com',
        },
      },
      grouping: 'tags',
      sortEndpoints: 'ordered',
    }
  }
];

export default swaggerPlugin;
