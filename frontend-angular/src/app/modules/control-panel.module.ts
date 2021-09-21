import {NgModule} from '@angular/core';
import {SharedModule} from './shared.module';
import {ControlPanelRoutingModule} from './routes/control-panel-routing.module';
import {ControlPanelComponent} from '../components/control-panel/control-panel.component';
import {CarControlComponent} from '../components/control-panel/car-control/car-control.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import {CreateCarComponent} from '../components/control-panel/car-control/create-car/create-car.component';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    ControlPanelComponent,
    CarControlComponent,
    CreateCarComponent
  ],
    imports: [
        ControlPanelRoutingModule,
        SharedModule,
        MatTooltipModule,
        ReactiveFormsModule
    ]
})
export class ControlPanelModule {}
