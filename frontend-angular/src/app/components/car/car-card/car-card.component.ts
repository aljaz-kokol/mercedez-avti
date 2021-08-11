import {Component, Input} from '@angular/core';
import {Car} from '../../../models/car.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-car-card',
  templateUrl: './car-card.component.html',
  styleUrls: ['./car-card.component.css']
})
export class CarCardComponent {
  @Input() car: Car;

  constructor(private router: Router) {}

  // Navigates to the cars detail page
  public async showDetail(): Promise<void> {
    await this.router.navigate(['car', this.car.id]);
  }
}
