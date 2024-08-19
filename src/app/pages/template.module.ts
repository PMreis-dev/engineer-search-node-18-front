import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemplateComponent } from './template.component';
import { RoutingModule } from './routing.module';
import { ComponentsModule } from '../components/components.module';



@NgModule({
  declarations: [TemplateComponent],
  imports: [
    CommonModule,
    RoutingModule, 
    ComponentsModule
  ], exports: [TemplateComponent]
})
export class TemplateModule {
}
