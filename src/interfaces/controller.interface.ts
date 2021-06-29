import { HttpRequest, HttpResponse } from './http.interface';

//sino implementa el método handle no se va a adaptar el controller a la interface
export interface ControllerInterface {
  // eslint-disable-next-line no-unused-vars
  handle: (httpRequest: HttpRequest) => Promise<HttpResponse>;
}
