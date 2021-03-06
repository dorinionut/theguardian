import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';

import { Article } from '../model/article.interface';
import { ArticleMapper } from '../util/article.mapper';
import { HttpService } from './http.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  constructor(
    private httpService: HttpService<any>
  ) {  }

  list(ids?: string[]): Observable<Article[]> {
    const url = `${HttpService.baseURL}/search`;
    let queryParams = new HttpParams()
      .append('show-fields', 'byline,headline,thumbnail,trailText')
      .append('use-date', 'first-publication');

    if (ids) {
      queryParams = queryParams.append('ids', ids.join(','));
    }

    return this.httpService.get(url, queryParams)
      .pipe(
        map(response => {
          response = response.response;
          const articles = [];

          if (response.status === 'ok' && response.results.length) {
            response.results.forEach(result => {
              articles.push(ArticleMapper.toArticle(result));
            });
          }

          return articles;
        })
      );
  }

  get(id: string): Observable<Article> {
    const url = `${HttpService.baseURL}/${id}`;
    const queryParams = new HttpParams()
      .append('show-fields', 'byline,body,headline,thumbnail')
      .append('show-elements', 'image');

    return this.httpService.get(url, queryParams)
      .pipe(
        map(response => {
          response = response.response;
    
          if (response.status === 'ok' && response.content) {
            return ArticleMapper.toArticle(response.content);
          }
          else {
            throw new Error('No article found');
          }
        })
      );
  }
}
