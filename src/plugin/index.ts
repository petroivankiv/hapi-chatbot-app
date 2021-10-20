import * as Hapi from '@hapi/hapi';
import Logger from '../helper/logger';
import prisma from "./prisma";
import statusPlugin from "./status";
import swaggerPlugin from "./swagger";
import users from '../api/users/plugin';

export default class Plugins {
  static async registerAll(server: Hapi.Server): Promise<Error | any> {
    Logger.debug('Plugins registering...');

    await server.register([prisma, users]);

    if (process.env.NODE_ENV === 'development') {
      await server.register(statusPlugin);
      await server.register(swaggerPlugin);
    }

    Logger.debug('Plugins registering... Done');
  }
}
