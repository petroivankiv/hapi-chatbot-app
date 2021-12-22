import * as Hapi from '@hapi/hapi';
import Logger from '../helper/logger';
import prisma from "./prisma";
import statusPlugin from "./status";
import swaggerPlugin from "./swagger";
import sessionsPlugin from "./sessions";
import users from '../api/users/plugin';
import dialogFlow from '../api/dialog-flow/plugin';

export default class Plugins {
  static async registerAll(server: Hapi.Server): Promise<Error | any> {
    Logger.debug('Plugins registering...');

    await server.register([prisma, users, dialogFlow]);
    await server.register(sessionsPlugin);

    if (process.env.NODE_ENV === 'development') {
      await server.register(statusPlugin);
      await server.register(swaggerPlugin);
    }

    Logger.debug('Plugins registering... Done');
  }
}
