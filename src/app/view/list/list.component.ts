import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../../service/article.service';

@Component({
  selector: 'app-list',
  templateUrl: 'list.component.html',
  styleUrls: ['list.component.less']
})
export class ListComponent implements OnInit {
  private list: any[];

  constructor(
    private articleService: ArticleService
  ) {  }

  ngOnInit() {

    this.articleService.list().subscribe(response => this.list = response);
  }
}
