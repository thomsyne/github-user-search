import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: async () =>
      ( await import('./components/landing/landing.module')).LandingModule
  },
  {
    path: '**',
    redirectTo: '',
    component: LandingComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
