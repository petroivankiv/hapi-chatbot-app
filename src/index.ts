import * as Hapi from '@hapi/hapi'
import Logger from './helper/logger';
import Plugin from "./plugin";
import Router from "./router";

const server: Hapi.Server = Hapi.server({
  port: process.env.PORT || 3000,
  host: process.env.HOST || 'localhost',
})

export async function start(): Promise<Hapi.Server> {
  server.validator(require('@hapi/joi'));

  await Plugin.registerAll(server);
  await Router.loadRoutes(server);

  await server.start()
  return server
}

process.on('unhandledRejection', async (err) => {
  await server.app.prisma.$disconnect()

  Logger.info(`Server - unhandledRejection: ${err}`);
  process.exit(1)
})

start()
  .then((server) => {
    Logger.info(`
      🚀 Server ready at: ${server.info.uri}
      ⭐️ See sample requests: http://pris.ly/e/ts/rest-hapi#3-using-the-rest-api
    `)
  })
  .catch((error) => {
    Logger.info(`Server - There was something wrong: ${error}`);
  })
