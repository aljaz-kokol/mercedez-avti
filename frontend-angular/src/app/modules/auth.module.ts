import { NgModule } from '@angular/core';
import { CreateUserComponent } from '../components/auth/create-user/create-user.component';
import { AuthRoutingModule } from './routes/auth-routing.module';
import { SharedModule } from './shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AlertComponent } from '../components/shared/alert/alert.component';

@NgModule({
  declarations: [
    CreateUserComponent,
    AlertComponent
  ],
  imports: [
    AuthRoutingModule,
    ReactiveFormsModule,
    SharedModule,
  ]
})
export class AuthModule {}
