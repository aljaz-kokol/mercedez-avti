import {NgModule} from '@angular/core';
import {PageTitleComponent} from '../components/shared/page-title/page-title.component';
import {CommonModule} from '@angular/common';
import {MaterialModule} from './material.module';
import {ImageCarouselComponent} from '../components/shared/image-carousel/image-carousel.component';
import {OverlayComponent} from '../components/shared/overlay/overlay.component';
import {PopupComponent} from '../components/shared/popup/popup.component';
import {ChoiceDialogComponent} from '../components/shared/dialog/choice-dialog/choice-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {AlertComponent} from '../components/shared/alert/alert.component';
import {MessageDialogComponent} from '../components/shared/dialog/message-dialog/message-dialog.component';

@NgModule({
  declarations: [
    PageTitleComponent,
    OverlayComponent,
    ImageCarouselComponent,
    PopupComponent,
    ChoiceDialogComponent,
    AlertComponent,
    MessageDialogComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    MatDialogModule
  ],
  exports: [
    PageTitleComponent,
    ImageCarouselComponent,
    OverlayComponent,
    CommonModule,
    MaterialModule,
    PopupComponent,
    ChoiceDialogComponent,
    AlertComponent,
    MessageDialogComponent
  ]
})
export class SharedModule {}
