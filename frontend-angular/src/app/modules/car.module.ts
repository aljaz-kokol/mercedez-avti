import {NgModule} from '@angular/core';
import {CarClassListComponent} from '../components/car/car-class-list/car-class-list.component';
import {CarDetailComponent} from '../components/car/car-detail/car-detail.component';
import {CarCardComponent} from '../components/car/car-card/car-card.component';
import {CarBasicDataComponent} from '../components/car/car-detail/car-basic-data/car-basic-data.component';
import {CarDataComponent} from '../components/car/car-detail/car-data/car-data.component';
import {CarRoutingModule} from './routes/car-routing.module';
import {SharedModule} from './shared.module';

@NgModule({
  declarations: [
    CarClassListComponent,
    CarDetailComponent,
    CarCardComponent,
    CarBasicDataComponent,
    CarDataComponent,
  ],
    imports: [
        SharedModule,
        CarRoutingModule,
    ],
})
export class CarModule {}
