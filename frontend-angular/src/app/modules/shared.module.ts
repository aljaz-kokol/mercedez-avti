import {NgModule} from '@angular/core';
import {PageTitleComponent} from '../components/shared/page-title/page-title.component';
import {CommonModule} from '@angular/common';
import {MaterialModule} from './material.module';
import {ImageCarouselComponent} from '../components/shared/image-carousel/image-carousel.component';
import {OverlayComponent} from '../components/shared/overlay/overlay.component';

@NgModule({
  declarations: [
    PageTitleComponent,
    OverlayComponent,
    ImageCarouselComponent
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
  ]
})
export class SharedModule {}
