import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NewsListComponent} from './components/news/news-list/news-list.component';
import {CarListComponent} from './components/car/car-list/car-list.component';
import {CarDetailComponent} from './components/car/car-detail/car-detail.component';
import {CarListGuard} from './services/guards/car-list.guard';
import {CarDetailGuard} from './services/guards/car-detail.guard';
import {CreateUserComponent} from './components/auth/create-user/create-user.component';

const routes: Routes = [
  { path: '', redirectTo: 'news', pathMatch: 'full'},
  { path: 'news', component: NewsListComponent},
  { path: 'class', children: [
      { path: ':classId', component: CarListComponent, canActivate: [CarListGuard] },
  ]},
  {path: 'car', children: [
      { path: ':carId', component: CarDetailComponent, canActivate: [CarDetailGuard] }
  ]},
  {path: 'auth', children: [
      { path: 'signup', component: CreateUserComponent }
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRouterModule {}
