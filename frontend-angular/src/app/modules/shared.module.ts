import {NgModule} from '@angular/core';
import {PageTitleComponent} from '../components/shared/page-title/page-title.component';
import {CommonModule} from '@angular/common';
import {MaterialModule} from './material.module';
import {ImageCarouselComponent} from '../components/shared/image-carousel/image-carousel.component';
import {OverlayComponent} from '../components/shared/overlay/overlay.component';
import {PopupComponent} from '../components/shared/popup/popup.component';

@NgModule({
  declarations: [
    PageTitleComponent,
    OverlayComponent,
    ImageCarouselComponent,
    PopupComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    PageTitleComponent,
    ImageCarouselComponent,
    OverlayComponent,
    CommonModule,
    MaterialModule,
    PopupComponent,
  ]
})
export class SharedModule {}
