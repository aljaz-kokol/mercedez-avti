import {NgModule} from '@angular/core';
import {PageTitleComponent} from '../components/shared/page-title/page-title.component';
import {CommonModule} from '@angular/common';
import {MaterialModule} from './material.module';

@NgModule({
  declarations: [
    PageTitleComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    PageTitleComponent,
    CommonModule,
    MaterialModule
  ]
})
export class SharedModule {}
