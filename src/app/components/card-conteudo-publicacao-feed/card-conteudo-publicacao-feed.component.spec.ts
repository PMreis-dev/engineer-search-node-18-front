import { Constantes } from './../../constantes';
import { TitleCasePipe } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { importComponents, importsModule } from 'mock/configure-module.mock';
import { timeRequest } from 'mock/utils.mock';
import { of } from 'rxjs';
import { TipoPublicacaoEnum } from 'src/app/enums/tipo-publicacao.enum';
import { EnumPermissoes } from 'src/app/models/permissao/permissoes.enum';
import { AvaliacaoService } from 'src/app/services/avaliacoes/avaliacao.service';
import { InteracaoSocialService } from 'src/app/services/interacao-social/interacao-social.service';
import { PerfilUnidadeService } from 'src/app/services/perfil-unidade/perfil-unidade.service';
import { PublicacaoService } from 'src/app/services/publicacao/publicacao.service';
import { UtilsService } from 'src/app/utils';
import { MarcadorPublicacaoLerDepoisComponent } from '../marcador-publicacao-ler-depois/marcador-publicacao-ler-depois.component';
import { CardConteudoPublicacaoFeedComponent } from './card-conteudo-publicacao-feed.component';

describe('CardConteudoPublicacaoFeedComponent', () => {
  let component: CardConteudoPublicacaoFeedComponent;
  let fixture: ComponentFixture<CardConteudoPublicacaoFeedComponent>;

  const publicacao = {
    codigoPublicacao: 'b86cab436940fdb9e22b8548f88d5fbfc5eb2b9d8f3ae87410afe0f3ed6c0aca',
    anexosPublicacao: [
      {
        idAnexo: '3b79b0dc9cf6428cf1ba66b65adece0a9d64204c6b40ce7394dd3ff153e16bb2',
      },
    ],
    assuntoPublicacao: {
      textoAssunto: 'Agronegócio',
      hashtagAssunto: '#agronegocio',
    },
    classificacaoSeguranca: '#interna',
    codigoUsuario: 'F5127678',
    conteudo: {
      blocos: [
        {
          textoBloco: '<h1>Conteudo Titulo</h1><p><br></p><p>Validação </p><p><br></p><p>validação</p>',
          tipoBloco: 'PARAGRAFO_COMPLETO',
        },
      ],
      imagens: [],
    },
    idPerfilUnidade: 'f18fe0c0a85698d10490d9c3fbd26b578bb684a152b61dbe5f1d002b564658d3',
    preVisualizacao: {
      texto: 'Conteudo Titulo<p></p><p>Validação </p><p></p><p>validação</p>',
      tempoMedioLeitura: 1,
      quantidadeVisualizacoes: 1,
    },
    rascunhoPublicacao: null,
    situacaoPublicacao: {
      codigoSituacaoPublicacao: 6,
      descricaoSituacaoPublicacao: 'Excluido',
    },
    tipoGuia: {
      tituloTipoGuia: 'Guia de Atendimento',
      codigoTipoGuia: 'd840c3817a517587bf74872a3f147aaf83cab1c349051eb56d097e282f8ee009',
    },
    tipoPublicacao: {
      codigoTipoPublicacao: 4,
      descricaoTipoPublicacao: 'Documento Corporativo',
    },
    titulo: 'Validação',
    versaoPublicacao: 1,
    versionamentoPublicacao: [],
    restricaoLeitura: false,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardConteudoPublicacaoFeedComponent, MarcadorPublicacaoLerDepoisComponent, ...importComponents],
      providers: [InteracaoSocialService, AvaliacaoService, PerfilUnidadeService, PublicacaoService, UtilsService, TitleCasePipe],
      imports: importsModule,
    }).compileComponents();
    fixture = TestBed.createComponent(CardConteudoPublicacaoFeedComponent);

    component = fixture.componentInstance;
    component.usuario = { permissoes: EnumPermissoes.GESTOR_COMUNICACAO_INTERNA };
    component.publicacao = publicacao;
    component.publicacao['codigoTipoPublicacao'] = 1234;
    component.socialData = {
      quantidadeComentarios: 1,
      quantidadeLikes: 3,
    };
    component.termo = 'any_termo';
    spyOn(PublicacaoService.prototype, 'obter').and.returnValue(of(publicacao));
    spyOn(TitleCasePipe.prototype, 'transform').and.returnValue('titulo');
    spyOn(UtilsService.prototype, 'getTimeoutRequest').and.returnValue(timeRequest);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should ngOnChanges', () => {
    spyOn(component, 'ngOnChanges').and.callThrough();
    component.ngOnChanges({
      publicacao: {
        firstChange: false,
        previousValue: {},
        currentValue: {},
        isFirstChange: () => false,
      },
    });
    expect(component.ngOnChanges).toHaveBeenCalled();
  });

  it('should validaPermissao noticia comunicacao interna', () => {
    spyOn(component, 'validaPermissao').and.callThrough();
    component.publicacao.tipoPublicacao.codigoTipoPublicacao = TipoPublicacaoEnum.NOTICIA;
    component.usuario = { permissoes: EnumPermissoes.GESTOR_COMUNICACAO_INTERNA };
    component.validaPermissao();
    expect(component.validaPermissao).toHaveBeenCalled();
  });

  it('expect detalharPublicacao to have been called noticia', (done) => {
    spyOn(component, 'detalharPublicacao').and.callThrough();
    component.detalharPublicacao('122212121', Constantes.TIPO_PUBLICACAO.NOTICIA.CODIGO);
    expect(component.detalharPublicacao).toHaveBeenCalled();
    done();
  });

  it('expect detalharPublicacao to have been called video ', (done) => {
    spyOn(component, 'detalharPublicacao').and.callThrough();
    component.detalharPublicacao('122212121', Constantes.TIPO_PUBLICACAO.VIDEO.CODIGO);
    expect(component.detalharPublicacao).toHaveBeenCalled();
    done();
  });

  it('expect detalharPublicacao to have been called docuemnto corporativo ', (done) => {
    spyOn(component, 'detalharPublicacao').and.callThrough();
    component.detalharPublicacao('122212121', Constantes.TIPO_PUBLICACAO.DOCUMENTO_CORPORATIVO.CODIGO);
    expect(component.detalharPublicacao).toHaveBeenCalled();
    done();
  });

  afterEach(() => {
    fixture.destroy();
  });
});
