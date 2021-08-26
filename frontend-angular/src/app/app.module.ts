import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LayoutModule } from '@angular/cdk/layout';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { NavigationComponent } from './components/header/navigation/navigation.component';
import { AppRoutingModule } from './modules/routes/app-routing.module';
import { CreateUserComponent } from './components/auth/create-user/create-user.component';
import { CarModule } from './modules/car.module';
import { MaterialModule } from './modules/material.module';
import { NewsModule } from './modules/news.module';
import { CoreModule } from './modules/core.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavigationComponent,
    CreateUserComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    LayoutModule,
    AppRoutingModule,
    MaterialModule,
    CarModule,
    NewsModule,
    CoreModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
