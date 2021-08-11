import {Component, Input} from '@angular/core';
import {CarFull} from '../../../../models/car.model';

@Component({
  selector: 'app-car-basic-data',
  templateUrl: './car-basic-data.component.html',
  styleUrls: ['./car-basic-data.component.css']
})
export class CarBasicDataComponent {
  @Input() car: CarFull;
}
