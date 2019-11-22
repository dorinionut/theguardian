import { Component, OnInit } from '@angular/core';
import { Article } from '../../model/article.interface';
import { ArticleService } from '../../service/article.service';
import { BookmarkService } from '../../service/bookmark.service';

@Component({
  selector: 'app-list',
  templateUrl: 'list.component.html',
  styleUrls: ['list.component.less']
})
export class ListComponent implements OnInit {
  public articles: Article[];
  public showOnlyBookmarks = false;

  constructor(
    private articleService: ArticleService,
    private bookmarkService: BookmarkService
  ) {  }

  ngOnInit() {
    if(localStorage.getItem('showOnlyBookmarks') === 'true') {
      this.showOnlyBookmarks = true;
      this.loadBookmarks();
    }
    else {
      this.loadArticles();
    }
  }

  loadArticles(ids?: string[]){
    this.articles = null;
    this.articleService.list(ids)
      .subscribe(response => this.articles = response);
  }

  loadBookmarks(){
    this.bookmarkService.list()
      .subscribe(bookmarks => {
        if(bookmarks.length){
          this.loadArticles(bookmarks);
        }
        else {
          this.articles = [];
        }
      });
  }

  toggleBookmarks(){
    this.showOnlyBookmarks = !this.showOnlyBookmarks;

    localStorage.setItem('showOnlyBookmarks', this.showOnlyBookmarks.toString());

    if(this.showOnlyBookmarks) {
      this.loadBookmarks();
    }
    else {
      this.loadArticles();
    }
  }
}
