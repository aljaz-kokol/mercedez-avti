import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CarClass} from '../../../models/car-class.model';
import {CarClassService} from '../../../services/car-class.service';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent implements OnInit {
  classId: string;
  carClass: CarClass;
  constructor(private route: ActivatedRoute, private carClassService: CarClassService) {}

  async ngOnInit(): Promise<void> {
    this.route.paramMap.subscribe(async params => {
      this.classId = params.get('classId');
      this.carClass = await this.carClassService.getCarClassFromId(this.classId);
    });
  }

  public get showSpinner(): boolean {
    return !this.carClass;
  }

}
