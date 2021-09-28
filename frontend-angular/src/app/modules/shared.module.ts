import {NgModule} from '@angular/core';
import {PageTitleComponent} from '../components/shared/page-title/page-title.component';
import {CommonModule} from '@angular/common';
import {MaterialModule} from './material.module';
import {ImageCarouselComponent} from '../components/shared/image-carousel/image-carousel.component';
import {OverlayComponent} from '../components/shared/overlay/overlay.component';
import {PopupComponent} from '../components/shared/popup/popup.component';
import {AlertDialogComponent} from '../components/shared/dialog/alert-dialog/alert-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {AlertComponent} from '../components/shared/alert/alert.component';

@NgModule({
  declarations: [
    PageTitleComponent,
    OverlayComponent,
    ImageCarouselComponent,
    PopupComponent,
    AlertDialogComponent,
    AlertComponent
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
    AlertDialogComponent,
    AlertComponent
  ]
})
export class SharedModule {}
