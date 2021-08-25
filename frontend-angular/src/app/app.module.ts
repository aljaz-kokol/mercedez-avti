import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
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
import {MatOptionModule, MatRippleModule} from '@angular/material/core';
import {MatIconModule} from '@angular/material/icon';
import {LayoutModule} from '@angular/cdk/layout';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSelectModule} from '@angular/material/select';
import {MatToolbarModule} from '@angular/material/toolbar';
import {HttpErrorInterceptor} from './services/interceptors/http-error.interceptor';
import {CreateUserComponent} from './components/auth/create-user/create-user.component';

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
    CarDataComponent,
    CreateUserComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    AppRouterModule,
    MatRippleModule,
    MatIconModule,
    LayoutModule,
    MatSidenavModule,
    MatSelectModule,
    MatOptionModule,
    MatToolbarModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS,  useClass: HttpErrorInterceptor ,multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
