import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';

@Component({
  selector: 'app-card-conteudo-publicacao-feed',
  templateUrl: './card-conteudo-publicacao-feed.component.html',
  styleUrls: ['./card-conteudo-publicacao-feed.component.scss'],
})
export class CardConteudoPublicacaoFeedComponent implements OnInit, OnChanges {
  @Input() publicacao: any;
  @Input() termo!: string;
  @Input() listaUnidadesPodeEditar!: any[];

  @ViewChild('videoPlayer') videoplayer!: ElementRef;

  socialData: any;
  mediaAvaliacao!: number;
  videoExecutando = false;
  TIPO_PUBLICACAO = {
    NOTICIA: {
      CODIGO: 1,
      TEXTO: 'Notícia',
    },
    VIDEO: {
      CODIGO: 2,
      TEXTO: 'Vídeo',
    },
    ARTIGO: {
      CODIGO: 3,
      TEXTO: 'Artigo',
    },
    DOCUMENTO_CORPORATIVO: {
      CODIGO: 4,
      TEXTO: 'Documento Corporativo',
    },
    COMENTARIO: {
      CODIGO: 5,
      TEXTO: 'Comentário',
    },
    GUIA: {
      CODIGO: 6,
      TEXTO: 'Guias e Normas',
    },
    AGENCIA_NOTICIA: {
      CODIGO: 7,
      TEXTO: 'Agência de Notícias',
    },
  };
  cacheInfoAutor: any = {};
  perfilUnidade: any;
  retirarCard: boolean = false;
  textoCarregado: boolean = false;
  descricaoTipo: string = '';
  urlPublicacao: string = '';

  constructor(
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['publicacao'].firstChange) {
      this.textoCarregado = true;
    }
  }

  async ngOnInit(): Promise<void> {
    if (this.publicacao['codigoTipoPublicacao']) {
      this.publicacao.tipoPublicacao = {
        codigoTipoPublicacao: this.publicacao['codigoTipoPublicacao'],
      };
    }


    let textoTotal = '';
    if (this.publicacao && this.publicacao.conteudo && this.publicacao.conteudo.blocos) {
      this.publicacao.assuntoPublicacao = this.publicacao.assuntoPublicacao;
      this.publicacao.conteudo.blocos.forEach((bloco: any) => {
        textoTotal = textoTotal.concat(bloco.textoBloco, ' ');
      });

      this.publicacao.tipoPublicacao.descricaoTipoPublicacao = this.publicacao.tipoPublicacao.descricaoTipoPublicacao;
      this.encontrarElemento(textoTotal, this.termo);
    }
    if (this.publicacao.tipoPublicacao?.codigoTipoPublicacao === 4 && this.publicacao.tipoGuia) {
      this.descricaoTipo = this.publicacao.tipoGuia?.tituloTipoGuia;
    } else {
      this.descricaoTipo = this.publicacao.tipoPublicacao?.descricaoTipoPublicacao;
    }

    this.detalharPublicacao(this.publicacao?.codigoPublicacao, this.publicacao?.tipoPublicacao?.codigoTipoPublicacao);
  }

  encontrarElemento(text: string = '', termo: string = '') {
    text = text.toLowerCase().replace(/<[^>]*>/g, '');

    let regex = new RegExp(`(.{1,20}||(?!.{1,20}))(${termo})(.{1,${160 - termo.length}}||(?!.{1,${160 - termo.length}}))`, 'i');

    if (!regex.exec(text)) {
      const arrayPalavras = termo.trim().split(' ');
      for (const palavraAtual of arrayPalavras) {
        if (palavraAtual.length > 2) {
          const length = 160 - palavraAtual.length;
          regex = new RegExp(`(.{1,20}||(?!.{1,20}))(${palavraAtual})(.{1,160}||(?!.{1,${length}}))`, 'i');
          if (regex.exec(text)) {
            termo = palavraAtual;
            break;
          }
        }
      }
    }

    if (regex.exec(text) && regex.exec(text)?.length) {
      this.publicacao.preVisualizacao.texto = '...' + regex.exec(text)![0].replace(termo, '<strong>' + termo + '</strong>');
    }
  }

  validaPermissao(): boolean {
    let temPermissaoMenuTresPontinhos = false;

    switch (this.publicacao?.tipoPublicacao?.codigoTipoPublicacao) {
      case 1:
          temPermissaoMenuTresPontinhos = true;
        break;
      case 4:
          temPermissaoMenuTresPontinhos = true;
        break;
    }
      if (!!this.listaUnidadesPodeEditar.find((unidade) => unidade.idPerfilUnidade === this.publicacao.idPerfilUnidade)) {
        temPermissaoMenuTresPontinhos = true;
      }
    return temPermissaoMenuTresPontinhos;
  }

  detalharPublicacao(codigoPublicacao: string, tipoConteudo: number): void {
    if (codigoPublicacao) {
      if (tipoConteudo === 1) {
        this.urlPublicacao = `/noticia/detalhar/${codigoPublicacao}`;
      } else if (tipoConteudo === 2) {
        this.urlPublicacao = `/video/detalhar/${codigoPublicacao}`;
      } else if (tipoConteudo === 4) {
        this.urlPublicacao = `/documento-corporativo/detalhar/${codigoPublicacao}`;
      }
    }
  }

  executarVideo(): void {
    this.videoExecutando = true;
    this.videoplayer.nativeElement.play();
  }


  removeCard(evento: any) {
    this.retirarCard = evento;
  }
}
