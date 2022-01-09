import { PayloadField, QueryTextResponse } from './types/response.interface';

export function getParamValue(parameters: Record<string, PayloadField>, param: string): string {
  const parameter: PayloadField = parameters[param];
  return parameter ? (parameter[parameter.kind as keyof PayloadField] as string) : '';
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

export function getLinkData(res: QueryTextResponse) {
  const payload = res.data[0].fulfillmentMessages[1]?.payload;
  const linkRecord: any = payload && getParamValue(payload.fields, 'link');

  if (!linkRecord) {
    return undefined;
  }

  const params = getParams(res);

  return {
    label: getParamValue(linkRecord.fields, 'label'),
    path: getParamValue(linkRecord.fields, 'path'),
    params,
  };
}

export function getQuickReplies(res: QueryTextResponse) {
  const payload = res.data[0].fulfillmentMessages[1]?.payload;
  const record: any = payload && getParamValue(payload.fields, 'quick_replies');

  if (!record) {
    return undefined;
  }

  return record.values.map((r: any) => {
    return {
      label: getParamValue(r.structValue.fields, 'label'),
      event: getParamValue(r.structValue.fields, 'event'),
      text: getParamValue(r.structValue.fields, 'text'),
      link: getParamValue(r.structValue.fields, 'link'),
    };
  });
}
