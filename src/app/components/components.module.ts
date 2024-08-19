import { NgModule } from '@angular/core';
import {  CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FiltroAvancadoComponent } from './filtro-avancado/filtro-avancado.component';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MatSelectModule } from '@angular/material/select';
import { PaginadorComponent } from './paginador/paginador.component';
import { CardPerfilResultadoPesquisaComponent } from './card-perfil-resultado-pesquisa/card-perfil-resultado-pesquisa.component';
import { MatCardModule } from '@angular/material/card';
import { CardConteudoPublicacaoFeedComponent } from './card-conteudo-publicacao-feed/card-conteudo-publicacao-feed.component';

@NgModule({
  declarations: [CardConteudoPublicacaoFeedComponent,HeaderComponent, FiltroAvancadoComponent, PaginadorComponent, CardPerfilResultadoPesquisaComponent],
  imports: [
    MatCardModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    NgxMatSelectSearchModule,
    MatSelectModule
  ], exports: [CardConteudoPublicacaoFeedComponent, HeaderComponent, FiltroAvancadoComponent, PaginadorComponent, CardPerfilResultadoPesquisaComponent]
})
export class ComponentsModule { }
