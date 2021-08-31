import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.css']
})
export class ControlPanelComponent {
  controlItems: string[] = [
    'News',
    'Cars',
    'Car Classes',
    'Car Types',
    'Fuel Types'
  ];

  constructor(private router: Router,
              private route: ActivatedRoute) {}

  async onNavigate(controlItem: string): Promise<void> {
    const path = controlItem.replace(' ', '-').toLowerCase();
    await this.router.navigate([path], {
      relativeTo: this.route
    });
  }
}
