import { NgModule } from '@angular/core';
import { BuscadorComponent } from './buscador.component';
import { TemplateModule } from '../template.module';
import { BuscadorRoutingModule } from './buscador-routing.module';
import { ComponentsModule } from '../../components/components.module';
import { CommonModule } from '@angular/common';



@NgModule({
  imports: [CommonModule, ComponentsModule, BuscadorRoutingModule, TemplateModule],
  declarations: [BuscadorComponent],
  exports: [BuscadorComponent],
})
export class BuscadorModule {}
