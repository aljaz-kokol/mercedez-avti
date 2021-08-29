import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {News} from '../../../models/news.model';
import {AuthService} from '../../../services/auth.service';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-news-card',
  templateUrl: './news-card.component.html',
  styleUrls: ['./news-card.component.css']
})
export class NewsCardComponent implements OnInit, OnDestroy {
  private authListenerSubs: Subscription;

  @Input() news: News;
  userIsAuth: boolean;

  constructor(private authService: AuthService,
              private router: Router,
              private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.userIsAuth = this.authService.getIsAuth();
    this.authListenerSubs = this.authService.getAuthStatusListener()
      .subscribe(isAuth => {
        this.userIsAuth = isAuth;
      });
  }

  ngOnDestroy(): void {
    this.authListenerSubs.unsubscribe();
  }

  async navigateRelative(path: any[]): Promise<void> {
    await this.router.navigate(path, { relativeTo: this.route });
  }
}
