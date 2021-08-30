import {Component, Input} from '@angular/core';
import {Car} from '../../../models/car.model';
import {Router} from '@angular/router';
import {ApiImage} from '../../../shared/api-image';

@Component({
  selector: 'app-car-card',
  templateUrl: './car-card.component.html',
  styleUrls: ['./car-card.component.css']
})
export class CarCardComponent {
  @Input() car: Car;

  constructor(private router: Router) {}

  get image(): ApiImage {
    return this.car.images[0];
  }

  // Navigates to the cars detail page
  async showDetail(): Promise<void> {
    await this.router.navigate(['car', this.car.id]);
  }
}
