import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NewsListComponent} from '../../components/news/news-list/news-list.component';
import {NewsDetailComponent} from '../../components/news/news-deatil/news-detail.component';
import {AuthGuard} from '../../services/guards/auth.guard';
import {NewsDetailGuard} from '../../services/guards/news-detail.guard';

const routes: Routes = [
  { path: '', children: [
      { path: '', component: NewsListComponent },
      { path: ':newsId', component: NewsDetailComponent, canActivate: [AuthGuard, NewsDetailGuard] }
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewsRoutingModule {}
