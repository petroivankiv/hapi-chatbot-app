import * as Hapi from '@hapi/hapi';
import UserController from './controller';
// import validate from './validate';
import IRoute from '../../helper/route';

export default class UserRoutes implements IRoute {
  async register(server: Hapi.Server): Promise<any> {
    return new Promise(resolve => {
      const controller = new UserController();

      server.route([
        {
          method: 'POST',
          path: '/signup',
          options: {
            handler: controller.signup,
            // validate: validate.signup,
            description: 'Method that creates a new user.',
            tags: ['api', 'signup'],
            auth: false,
          },
        },
        {
          method: 'GET',
          path: '/api/users',
          options: {
            handler: controller.getAllUsers,
            description: 'Method that gets all users.',
            tags: ['api', 'users'],
            auth: false,
          },
        },
      ]);

      resolve(true);
    });
  }
}
