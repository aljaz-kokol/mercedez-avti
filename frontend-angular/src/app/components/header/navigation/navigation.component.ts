import {Component, OnDestroy, OnInit} from '@angular/core';
import {CarClass} from '../../../models/car-class.model';
import {CarClassService} from '../../../services/car-class.service';
import {Router} from '@angular/router';
import {AuthService} from '../../../services/auth.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit, OnDestroy {
  private authListenerSubs: Subscription;
  carClassList: CarClass[];
  userIsAuth = false;

  constructor(private carClassService: CarClassService,
              private authService: AuthService,
              private router: Router) {}

  async ngOnInit(): Promise<void> {
    this.carClassList = await this.carClassService.getCarClassList();
    this.userIsAuth = this.authService.getIsAuth();
    this.authListenerSubs = this.authService.getAuthStatusListener()
      .subscribe(isAuth => {
        this.userIsAuth = isAuth;
      });
  }

  ngOnDestroy(): void {
    this.authListenerSubs.unsubscribe();
  }

  async onLogout(): Promise<void> {
    await this.authService.logout();
  }

  public async navigate(path: any[]) {
    await this.router.navigate(path);
  }
}
