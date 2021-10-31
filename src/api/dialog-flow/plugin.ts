import * as Hapi from '@hapi/hapi'
import DialogFlowRoutes from './routes';

const usersPlugin = {
  name: 'app/dialog-flow',
  dependencies: ['prisma'],
  register: async function (server: Hapi.Server) {
    await new DialogFlowRoutes().register(server);
  },
}

export default usersPlugin
