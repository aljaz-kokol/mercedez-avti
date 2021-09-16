import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CarClass} from '../../../models/car-class.model';
import {CarClassService} from '../../../services/car-class.service';
import {Car} from '../../../models/car.model';
import {CarService} from '../../../services/car.service';
import {ApiImage} from '../../../shared/api-image';

@Component({
  selector: 'app-car-class-list',
  templateUrl: './car-class-list.component.html',
  styleUrls: ['./car-class-list.component.css']
})
export class CarClassListComponent implements OnInit {
  carClass: CarClass;
  carList: Car[];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private carClassService: CarClassService,
              private carService: CarService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(async params => {
      const classId = params.get('classId');
      this.carClass = await this.carClassService.getCarClassFromId(classId);
      this.carList = await this.carService.getCarListFromClass(classId);
    });
  }

  public async navigate(path: any[]): Promise<void> {
    await this.router.navigate(path);
  }

  // Return true if the carClass has not yet been instantiated
  public get showSpinner(): boolean {
    return (!this.carList || !this.carClass);
  }
  // Return true if there is at least 1 one in carList array
  public get hasCars(): boolean {
    return this.carList.length > 0;
  }

  public get hasSubclasses(): boolean {
    return  this.carClass.subclasses.length > 0;
  }
}
