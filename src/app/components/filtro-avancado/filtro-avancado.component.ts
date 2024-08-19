import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ScrollStrategy, ScrollStrategyOptions } from '@angular/cdk/overlay';

@Component({
  selector: 'app-filtro-avancado',
  templateUrl: './filtro-avancado.component.html',
  styleUrls: ['./filtro-avancado.component.scss'],
})
export class FiltroAvancadoComponent implements OnInit, OnChanges {
  @ViewChild('calendar') calendar!: ElementRef;
  @Output() buscarFiltroAvancado = new EventEmitter<any>();
  @Input() termo: string = '';
  @Input() abaPerfilAtual: string = '';
  @Input() dataFiltroAvancado = {
    assuntos: [] as any[],
    unidades: [] as any[],
    tiposNoticia: [] as any[],
    tiposDocumentos: [] as any[],
  };
  @Input() valoresIniciais?: Partial<any>;
  @Input() mostraFiltroUnidade: boolean = true;
  @Input() mostraFiltroTipoNoticia: boolean = false;
  @Input() mostraFiltroTipoDocumento: boolean = false;
  @Input() mostraFiltroVigencia: boolean = false;
  @Input() mostrarFiltroBusca: boolean = false;
  @Input() isUsuarioSac: boolean = false;
  @Input() pesquisaInicial: boolean = false;
  @Input() mostrarFiltroPeriodo: boolean = false;
  uor!: number;
  filtroAplicativos = [
    { CODIGO: 1, TEXTO: 'Todos' },
    { CODIGO: 2, TEXTO: 'Não Instalados' },
    { CODIGO: 3, TEXTO: 'Instalados' },
  ];
  ordenacoes = [
    { CODIGO: 1, TEXTO: 'Mais Acessados' },
    { CODIGO: 2, TEXTO: 'Mais Recentes' },
    { CODIGO: 3, TEXTO: 'Ordem Alfabética' },
  ];
  tiposVigencia = [
    { name: 'Todos', value: [1, 5] },
    { name: 'Apenas vigentes', value: [1] },
    { name: 'Não vigentes', value: [5] },
  ];
  formFiltroAvancado!: FormGroup;
  assuntosDefault: any[] = [];
  unidadesDefault: any[] = [];
  tiposDocumentosDefault: any[] = [];
  assuntoSelecionado: any;
  unidadeSelecionada!: string;
  timer!: NodeJS.Timeout;
  filtroTermo: string = '';
  tiposPerfis = [
    { name: 'Todos', value: 'TODOS' },
    { name: 'Unidades', value: 'UNIDADE' },
    { name: 'Pessoas', value: 'USUARIO' },
  ];
  scrollStrategy: ScrollStrategy;
  filtroData: Date[] = [];
  inputPeriodo = '';
  filtroAssunto = new FormControl('');
  filtroUnidade = new FormControl('');
  filtroTipoVigencia = new FormControl([]);
  pesquisaAssunto = new FormControl('');
  pesquisaUnidade = new FormControl('');
  filtroTipoPerfil = new FormControl([]);
  filtroTipoNoticia = new FormControl('');
  filtroTipoGuia = new FormControl('');
  pesquisaTipoDocumento = new FormControl('');
  filtroAplicativo = new FormControl('');
  filtroOrdemAplicativo = new FormControl('');
  filtroPeriodo = new FormControl([]);

  constructor(private formBuilder: FormBuilder, private router: ActivatedRoute, private readonly scrollOptions: ScrollStrategyOptions) {
    this.scrollStrategy = this.scrollOptions.noop();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.unidadesDefault = this.dataFiltroAvancado.unidades;
    this.assuntosDefault = this.dataFiltroAvancado.assuntos;

    this.tiposDocumentosDefault = this.dataFiltroAvancado.tiposDocumentos;
    if (changes['termo'] && !changes['termo'].firstChange && changes['termo'].previousValue !== changes['termo'].currentValue) {
      this.limparFiltro();
    }
    if (
      !this.isUsuarioSac &&
      changes['abaPerfilAtual'] &&
      changes['abaPerfilAtual'].previousValue &&
      changes['abaPerfilAtual'] &&
      !changes['abaPerfilAtual'].firstChange &&
      changes['abaPerfilAtual'].previousValue !== changes['abaPerfilAtual'].currentValue
    ) {
      this.limparFiltro();
    }

    if (changes['isUsuarioSac']?.currentValue) {
      this.montarFormulario();
      this.buscar();
    }

    if (changes['dataFiltroAvancado'] && changes['dataFiltroAvancado'].firstChange) {
      return;
    }
    if (!this.formFiltroAvancado.controls['filtroAssunto'].value) {
      this.formFiltroAvancado.controls['filtroAssunto'].enable();
    }
    if (!this.formFiltroAvancado.controls['filtroUnidade'].value) {
      this.formFiltroAvancado.controls['filtroUnidade'].enable();
    }
    if (!this.formFiltroAvancado.controls['filtroTipoNoticia'].value) {
      this.formFiltroAvancado.controls['filtroTipoNoticia'].enable();
    }
    if (!this.formFiltroAvancado.controls['filtroTipoGuia'].value) {
      this.formFiltroAvancado.controls['filtroTipoGuia'].enable();
    }
  }
  ngOnInit(): void {
    this.router.snapshot.paramMap.get('unidadeUOR');
    this.router.queryParams.subscribe((params) => {
      this.uor = params['unidadeUOR'];
    });
    this.assuntosDefault.push(...this.dataFiltroAvancado.assuntos);
    this.unidadesDefault.push(...this.dataFiltroAvancado.unidades);
    if (this.dataFiltroAvancado.tiposDocumentos) {
      this.tiposDocumentosDefault.push(...this.dataFiltroAvancado.tiposDocumentos);
    }

    this.montarFormulario();
    this.setValoresIniciais();
    if (this.pesquisaInicial && this.uor === 85893) {
      this.buscar();
    }
    this.setValoresIniciais();
  }

  buscar(termo: string = '') {
    this.filtroTermo = termo;
    const { value } = this.formFiltroAvancado;
    if (!this.filtroTermo || this.filtroTermo.length >= 3) {
      clearInterval(this.timer);
      this.timer = setTimeout(() => {
        this.buscarFiltroAvancado.emit({
          textoAssunto: this.assuntoSelecionado?.textoAssunto,
          textoSubAssunto: this.assuntoSelecionado?.textoSubAssunto,
          unidade: this.unidadeSelecionada,
          termoPesquisa: this.filtroTermo,
          vigencia: value.filtroTipoVigencia,
          tipoPerfil: value.filtroTipoPerfil,
          tipoNoticia: value.filtroTipoNoticia,
          tipoGuia: value.filtroTipoGuia,
          filtroAplicativo: value.filtroAplicativo,
          filtroOrdemAplicativo: value.filtroOrdemAplicativo,
          filtroPeriodo: value.filtroPeriodo,
        });
      }, 1000);
    }
    this.formFiltroAvancado.controls['filtroAssunto'].disable();
    this.formFiltroAvancado.controls['filtroTipoNoticia'].disable();
    this.formFiltroAvancado.controls['filtroTipoGuia'].disable();
    this.formFiltroAvancado.controls['filtroUnidade'].disable();
  }
  onAssuntoSelecionado(assunto: any): void {
    this.assuntoSelecionado = assunto;
    this.buscar();
  }
  onUnidadeSelecionada(idPerfilUnidade: any): void {
    this.unidadeSelecionada = idPerfilUnidade;
    this.buscar();
  }
  limparAssunto() {
    if (!this.formFiltroAvancado.controls['filtroAssunto'].value.textoAssunto && !this.formFiltroAvancado.controls['filtroUnidade'].value) {
      this.dataFiltroAvancado.assuntos = this.assuntosDefault;
    }
  }
  limparUnidade() {
    if (!this.formFiltroAvancado.controls['filtroUnidade'].value && !this.formFiltroAvancado.controls['filtroAssunto'].value.textoAssunto) {
      this.dataFiltroAvancado.unidades = this.unidadesDefault;
    }
  }

  private montarFormulario(limpar = false) {
    this.formFiltroAvancado = this.formBuilder.group({
      filtroAssunto: this.filtroAssunto,
      filtroUnidade: this.filtroUnidade,
      filtroTipoVigencia: this.filtroTipoVigencia,
      pesquisaAssunto: this.pesquisaAssunto,
      pesquisaUnidade: this.pesquisaUnidade,
      filtroTipoPerfil: this.filtroTipoPerfil,
      filtroTipoNoticia: this.filtroTipoNoticia,
      filtroTipoGuia: this.filtroTipoGuia,
      pesquisaTipoDocumento: this.pesquisaTipoDocumento,
      filtroAplicativo: this.filtroAplicativo,
      filtroOrdemAplicativo: this.filtroOrdemAplicativo,
      filtroPeriodo: this.filtroPeriodo,
    });
    if (this.isUsuarioSac && (this.uor === 85893 || !this.uor) && !limpar) {
      this.formFiltroAvancado.controls['filtroTipoGuia'].setValue('Script SAC e CRBB');
      this.formFiltroAvancado.controls['filtroTipoGuia'].enable();
    }
    this.formFiltroAvancado.controls['filtroAplicativo'].setValue(this.filtroAplicativos[0].CODIGO);
    this.formFiltroAvancado.controls['filtroOrdemAplicativo'].setValue(this.ordenacoes[2].CODIGO);
    this.formFiltroAvancado.controls['filtroTipoVigencia'].setValue(this.tiposVigencia[0].value);
    this.formFiltroAvancado.controls['filtroTipoPerfil'].setValue('TODOS');
    this.formFiltroAvancado.controls['filtroPeriodo'].setValue([]);
  }
  onChangeUnidade(): void {
    this.formFiltroAvancado.valueChanges.subscribe((change) => {
      if (change.pesquisaUnidade) {
        this.limparUnidade();
        this.dataFiltroAvancado.unidades = this.unidadesDefault.filter((unidades) => {
          if (
            (unidades && unidades.siglaUOR && unidades.siglaUOR.toLowerCase().includes(change.pesquisaUnidade.toLowerCase())) ||
            (unidades &&
              unidades.nomeReduzidoUOR &&
              unidades.nomeReduzidoUOR.toLowerCase().includes(change.pesquisaUnidade.toLowerCase())) ||
            (unidades && unidades.codigoUOR && unidades.codigoUOR.toString().includes(change.pesquisaUnidade.toLowerCase()))
          ) {
            return unidades;
          }
        });
      } else {
        this.limparUnidade();
      }
    });
  }
  onAssuntoChange(): void {
    this.formFiltroAvancado.valueChanges.subscribe((change) => {
      this.limparAssunto();
      if (change.pesquisaAssunto) {
        this.dataFiltroAvancado.assuntos = this.dataFiltroAvancado.assuntos.filter((assuntos) => {
          if (
            (assuntos.textoAssunto && assuntos.textoAssunto.toLowerCase().includes(change.pesquisaAssunto.toLowerCase())) ||
            (assuntos.textoSubAssunto && assuntos.textoSubAssunto.toLowerCase().includes(change.pesquisaAssunto.toLowerCase()))
          ) {
            return assuntos;
          }
        });
      } else {
        this.limparAssunto();
      }
    });
  }
  // Tipo Documento Corporativo
  onChangeTipoGuia(): void {
    this.formFiltroAvancado.valueChanges.subscribe((change) => {
      this.limparTipoGuia();
      if (change.pesquisaTipoDocumento) {
        this.dataFiltroAvancado.tiposDocumentos = this.dataFiltroAvancado.tiposDocumentos.filter((tipo) => {
          if (tipo.tituloTipoGuia && tipo.tituloTipoGuia.toLowerCase().includes(change.pesquisaTipoDocumento.toLowerCase())) {
            return tipo;
          }
        });
      } else {
        this.limparTipoGuia();
      }
    });
  }
  // Tipo Documento Corporativo
  limparTipoGuia() {
    if (!this.formFiltroAvancado.controls['filtroTipoGuia'].value) {
      this.dataFiltroAvancado.tiposDocumentos = this.tiposDocumentosDefault;
    }
  }
  limparFiltro() {
    this.montarFormulario(true);
    this.assuntoSelecionado = {};
    this.unidadeSelecionada = '';
    this.filtroTermo = '';
    this.buscarFiltroAvancado.emit({ limparFiltro: true });
  }
  private setValoresIniciais(): void {
    if (!this.formFiltroAvancado || !this.valoresIniciais) {
      return;
    }
    let defaultAssunto = '';
    let defaultPeriodo: any[] = [];
    let defaultVigencia = this.tiposVigencia[0].value;
    let defaultUnidade = this.valoresIniciais['unidade'] || '';
    let defaultFiltroTipoNoticia = this.valoresIniciais['tipoNoticia'];
    let defaultFiltroTipoDocumento = this.valoresIniciais['tipoGuia'];
    if (this.valoresIniciais['textoAssunto'] && this.valoresIniciais['textoSubAssunto']) {
      defaultAssunto = this.valoresIniciais['textoAssunto'] + ' | ' + this.valoresIniciais['textoSubAssunto'];
    }
    let valVigencia = null;
    if (Array.isArray(this.valoresIniciais['vigencia'])) {
      valVigencia = this.valoresIniciais['vigencia'].sort().join();
    } else {
      valVigencia = this.valoresIniciais['vigencia'];
    }

    if (valVigencia) {
      const sortedValue = valVigencia.sort();

      const objVigencia = this.tiposVigencia.find(({ value }) => value.join() === sortedValue.join());

      if (objVigencia) {
        defaultVigencia = objVigencia.value;
      }
    }
    this.formFiltroAvancado.reset(
      {
        filtroAssunto: defaultAssunto,
        filtroUnidade: defaultUnidade,
        filtroTipoNoticia: defaultFiltroTipoNoticia,
        filtroTipoGuia: defaultFiltroTipoDocumento,
        filtroTipoVigencia: defaultVigencia,
        filtroPeriodo: defaultPeriodo,
      },
      { emitEvent: false },
    );
  }

  filtrarPorPeriodo(): void {
    if (this.formFiltroAvancado.controls['filtroPeriodo'].value.length) {
      this.buscar();
    }
  }

  abrirCalendario(): void {
    this.calendar.nativeElement.click();
  }
}
