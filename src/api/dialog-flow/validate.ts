import * as Joi from 'joi';

export default {
  textQuery: {
    payload: {
      text: Joi.string(),
    },
  },
  eventQuery: {
    payload: {
      event: Joi.string(),
    },
  },
};
