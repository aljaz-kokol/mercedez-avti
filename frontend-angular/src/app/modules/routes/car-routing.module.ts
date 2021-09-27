import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CarDetailComponent} from '../../components/car/car-detail/car-detail.component';
import {CarDetailGuard} from '../../services/guards/activate/car-detail.guard';
import {CarClassListComponent} from '../../components/car/car-class-list/car-class-list.component';
import {CarListGuard} from '../../services/guards/activate/car-list.guard';

const routes: Routes = [
  {path: '', children: [
    { path: ':carId', component: CarDetailComponent, canActivate: [CarDetailGuard] },
    { path: 'class', children: [
        { path: ':classId', component: CarClassListComponent, canActivate: [CarListGuard] },
    ]},
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CarRoutingModule {}
