import {NgModule} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatNativeDateModule, MatOptionModule, MatRippleModule} from '@angular/material/core';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSelectModule} from '@angular/material/select';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDatepickerModule} from '@angular/material/datepicker';

@NgModule({
  exports: [
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatRippleModule,
    MatIconModule,
    MatSidenavModule,
    MatSelectModule,
    MatOptionModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ]
})
export class MaterialModule {}
