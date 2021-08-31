import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ControlPanelComponent} from '../../components/control-panel/control-panel.component';
import {CarControlComponent} from '../../components/control-panel/car-control/car-control.component';

const routes: Routes = [
  { path: '', children: [
      { path: '', component: ControlPanelComponent },
      { path: 'cars', component: CarControlComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ControlPanelRoutingModule {}
