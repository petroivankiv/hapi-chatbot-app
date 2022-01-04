import { ResponseType } from './types/message.interface';
import { PayloadField, QueryTextResponse } from './types/response.interface';

export function getParamValue(parameters: Record<string, PayloadField>, param: string): string {
  const parameter: PayloadField = parameters[param];
  return parameter[parameter.kind as keyof PayloadField] as string;
}

export function getParams({ data }: QueryTextResponse) {
  const parameters = data[0].parameters.fields;
  const paramKeys = Object.keys(parameters);

  return paramKeys?.length
    ? paramKeys.reduce((acc, param) => {
        const value = getParamValue(parameters, param);

        if (!value) {
          return acc;
        }

        return { ...acc, [param]: value };
      }, {})
    : undefined;
}

export function getText({ data }: QueryTextResponse): string {
  return data[0].fulfillmentMessages[0].text.text[0];
}

export function getLinkData(res: QueryTextResponse, responseType: ResponseType) {
  const payload = res.data[0].fulfillmentMessages[1]?.payload;

  if (responseType !== ResponseType.Link) {
    return undefined;
  }

  const linkRecord: any = getParamValue(payload.fields, 'link');
  const params = getParams(res);

  return {
    label: getParamValue(linkRecord.fields, 'label'),
    path: getParamValue(linkRecord.fields, 'path'),
    params,
  };
}

export function getQuickReplies(res: QueryTextResponse, responseType: ResponseType) {
  const payload = res.data[0].fulfillmentMessages[1]?.payload;

  if (responseType !== ResponseType.QuickReplies) {
    return undefined;
  }

  const record: any = getParamValue(payload.fields, 'quick_replies');
  const text = getParamValue(payload.fields, 'text');

  const options = record.values.map((r: any) => {
    return {
      label: getParamValue(r.structValue.fields, 'label'),
      payload: getParamValue(r.structValue.fields, 'payload'),
    };
  });

  return { text, options };
}

export function getResponseType({ data }: QueryTextResponse): ResponseType {
  const payload = data[0].fulfillmentMessages[1]?.payload;

  if (!payload) {
    return ResponseType.Text;
  }

  return getParamValue(payload.fields, 'response_type') as ResponseType;
}
