import {Injectable} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {CarService} from '../services/car.service';

@Injectable({ providedIn: 'root' })
export class CarDetailGuard implements CanActivate {
  constructor(private carService: CarService,
              private router: Router,
              private activeRoute: ActivatedRoute) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return new Promise(resolve => {
      this.carService.getCarFromId(route.paramMap.get('carId'))
        .then(data => resolve(true))
        .catch(err => {
          this.router.navigate(['/news']);
          resolve(false);
        });
    });
  }

}
