import { retryFetch } from './fetch.utils';

export interface IOptionsRequest {
  headers?: {
    [header: string]: any;
  };
  queryParams?: {};
  retries?: number;
  retryDelay?: number;
}

export abstract class ApiService {
  public static async post(apiUrl: string, body: {} = {}, opts: IOptionsRequest = {}): Promise<any> {
    opts.headers = this.getHeaders(opts.headers);
    const options = {
      method: 'POST',
      body: JSON.stringify(body),
      ...opts,
    };

    return retryFetch(apiUrl, options);
  }

  private static getHeaders(headers: {} = {}): {} {
    return { 'Content-Type': 'application/json', ...headers };
  }
}
