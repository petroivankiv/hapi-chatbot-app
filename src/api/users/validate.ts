import * as Joi from '@hapi/joi';

export default {
  signup: {
    payload: {
      name: Joi.string().required(),
      email: Joi.string().required(),
    },
  },
};
