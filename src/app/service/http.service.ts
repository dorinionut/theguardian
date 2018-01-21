import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class HttpService<T> {

  public static baseURL = 'https://content.guardianapis.com';

  private responseType = 'json' as 'json';

  constructor(
    private httpClient: HttpClient
  ) {  }

  get(url: string, queryParams?: HttpParams) {
    if(queryParams) {
      queryParams = queryParams.append('api-key', environment.apiKey);
    }
    else {
      queryParams = new HttpParams()
        .append('api-key', environment.apiKey);
    }
    return this.httpClient.get<T>(url, {params: queryParams, responseType: this.responseType});
  }
}
