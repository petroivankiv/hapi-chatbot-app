import * as Hapi from '@hapi/hapi';
import createResponse from '../../helper/response';
import * as Boom from '@hapi/boom';

export default class DialogFlowController {
  constructor() {}

  async textQuery(request: Hapi.Request, h: Hapi.ResponseToolkit) {
    const { prisma } = request.server.app;
    const { text } = request.payload as any;

    try {
      return h.response(createResponse(request, { value: { res: text || 'Text query' } }));
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
