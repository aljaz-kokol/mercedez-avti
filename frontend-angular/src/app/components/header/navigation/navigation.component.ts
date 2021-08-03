import {Component, OnInit} from '@angular/core';
import {CarClass} from '../../../models/car-class.model';
import {CarClassService} from '../../../services/car-class.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  carClassList: CarClass[];

  constructor(private carClassService: CarClassService) {}

  async ngOnInit(): Promise<void> {
    this.carClassList = await this.carClassService.getCarClassList();
  }
}
