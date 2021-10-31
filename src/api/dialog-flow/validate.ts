import * as Joi from '@hapi/joi';

export default {
  textQuery: {
    payload: {
      text: Joi.string(),
    },
  },
  eventQuery: {
    payload: {
      text: Joi.string(),
    },
  },
};
