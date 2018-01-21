import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ArticleComponent } from './view/article/article.component';
import { ArticleService } from './service/article.service';
import { ListComponent } from './view/list/list.component';
import { HttpService } from './service/http.service';
import { routes } from './app.routing';

@NgModule({
  declarations: [
    AppComponent,
    ArticleComponent,
    ListComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    ArticleService,
    HttpService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
