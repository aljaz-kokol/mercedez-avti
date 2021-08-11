import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CarClass} from '../../../models/car-class.model';
import {CarClassService} from '../../../services/car-class.service';
import {Car} from '../../../models/car.model';
import {CarService} from '../../../services/car.service';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent implements OnInit {
  private classId: string;

  carClass: CarClass;
  carList: Car[];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private carClassService: CarClassService,
              private carService: CarService) {}

  async ngOnInit(): Promise<void> {
    this.route.paramMap.subscribe(async params => {
      this.classId = params.get('classId');
      this.carClass = await this.carClassService.getCarClassFromId(this.classId);
      this.carList = await this.carService.getCarListFromClass(this.carClass.id);
    });
  }

  public async navigate(path: any[]): Promise<void> {
    await this.router.navigate(path);
  }

  // Return true if the carClass has not yet been instantiated
  public get showSpinner(): boolean {
    return (!this.carClass || !this.carList);
  }
  // Return true if there is at least 1 one in carList array
  public get haveCars(): boolean {
    return this.carList.length > 0;
  }
  // Return page title
  public get pageTitle(): string {
    return `${this.carClass.name}-CLASS`
  }
}
