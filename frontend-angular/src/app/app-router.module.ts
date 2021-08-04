import {NgModule} from '@angular/core';
import {Router, RouterModule, Routes} from '@angular/router';
import {NewsListComponent} from './components/news/news-list/news-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'news', pathMatch: 'full'},
  { path: 'news', component: NewsListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRouterModule {}
