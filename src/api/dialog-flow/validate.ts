import * as Joi from 'joi';

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
