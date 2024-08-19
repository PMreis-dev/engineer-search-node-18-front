import { NgModule } from '@angular/core';
import {  RouterModule, Routes } from '@angular/router';
import { BuscadorComponent } from './buscador.component';

const routes: Routes = [
  {
    path: 'resultado',
    component: BuscadorComponent
  },
  {
    path: '**',
    redirectTo: '/home'
  }
]


@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ], exports: [RouterModule]
})
export class BuscadorRoutingModule { }
