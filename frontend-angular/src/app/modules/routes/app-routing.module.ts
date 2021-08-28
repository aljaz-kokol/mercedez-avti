import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'news', pathMatch: 'full'},
  { path: 'car', loadChildren: () => import('../car.module').then(module => module.CarModule) },
  { path: 'news', loadChildren: () => import('../news.module').then(module => module.NewsModule) },
  { path: 'auth', loadChildren: () => import('../auth.module').then(module => module.AuthModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
