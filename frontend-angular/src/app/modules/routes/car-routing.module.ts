import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CarDetailComponent} from '../../components/car/car-detail/car-detail.component';
import {CarDetailGuard} from '../../services/guards/car-detail.guard';
import {CarListComponent} from '../../components/car/car-list/car-list.component';
import {CarListGuard} from '../../services/guards/car-list.guard';

const routes: Routes = [
  {path: '', children: [
    { path: ':carId', component: CarDetailComponent, canActivate: [CarDetailGuard] },
    { path: 'class', children: [
        { path: ':classId', component: CarListComponent, canActivate: [CarListGuard] },
    ]},
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CarRoutingModule {}
