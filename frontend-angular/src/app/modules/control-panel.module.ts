import {NgModule} from '@angular/core';
import {SharedModule} from './shared.module';
import {ControlPanelRoutingModule} from './routes/control-panel-routing.module';
import {ControlPanelComponent} from '../components/control-panel/control-panel.component';

@NgModule({
  declarations: [
    ControlPanelComponent
  ],
  imports: [
    ControlPanelRoutingModule,
    SharedModule
  ]
})
export class ControlPanelModule {}
