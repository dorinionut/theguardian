import { Routes } from '@angular/router';

import { ArticleComponent } from './view/article/article.component';
import { ListComponent } from './view/list/list.component';

export const routes: Routes = [
  {path: '', component: ListComponent},
  {path: '**', component: ArticleComponent}
]
