import { Injectable } from '@angular/core';

import { Article } from '../model/article.interface';

@Injectable()
export class ArticleMapper {

  public static toArticle(data: any): Article {
    return {
      author : data.fields.byline || '',
      body : data.fields.body || '',
      date : new Date(data.webPublicationDate) || new Date(),
      id : data.id || '',
      thumbnail : data.fields.thumbnail || '',
      title : data.fields.headline || '',
      trailText : data.fields.trailText || ''
    };
  }

  constructor() {  }

}
