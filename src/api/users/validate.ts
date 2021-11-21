import * as Joi from 'joi';

export default {
  signup: {
    payload: {
      name: Joi.string().required(),
      email: Joi.string().required(),
    },
  },
};
