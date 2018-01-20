import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable()
export class HttpService<T> {

  public static baseURL : string = "/api";

  private responseType = 'json' as 'json';

  constructor(private httpClient : HttpClient) {  }

  get(url : string, queryParams? : HttpParams) {
    /*
    * Workaround because {HttpParams} doesn't work with {in-memory-web-api}
    */
    if(queryParams) {
      let paramKeys = queryParams.keys();
      if(paramKeys.length) {
        url += '?'
        paramKeys.forEach(key => {
          url += key + '=' + queryParams.get(key) + '&'
        });
      }
    }
    // END Workaround

    return this.httpClient.get<T>(url, {params: queryParams, responseType: this.responseType});
  }
}