import { Component } from '@angular/core';
import {BreakpointObserver} from '@angular/cdk/layout';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  mobileScreen: boolean;
  showNavigation: boolean;

  constructor(private breakpointObserver: BreakpointObserver) {
    this.breakpointObserver.observe('(max-width: 820px)').subscribe(result => {
      this.mobileScreen = result.matches;
      this.showNavigation = !this.mobileScreen;
    });
  }

  toggleNavigation(): void {
     this.showNavigation = !this.showNavigation;
  }
}
