import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-paginador',
  templateUrl: './paginador.component.html',
  styleUrls: ['./paginador.component.scss'],
})
export class PaginadorComponent implements OnInit, OnChanges {
  @Input() quantidadeItem = 200;
  @Input() exibeRegistros = true;
  @Input() itensPorPagina = 20;
  @Output() paginaMudou = new EventEmitter<any>();
  @Input() customTemplate = false;
  @Input() isPaginar = true;
  @Input() currentPage = 0;

  btnitens: number[] = [];
  maxPage = 0;

  constructor() {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['quantidadeItem'] && this.isPaginar) {
      if (Math.ceil(this.quantidadeItem / this.itensPorPagina) - 1 < this.currentPage) {
        this.voltarPagina();
        this.paginaMudou.emit(this.currentPage);
      }
      this.generateBtnItens();
    } else if (changes['itensPorPagina']) {
      this.irParaPrimeira();
      this.generateBtnItens();
    }
  }

  ngOnInit(): void {
    this.generateBtnItens();
  }

  avancarPagina(): void {
    if (this.currentPage < this.maxPage - 1) {
      this.currentPage += 1;
      this.generateBtnItens();

      this.paginaMudou.emit(this.currentPage);
    }
  }

  voltarPagina(): void {
    if (this.currentPage > 0) {
      this.currentPage -= 1;
      this.generateBtnItens();

      this.paginaMudou.emit(this.currentPage);
    }
  }

  irParaUltima(): void {
    if (this.currentPage !== this.maxPage) {
      this.currentPage = this.maxPage - 1;
      this.generateBtnItens();

      this.paginaMudou.emit(this.currentPage);
    }
  }

  irParaPrimeira(): void {
    if (this.currentPage !== 0) {
      this.currentPage = 0;
      this.generateBtnItens();

      this.paginaMudou.emit(this.currentPage);
    }
  }

  vaParaPagina(pagina: number): void {
    if (this.currentPage !== pagina) {
      this.currentPage = pagina;
      this.generateBtnItens();

      this.paginaMudou.emit(pagina);
    }
  }

  generateBtnItens(): void {
    this.maxPage = Math.ceil(this.quantidadeItem / this.itensPorPagina);

    let countItens = 2;
    this.btnitens = [];
    if (this.maxPage <= 7) {
      countItens = 6;
    } else if (this.currentPage <= 2) {
      countItens = 4 - this.currentPage;
    } else if (this.currentPage === this.maxPage - 1) {
      countItens = 4;
    } else if (this.currentPage === this.maxPage - 2) {
      countItens = 3;
    }

    let index = this.currentPage - countItens <= 0 ? 1 : this.currentPage - countItens + 1;
    let final = this.currentPage + 1 + countItens > this.maxPage ? this.maxPage : this.currentPage + countItens + 1;
    if (final > 1000) {
      final = 1000;
    }
    while (index <= final) {
      this.btnitens.push(index);
      index++;
    }
  }
}
