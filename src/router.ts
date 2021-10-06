import * as Hapi from '@hapi/hapi';
import * as Inert from '@hapi/inert';
import * as Path from 'path';
import UserRoutes from './api/users/routes';
import Logger from './helper/logger';

export default class Router {
  public static async loadRoutes(server: Hapi.Server): Promise<any> {
    Logger.info('Router - Start adding routes');

    await new UserRoutes().register(server);

    await server.register(Inert);

    server.route({
      method: 'GET',
      path: '/',
      handler: function (request, h) {
        return `Hello ${request.query.name || 'World'}!`;
      }
    });

    server.route({
      method: 'GET',
      path: '/health',
      handler: function (request, h) {
        return 'Ok';
      }
    });

    server.route({
      method: 'GET',
      path: '/files/{param*}',
      handler: {
        directory: {
          path: Path.join(__dirname, 'public'),
          listing: true
        }
      }
    });

    server.route({
      method: '*',
      path: '/{any*}',
      handler: function (request, h) {
        return '404 Error! Page Not Found!';
      }
    });

    Logger.info('Router - Finish adding routes');
  }
}
