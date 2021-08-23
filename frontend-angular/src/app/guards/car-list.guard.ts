import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {CarClassService} from '../services/car-class.service';
import {Car} from '../models/car.model';
import {CarClass} from '../models/car-class.model';

@Injectable({ providedIn: 'root' })
export class CarListGuard implements CanActivate {

  constructor(private carClassService: CarClassService,
              private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.carClassService.getCarClassFromId(route.paramMap.get('classId')).then(data => {
      console.log(data);
      return false;
    });
  }

}
