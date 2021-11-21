import * as Hapi from '@hapi/hapi';
import * as Boom from '@hapi/boom';
import createResponse from '../../helper/response';
const dialogflow = require('dialogflow');

// Create a new session
const sessionClient = new dialogflow.SessionsClient();
const sessionPath = sessionClient.sessionPath(process.env.GOOGLE_PROJECT_ID, process.env.DIALOG_FLOW_SESSION_ID);

export default class DialogFlowController {
  constructor() {}

  async textQuery(request: Hapi.Request, h: Hapi.ResponseToolkit) {
    const { prisma } = request.server.app;
    const { text } = request.payload as any;

    // The text query request.
    const dialogFlowRequest = {
      session: sessionPath,
      queryInput: {
        text: {
          text: text,
          languageCode: process.env.DIALOG_FLOW_SESSION_LANG_CODE,
        },
      },
    };

    try {
      // Send request and log result
      const responses = await sessionClient.detectIntent(dialogFlowRequest);
      console.log('Detected intent');
      const result = responses[0].queryResult;
      console.log(`  Query: ${result.queryText}`);
      console.log(`  Response: ${result.fulfillmentText}`);

      if (result.intent) {
        console.log(`  Intent: ${result.intent.displayName}`);
      } else {
        console.log(`  No intent matched.`);
      }

      return h.response(createResponse(request, { value: result }));
    } catch (err: any) {
      return h.response(createResponse(request, { boom: Boom.badImplementation(err) }));
    }
  }

  async eventQuery(
    request: Hapi.Request,
    h: Hapi.ResponseToolkit,
  ) {
    const { prisma } = request.server.app;
    const { text } = request.payload as any;

    try {
      return h.response(createResponse(request, { value: { res: text || 'Event query' } }));
    } catch (err: any) {
      return h.response(createResponse(request, { boom: Boom.badImplementation(err) }));
    }
  }
}
