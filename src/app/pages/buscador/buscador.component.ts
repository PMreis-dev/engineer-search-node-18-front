import { Component, OnInit } from '@angular/core';
import { resultado } from './busca-fake';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrl: './buscador.component.scss'
})
export class BuscadorComponent implements OnInit {
  PUBLICACOES_POR_PAGINA = 20;
  pagina = 0;
  abaPerfilAtual: string = 'intranet';
  verificarAssunto: boolean = true
  resultadosData = resultado;
  tituloPessoasUnidades: string = '';
  filtro = {
    termo: 'banco do brasil',
    filtrarPor: '',
    tipoPerfil: '',
    hashtag: false,
    textoAssunto: '',
    textoSubAssunto: '',
    unidade: null,
    inicioPeriodo: '',
    fimPeriodo: '',
    vigencia: '',
  };
  buscaHastag = false
  carregando = false
  aplicativos = { lista: [], total: 0 };
  dataFiltroAvancado: any = {
    assuntos: resultado.assuntos.lista,
    unidades: resultado.unidades.lista,
    tiposNoticia: resultado.listaTiposNoticias,
    tiposDocumentos: resultado.listaTiposGuia,
  };

  constructor() {
  }
  ngOnInit(): void {
    this.alteraTituloPessoasUnidades();
  }
  carregarAba(aba: string) { }
  verificarUnidadeOuAssunto() { return true }
  verificarTipoPerfil() { return true }
  irParaPerfilUsuario(data: any) { }
  irParaUnidade(data: any, aba: string) { }
  alteraTituloPessoasUnidades() {
    this.tituloPessoasUnidades = 'Pessoas e Unidades';
  }
  buscarFiltroAvancado(event: Event){}
  paginarBusca(event: number) {}
}
