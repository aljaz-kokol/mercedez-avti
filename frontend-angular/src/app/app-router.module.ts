import {NgModule} from '@angular/core';
import {Router, RouterModule, Routes} from '@angular/router';
import {NewsListComponent} from './components/news/news-list/news-list.component';
import {CarListComponent} from './components/car/car-list/car-list.component';
import {CarDetailComponent} from './components/car/car-detail/car-detail.component';

const routes: Routes = [
  { path: '', redirectTo: 'news', pathMatch: 'full'},
  { path: 'news', component: NewsListComponent},
  { path: 'class', children: [
      { path: ':classId', component: CarListComponent },
  ]},
  {path: 'car', children: [
      { path: ':carId', component: CarDetailComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRouterModule {}
