import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CreateUserComponent} from '../../components/auth/create-user/create-user.component';

const routes: Routes = [
  { path: '', children: [
      { path: 'signup', component: CreateUserComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
