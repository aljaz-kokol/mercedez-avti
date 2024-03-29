import {Component, Input} from '@angular/core';
import {transition, trigger, useAnimation} from '@angular/animations';
import {stretchIn, stretchOut} from '../../../animations/popup-animation';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['popup.component.css'],
  animations: [
    trigger('popup', [
      transition('void => *', [useAnimation(stretchOut)]),
      transition('* => void', [useAnimation(stretchIn)]),
    ])
  ]
})
export class PopupComponent {
  @Input() toolTip: string = 'Popup btn';
  @Input() absolutePos: boolean = false;
  @Input() overlayEntireScreen: boolean = true;

  popUpVisible = false;

  togglePopUp() {
    this.popUpVisible = !this.popUpVisible;
  }

  get position(): string {
    if (this.absolutePos) {
      return 'absolute';
    }
    return 'fixed'
  }
}
