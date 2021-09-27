import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CreateUserComponent} from '../../components/auth/create-user/create-user.component';
import {LoginComponent} from '../../components/auth/login/login.component';
import {NotAuthenticatedGuard} from '../../services/guards/activate/not-authenticated.guard';

const routes: Routes = [
  { path: '',children: [
      { path: 'signup', component: CreateUserComponent },
      { path: 'login', component: LoginComponent }
  ], canActivate: [NotAuthenticatedGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
