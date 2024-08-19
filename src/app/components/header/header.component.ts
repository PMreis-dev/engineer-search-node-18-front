import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  pesquisaControl = new FormControl('');
  historicoPesquisa: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]> | undefined;
  ngOnInit(): void {
  }
  abrirHistorico(){}
  onSubmit() {}
  selecionarHistorico(item: any = null){}
}
