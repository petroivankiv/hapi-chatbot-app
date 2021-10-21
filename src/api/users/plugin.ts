import * as Hapi from '@hapi/hapi'
import UserRoutes from './routes';

const usersPlugin = {
  name: 'app/users',
  dependencies: ['prisma'],
  register: async function (server: Hapi.Server) {
    await new UserRoutes().register(server);
  },
}

export default usersPlugin
