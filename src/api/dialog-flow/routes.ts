import * as Hapi from '@hapi/hapi';
import DialogFlowController from './controller';
import validate from './validate';
import IRoute from '../../helper/route';

export default class DialogFlowRoutes implements IRoute {
  async register(server: Hapi.Server): Promise<any> {
    return new Promise(resolve => {
      const controller = new DialogFlowController();

      server.route([
        {
          method: 'POST',
          path: '/api/text-query',
          options: {
            cors: true,
            handler: controller.textQuery,
            validate: validate.textQuery,
            description: 'Method that handles text query.',
            tags: ['api', 'dialog-flow'],
            auth: false,
            state: {
              parse: true,
              failAction: 'error'
            }
          },
        },
        {
          method: 'POST',
          path: '/api/event-query',
          options: {
            handler: controller.eventQuery,
            validate: validate.eventQuery,
            description: 'Method that handles event query.',
            tags: ['api', 'dialog-flow'],
            auth: false,
          },
        },
      ]);

      resolve(true);
    });
  }
}
