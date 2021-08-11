import {Component, OnInit} from '@angular/core';
import {CarService} from '../../../services/car.service';
import {ActivatedRoute} from '@angular/router';
import {CarFull} from '../../../models/car.model';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {
  car: CarFull;

  constructor(private carService: CarService,
              private route: ActivatedRoute) {}

  async ngOnInit(): Promise<void> {
    this.route.paramMap.subscribe(async params => {
      const carId: string = params.get('carId');
      this.car = await this.carService.getCarFullFromId(carId);
    });
  }

  public get showSpinner(): boolean {
    return !this.car;
  }
}
