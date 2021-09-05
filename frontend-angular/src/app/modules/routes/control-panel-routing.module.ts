import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ControlPanelComponent} from '../../components/control-panel/control-panel.component';
import {CarControlComponent} from '../../components/control-panel/car-control/car-control.component';
import {CreateCarComponent} from '../../components/control-panel/car-control/create-car/create-car.component';
import {AuthGuard} from '../../services/guards/auth.guard';
import {AdminGuard} from '../../services/guards/admin.guard';

const routes: Routes = [
  { path: '', children: [
      { path: '', component: ControlPanelComponent },
      { path: 'cars', children: [
          { path: '', component: CarControlComponent },
          { path: 'create', component: CreateCarComponent }
      ]}
  ], canActivate: [AuthGuard, AdminGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ControlPanelRoutingModule {}
