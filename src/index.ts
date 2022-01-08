import * as Hapi from '@hapi/hapi';
import * as Path from 'path';
import * as Joi from 'joi';
import {v4 as uuidv4} from 'uuid';

import Logger from './helper/logger';
import Plugin from './plugin';
import Router from './router';

const server: Hapi.Server = Hapi.server({
  port: process.env.PORT || 3000,
  host: process.env.HOST || '0.0.0.0',
  routes: {
    cors: {
      origin: ['*'], // an array of origins or 'ignore'
      headers: [
        'Accept',
        'Authorization',
        'Content-Type',
        'If-None-Match',
        'Accept-language',
        'Set-Cookie',
      ],
      exposedHeaders: ['Accept'], // an array of exposed headers - 'Access-Control-Expose-Headers',
      additionalExposedHeaders: ['Set-Cookie'], // an array of additional exposed headers
      maxAge: 60,
      credentials: true, // boolean - 'Access-Control-Allow-Credentials'
    },
    files: {
      relativeTo: Path.join(__dirname, '../web'),
    },
  },
});

export async function start(): Promise<Hapi.Server> {
  server.validator(Joi);

  await Plugin.registerAll(server);
  await Router.loadRoutes(server);

  server.state('sid', {
    ttl: null,
    isSecure: true,
    isHttpOnly: true,
    encoding: 'base64json',
    clearInvalid: false,
    strictHeader: true,
  });

  server.ext('onPreHandler', function (request, h) {
    if (!request.state.sid) {
      h.state('sid', uuidv4());
    }

    // @todo dialogflow fulfilment relies on request.body
    // @ts-ignore
    request['body'] = request.payload;

    return h.continue;
  });

  await server.start();
  return server;
}

process.on('unhandledRejection', async err => {
  await server.app.prisma.$disconnect();

  Logger.info(`Server - unhandledRejection: ${err}`);
  process.exit(1);
});

start()
  .then(server => {
    Logger.info(`
      🚀 Server ready at: ${server.info.uri}
      ⭐️ See sample requests: http://pris.ly/e/ts/rest-hapi#3-using-the-rest-api
    `);
  })
  .catch(error => {
    Logger.info(`Server - There was something wrong: ${error}`);
  });
