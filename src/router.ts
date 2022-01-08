import * as Hapi from '@hapi/hapi';
import * as Inert from '@hapi/inert';
import Logger from './helper/logger';

export default class Router {
  public static async loadRoutes(server: Hapi.Server): Promise<any> {
    Logger.info('Router - Start adding routes');

    await server.register(Inert);

    server.route({
      method: 'GET',
      path: '/health',
      handler: () => 'Ok',
    });

    server.route({
      method: 'GET',
      path: '/{param*}',
      handler: {
        directory: {
          path: '.',
        },
      },
    });

    server.route({
      method: '*',
      path: '/{any*}',
      handler: () => '404 Error! Page Not Found!',
    });

    Logger.info('Router - Finish adding routes');
  }
}
