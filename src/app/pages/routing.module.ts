import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TemplateComponent } from './template.component';

const routes: Routes = [
  {
    path: 'buscador',
    loadChildren: () => import('./buscador/buscador.module').then(mod => mod.BuscadorModule)
  }
]

@NgModule({
  imports: [ 
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class RoutingModule {}
