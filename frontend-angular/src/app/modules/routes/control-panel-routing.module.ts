import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ControlPanelComponent} from '../../components/control-panel/control-panel.component';
import {CarControlComponent} from '../../components/control-panel/car-control/car-control.component';
import {CreateCarComponent} from '../../components/control-panel/car-control/create-car/create-car.component';
import {AuthGuard} from '../../services/guards/activate/auth.guard';
import {AdminGuard} from '../../services/guards/activate/admin.guard';
import {DeactivateGuard} from '../../services/guards/deactivate/deactivate.guard';

const routes: Routes = [
  { path: '', children: [
      { path: '', component: ControlPanelComponent },
      { path: 'cars', children: [
          { path: '', component: CarControlComponent },
          { path: 'create', component: CreateCarComponent, canDeactivate: [DeactivateGuard] }
      ]}
  ], canActivate: [AuthGuard, AdminGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ControlPanelRoutingModule {}
