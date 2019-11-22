import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

import { Article } from '../../model/article.interface';
import { ArticleService } from '../../service/article.service';
import { BookmarkService } from '../../service/bookmark.service';

@Component({
  selector: 'app-article',
  templateUrl: 'article.component.html',
  styleUrls: ['article.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class ArticleComponent implements OnInit {

  public article: Article;
  public articleImage: SafeStyle;
  public id: string = '';
  public isBookmarked = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private articleService: ArticleService,
    private bookmarkService: BookmarkService,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {  }

  ngOnInit() {
    this.activatedRoute.url.subscribe(segments => {
      this.id = `${segments.join('/')}`;

      this.articleService.get(this.id)
        .subscribe(article => {
            this.article = article;
            this.articleImage = this.sanitizer.bypassSecurityTrustStyle(`url(${this.article.thumbnail})`);

            this.isBookmarked = this.bookmarkService.isBookmarked(this.article.id);
          },
          error => {
            this.articleService.list()
              .subscribe(articles => {
                if(articles && articles.length) {
                  this.router.navigateByUrl(`/${articles[0].id}`);
                }
              });
          });
    });
  }

  toggleBookmark() {
    if(this.isBookmarked) {
      this.bookmarkService.remove(this.article.id);
      this.isBookmarked = false;
    }
    else {
      this.bookmarkService.add(this.article.id);
      this.isBookmarked = true;
    }
  }
}
