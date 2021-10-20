import * as Hapi from '@hapi/hapi';
import createResponse from '../../helper/response';
import * as Boom from '@hapi/boom';

export default class UserController {
  constructor() {}

  async signup(request: Hapi.Request, h: Hapi.ResponseToolkit) {
    const { prisma } = request.server.app;
    const { name, email } = request.payload as any;

    try {
      const createdUser = await prisma.user.create({
        data: {
          name,
          email,
        },
      })
      return h.response(createResponse(request, { value: createdUser }));
    } catch (err: any) {
      return h.response(createResponse(request, { boom: Boom.badImplementation(err) }));
    }
  }

  async getAllUsers(
    request: Hapi.Request,
    h: Hapi.ResponseToolkit,
  ) {
    const { prisma } = request.server.app;

    try {
      const users = await prisma.user.findMany();

      return h.response(createResponse(request, { value: users }));
    } catch (err: any) {
      return h.response(createResponse(request, { boom: Boom.badImplementation(err) }));
    }
  }
}
