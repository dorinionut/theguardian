import { Injectable } from '@angular/core';

import { Article } from '../model/article.model';

@Injectable()
export class ArticleMapper {

  static toArticle(data: any): Article {
    const article = new Article();

    article.author = data.fields.byline || '';
    article.body = data.fields.body || '';
    article.date = new Date(data.webPublicationDate) || new Date();
    article.id = data.id || '';
    article.thumbnail = data.fields.thumbnail || '';
    article.title = data.fields.headline || '';
    article.trailText = data.fields.trailText || '';

    return article;
  }

  constructor() {  }

}
