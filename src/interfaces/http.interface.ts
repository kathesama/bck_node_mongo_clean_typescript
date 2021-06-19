/* eslint-disable @typescript-eslint/no-explicit-any */
export interface HttpResponse {
  statusCode: number;
  body: any
}

// ? es opcional
export interface HttpRequest {
  body?: any
}

