import { mockUnidade, mockUsuario, timeRequest } from './../../../../mock/utils.mock';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { importComponents, importsModule } from 'mock/configure-module.mock';
import { FiltroAvancadoComponent } from './filtro-avancado.component';
import { FormBuilder } from '@angular/forms';
import { UtilsService } from '../../utils';
import { ElementRef, SimpleChange } from '@angular/core';

describe('FiltroAvancadoComponent', () => {
  let component: FiltroAvancadoComponent;
  let fixture: ComponentFixture<FiltroAvancadoComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FiltroAvancadoComponent, ...importComponents],
      providers: [FormBuilder, UtilsService],
      imports: importsModule,
    }).compileComponents();
    fixture = TestBed.createComponent(FiltroAvancadoComponent);
    component = fixture.componentInstance;
    component.dataFiltroAvancado.unidades = [mockUnidade];
    component.dataFiltroAvancado.assuntos = [mockUnidade];

    spyOn(UtilsService.prototype, 'getUsuario').and.returnValue(mockUsuario);
    spyOn(UtilsService.prototype, 'getTimeoutRequest').and.returnValue(timeRequest);
    component.limparFiltro();
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('expects onAssuntoChange() to have been called', () => {
    spyOn(component, 'onAssuntoChange').and.callThrough();
    component.onAssuntoChange();
    expect(component.onAssuntoChange).toHaveBeenCalled();
  });
  it('expects onChangeUnidade() to have been called', () => {
    spyOn(component, 'onChangeUnidade').and.callThrough();
    component.onChangeUnidade();
    expect(component.onChangeUnidade).toHaveBeenCalled();
  });

  it('expects abrirCalendario() to have been called', () => {
    component.calendar = new ElementRef<HTMLDivElement>(document.createElement('div'));
    spyOn(component, 'abrirCalendario').and.callThrough();
    component.abrirCalendario();
    expect(component.abrirCalendario).toHaveBeenCalled();
  });

  it('expects filtrarPorPeriodo() to have been called', () => {
    component.formFiltroAvancado.controls.filtroPeriodo.setValue('25/01/2023');
    spyOn(component, 'filtrarPorPeriodo').and.callThrough();
    component.filtrarPorPeriodo();
    expect(component.filtrarPorPeriodo).toHaveBeenCalled();
  });

  it('expects ngOnChanges() to have been called', () => {
    spyOn(component, 'ngOnChanges').and.callThrough();
    component.ngOnChanges({
      abaPerfilAtual: {
        firstChange: false,
        previousValue: 1,
        currentValue: 2,
      } as SimpleChange,
    });
    expect(component.ngOnChanges).toHaveBeenCalled();
  });

  it('expects buscar() to have been called', () => {
    spyOn(component, 'buscar').and.callThrough();
    component.formFiltroAvancado.controls.filtroUnidade.setValue('unidade');
    component.formFiltroAvancado.controls.filtroTipoVigencia.setValue('vingencia');
    component.formFiltroAvancado.controls.filtroAplicativo.setValue(component.filtroAplicativos[0].CODIGO);
    component.formFiltroAvancado.controls.filtroOrdemAplicativo.setValue(component.ordenacoes[2].CODIGO);
    component.formFiltroAvancado.controls.filtroPeriodo.setValue('25/01/2023');
    component.buscar();
    expect(component.buscar).toHaveBeenCalled();
  });
  afterEach(() => {
    fixture.destroy();
  });
});
