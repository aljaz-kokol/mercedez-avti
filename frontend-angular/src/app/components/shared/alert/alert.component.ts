import {Component, Input} from '@angular/core';
import {AlertState} from '../../../shared/alert-state';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent {
  successState = AlertState.success;
  failureState = AlertState.failure;

  @Input() state: AlertState;
  @Input() message: string;
}
