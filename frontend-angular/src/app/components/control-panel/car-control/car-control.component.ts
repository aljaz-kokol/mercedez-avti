import {Component, OnInit} from '@angular/core';
import {CarClassService} from '../../../services/car-class.service';
import {CarService} from '../../../services/car.service';
import {CarClass} from '../../../models/car-class.model';
import {Car} from '../../../models/car.model';
import {ApiImage} from '../../../shared/api-image';

@Component({
  selector: 'app-car-control',
  templateUrl: './car-control.component.html',
  styleUrls: ['./car-control.component.css']
})
export class CarControlComponent implements OnInit {
  classes: CarClass[];
  cars: Car[];

  constructor(private carClassService: CarClassService,
              private carService: CarService) {}

  getCarsFromClass(carClass: CarClass): Car[] {
    return this.cars.filter(el => el.carClass === carClass.id);
  }

  getCarImage(car: Car): ApiImage {
    return car.images[0];
  }

  classHasCars(carClass: CarClass): boolean {
    return this.getCarsFromClass(carClass).length > 0;
  }

  async ngOnInit(): Promise<void> {
    this.classes = await this.carClassService.getCarClassList();
    this.cars = await this.carService.getCarList();
  }
}
