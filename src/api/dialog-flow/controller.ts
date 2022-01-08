import * as Boom from '@hapi/boom';
import * as Hapi from '@hapi/hapi';
const {WebhookClient} = require('dialogflow-fulfillment');

import createResponse from '../../helper/response';

const {struct} = require('pb-util');
const dialogflow = require('dialogflow');

const {
  GOOGLE_PROJECT_ID,
  GOOGLE_CLIENT_EMAIL,
  GOOGLE_PRIVATE_KEY,
  DIALOG_FLOW_SESSION_ID,
  DIALOG_FLOW_SESSION_LANG_CODE,
} = process.env;

const projectId = GOOGLE_PROJECT_ID;
const credentials = {
  client_email: GOOGLE_CLIENT_EMAIL,
  private_key: GOOGLE_PRIVATE_KEY,
};

// Create a new session
const sessionClient = new dialogflow.SessionsClient({projectId, credentials});

export default class DialogFlowController {
  constructor() {}

  async textQuery(request: Hapi.Request, h: Hapi.ResponseToolkit) {
    const {text} = request.payload as any;

    // The text query request.
    const dialogFlowRequest = {
      session: sessionClient.sessionPath(
        GOOGLE_PROJECT_ID,
        DIALOG_FLOW_SESSION_ID + request.state.sid
      ),
      queryInput: {
        text: {
          text: text,
          languageCode: DIALOG_FLOW_SESSION_LANG_CODE,
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

      return h.response(createResponse(request, {value: result}));
    } catch (err: any) {
      console.log('error !!!!!!', err);
      return h.response(
        createResponse(request, {boom: Boom.badImplementation(err)})
      );
    }
  }

  async eventQuery(request: Hapi.Request, h: Hapi.ResponseToolkit) {
    const {event, parameters = {foo: 'bar'}} = request.payload as any;

    const dialogFlowRequest = {
      session: sessionClient.sessionPath(
        GOOGLE_PROJECT_ID,
        DIALOG_FLOW_SESSION_ID + request.state.sid
      ),
      queryInput: {
        event: {
          name: event,
          parameters: struct.encode(parameters), //Dialogflow's v2 API uses gRPC. You'll need a jsonToStructProto method to convert your JavaScript object to a proto struct.
          languageCode: DIALOG_FLOW_SESSION_LANG_CODE,
        },
      },
    };

    try {
      const responses = await sessionClient.detectIntent(dialogFlowRequest);
      const result = responses[0].queryResult;

      return h.response(createResponse(request, {value: result}));
    } catch (err: any) {
      console.log('error !!!!!!', err);
      return h.response(
        createResponse(request, {boom: Boom.badImplementation(err)})
      );
    }
  }

  // @todo dialog-flow fulfillment library has an issue so it doesn't work right now
  async productSearchFulfillment(
    request: Hapi.Request,
    h: Hapi.ResponseToolkit
  ) {
    const {prisma} = request.server.app;

    try {
      const agent = new WebhookClient({
        request,
        response: h.response(createResponse(request, {})),
      });

      async function productSearch(agent: any) {
        const demand = await prisma.searchDemand.findUnique({
          where: {
            product: agent.parameters.product,
          },
        });

        if (demand) {
          await prisma.searchDemand.update({
            where: {
              id: demand.id,
            },
            data: {
              counter: demand.counter + 1,
            },
          });
        } else {
          await prisma.searchDemand.create({
            data: {
              product: agent.parameters.product,
              counter: 1,
            },
          });
        }

        const responseText = `
         You are looking for a ${agent.parameters.product}. 
         Here is a link to all related products: http://localhost:4200/shop;product=${agent.parameters.product}
      `;

        agent.add(responseText);
      }

      function fallback(agent: any) {
        agent.add(`I didn't understand`);
        agent.add(`I'm sorry, can you try again?`);
      }

      let intentMap = new Map();
      intentMap.set('product.search', productSearch);
      intentMap.set('Default Fallback Intent', fallback);

      return agent.handleRequest(intentMap);
    } catch (err: any) {
      console.log('error', err);
      return h.response(
        createResponse(request, {boom: Boom.badImplementation(err)})
      );
    }
  }
}
