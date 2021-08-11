import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {HeaderComponent} from './components/header/header.component';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {NavigationComponent} from './components/header/navigation/navigation.component';
import {AppRouterModule} from './app-router.module';
import {NewsListComponent} from './components/news/news-list/news-list.component';
import {NewsCardComponent} from './components/news/news-card/news-card.component';
import {CarListComponent} from './components/car/car-list/car-list.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {CarDetailComponent} from './components/car/car-detail/car-detail.component';
import {CarCardComponent} from './components/car/car-card/car-card.component';
import {PageTitleComponent} from './components/page-title/page-title.component';
import {CarBasicDataComponent} from './components/car/car-detail/car-basic-data/car-basic-data.component';
import {CarDataComponent} from './components/car/car-detail/car-data/car-data.component';
import {MatRippleModule} from '@angular/material/core';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavigationComponent,
    NewsListComponent,
    NewsCardComponent,
    CarListComponent,
    CarDetailComponent,
    CarCardComponent,
    PageTitleComponent,
    CarBasicDataComponent,
    CarDataComponent
  ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        MatCardModule,
        MatButtonModule,
        MatProgressSpinnerModule,
        AppRouterModule,
        MatRippleModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
