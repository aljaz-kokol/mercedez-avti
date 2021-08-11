import {Component, Input} from '@angular/core';
import {CarFull} from '../../../../models/car.model';

@Component({
  selector: 'app-car-data',
  templateUrl: './car-data.component.html',
  styleUrls: ['./car-data.component.css']
})
export class CarDataComponent {
  @Input() car: CarFull;
}
