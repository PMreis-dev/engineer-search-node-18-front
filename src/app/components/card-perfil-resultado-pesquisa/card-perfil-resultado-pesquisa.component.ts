import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-perfil-resultado-pesquisa',
  templateUrl: './card-perfil-resultado-pesquisa.component.html',
  styleUrls: ['./card-perfil-resultado-pesquisa.component.scss'],
})
export class CardPerfilResultadoPesquisaComponent implements OnChanges {
  @Input() perfil: any;
  imagemCarregada: boolean = false;
  textoCarregado: boolean = false;

  constructor(
    private clipboard: Clipboard,
    private router: Router,
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['perfil'].firstChange) {
      this.textoCarregado = true;
    }
  }

  carregouImagem(carregou: boolean): void {
    this.imagemCarregada = carregou;
  }

  copiandoDado(dado: string, event: Event): void {
    event.stopPropagation();
    const isCopied = this.clipboard.copy(dado);
  }

  async abrirUnidade() {
    const codigoUOR = this.perfil.usuario?.codigoUOR || this.perfil.unidade?.codigoUOR;

    if (!codigoUOR) {
      return;
    }

    
  }

  abrirUsuario() {
    this.router.navigate([`/perfil/usuario/${this.perfil.usuario.codigoUsuario}/grupo-trabalho`]);
  }
}
