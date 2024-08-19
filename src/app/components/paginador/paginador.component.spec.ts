import { ComponentFixture, TestBed } from '@angular/core/testing';
import { importComponents, importProviders, importsModule } from 'mock/configure-module.mock';
import { PaginadorComponent } from './paginador.component';

describe('PaginadorComponent', () => {
  let component: PaginadorComponent;
  let fixture: ComponentFixture<PaginadorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaginadorComponent, ...importComponents],
      providers: importProviders,
      imports: importsModule,
    }).compileComponents();

    fixture = TestBed.createComponent(PaginadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('expects avancarPagina() to have been called', () => {
    spyOn(component, 'avancarPagina').and.callThrough();
    component.currentPage = 1;
    component.maxPage = 3;
    component.avancarPagina();
    expect(component.avancarPagina).toHaveBeenCalled();
  });

  it('expects voltarPagina() to have been called', () => {
    spyOn(component, 'voltarPagina').and.callThrough();
    component.currentPage = 3;
    component.voltarPagina();
    expect(component.voltarPagina).toHaveBeenCalled();
  });

  it('expects irParaUltima() to have been called', () => {
    spyOn(component, 'irParaUltima').and.callThrough();
    component.maxPage = 5;
    component.currentPage = 2;
    component.irParaUltima();
    expect(component.irParaUltima).toHaveBeenCalled();
  });

  it('expects irParaPrimeira() to have been called', () => {
    spyOn(component, 'irParaPrimeira').and.callThrough();
    component.currentPage = 2;
    component.irParaPrimeira();
    expect(component.irParaPrimeira).toHaveBeenCalled();
  });

  it('expects vaParaPagina() to have been called', () => {
    spyOn(component, 'vaParaPagina').and.callThrough();
    component.currentPage = 2;
    component.vaParaPagina(5);
    expect(component.vaParaPagina).toHaveBeenCalled();
  });

  afterEach(() => {
    fixture.destroy();
  });
});
