import {Component, OnInit} from '@angular/core';
import {CarClass} from '../../../models/car-class.model';
import {CarClassService} from '../../../services/car-class.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  carClassList: CarClass[];

  constructor(private carClassService: CarClassService, private router: Router) {}

  async ngOnInit(): Promise<void> {
    this.carClassList = await this.carClassService.getCarClassList();
  }

  public async navigate(path: any[]) {
    await this.router.navigate(path);
  }
}
