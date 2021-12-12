import * as Hapi from '@hapi/hapi';
import * as Boom from '@hapi/boom';
const { struct } = require('pb-util');
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
      const result = responses[0].queryResult;

      if (result.intent) {
        console.log(`  Intent: ${result.intent.displayName}`);
      } else {
        console.log(`  No intent matched.`);
      }

      return h.response(createResponse(request, { value: result }));
    } catch (err: any) {
      console.log('error !!!!!!', err);
      return h.response(createResponse(request, { boom: Boom.badImplementation(err) }));
    }
  }

  async eventQuery(
    request: Hapi.Request,
    h: Hapi.ResponseToolkit,
  ) {
    const { prisma } = request.server.app;
    const { event, parameters = {foo: 'bar'} } = request.payload as any;

    const dialogFlowRequest = {
      session: sessionPath,
      queryInput: {
        event: {
          name: event,
          parameters: struct.encode(parameters), //Dialogflow's v2 API uses gRPC. You'll need a jsonToStructProto method to convert your JavaScript object to a proto struct.
          languageCode: process.env.DIALOG_FLOW_SESSION_LANG_CODE,
        },
      }
    };

    try {
      const responses = await sessionClient.detectIntent(dialogFlowRequest);
      const result = responses[0].queryResult;

      return h.response(createResponse(request, { value: result }));
    } catch (err: any) {
      console.log('error !!!!!!', err);
      return h.response(createResponse(request, { boom: Boom.badImplementation(err) }));
    }
  }
}
