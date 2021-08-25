import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {CarClassService} from '../car-class.service';

@Injectable({ providedIn: 'root' })
export class CarListGuard implements CanActivate {

  constructor(private carClassService: CarClassService,
              private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return new Promise(resolve => {
        this.carClassService.getCarClassFromId(route.paramMap.get('classId'))
          .then(data => resolve(true))
          .catch(err => {
            this.router.navigate(['/news'])
            resolve(false);
          });
      });
  }
}
