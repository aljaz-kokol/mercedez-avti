import {Injectable} from '@angular/core';
import {NewsService} from '../news.service';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NewsDetailGuard implements CanActivate {
  constructor(private newsService: NewsService,
              private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const newsId = route.paramMap.get('newsId');
    return this.newsService.getNewsFromId(newsId).then(result => {
      return true;
    }).catch(err => {
      return this.router.createUrlTree(['/']);
    });
  }
}
