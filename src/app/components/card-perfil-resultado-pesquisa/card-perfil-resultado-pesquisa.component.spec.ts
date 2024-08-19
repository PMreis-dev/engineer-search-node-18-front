import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardPerfilResultadoPesquisaComponent } from './card-perfil-resultado-pesquisa.component';
import { importComponents, importProviders, importsModule } from '../../../../mock/configure-module.mock';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { UtilsService } from 'src/app/utils';
import { timeRequest } from 'mock/utils.mock';
describe('CardResultadoPesquisaComponent', () => {
  let component: CardPerfilResultadoPesquisaComponent;
  let fixture: ComponentFixture<CardPerfilResultadoPesquisaComponent>;

  const PERFIL_USUARIO = {
    isUsuario: true,
    usuario: { codigoUsuario: '', codigoUnidade: '', telefone: '', siglaUnidade: '', nomeCargo: '', nome: '', avatar: '', codigoUOR: 1 },
  };

  const PERFIL_UNIDADE = {
    isUsuario: false,
    unidade: { codigoUnidade: '', nome: '', telefone: '', tipo: '', codigoUOR: 0 },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardPerfilResultadoPesquisaComponent, ...importComponents],
      providers: importProviders,
      imports: importsModule,
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
    fixture = TestBed.createComponent(CardPerfilResultadoPesquisaComponent);
    component = fixture.componentInstance;
    component.perfil = PERFIL_USUARIO;
    spyOn(UtilsService.prototype, 'getTimeoutRequest').and.returnValue(timeRequest);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should abrirUnidade', () => {
    spyOn(component, 'abrirUnidade').and.callThrough();
    component.perfil = PERFIL_UNIDADE;
    component.abrirUnidade();
    expect(component.abrirUnidade).toHaveBeenCalled();
  });

  it('should abrirUsuario', () => {
    spyOn(component, 'abrirUsuario').and.callThrough();
    component.perfil = PERFIL_USUARIO;
    component.abrirUsuario();
    expect(component.abrirUsuario).toHaveBeenCalled();
  });

  it('should copy', () => {
    spyOn(component, 'copiandoDado').and.callThrough();

    let event = {
      stopPropagation: () => {},
    };

    component.copiandoDado('', event as Event);
    expect(component.copiandoDado).toHaveBeenCalled();
  });

  afterEach(() => {
    fixture.destroy();
  });
});
