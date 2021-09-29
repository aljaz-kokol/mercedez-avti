import {Injectable} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {CarService} from '../../car.service';

@Injectable({ providedIn: 'root' })
export class CarDetailGuard implements CanActivate {
  constructor(private carService: CarService,
              private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.carService.getCarFromId(route.paramMap.get('carId')).then(result => {
      return true;
    }).catch(err => {
      return this.router.createUrlTree(['/news'])
    })
  }
}
