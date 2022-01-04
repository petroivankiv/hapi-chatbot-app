export interface PayloadField {
  kind: string;
  stringValue?: string;
  structValue?: Payload;
}

interface Payload {
  fields: {
    [key: string]: PayloadField;
  }
}

export interface QueryTextResponse {
  data: {
    action: string; // "smalltalk.appraisal.welcome";
    queryText: string; // "Welcome"
    speechRecognitionConfidence: number; // 0
    fulfillmentText: string; // "You're so courteous!";
    fulfillmentMessages: {
      message: string; // text
      platform: string; // "PLATFORM_UNSPECIFIED"
      text: {
        text: string[];
      };
      payload: Payload;
    }[];
    parameters: {
      fields: Record<string, { stringValue: string, kind: string}>;
    };
  }[];
  errors: any[];
  meta: {
    method: "POST" | 'GET';
    operation: string; // "/api/text-query"
    paging: any
  };
}
