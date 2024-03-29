import { HeaderData } from './header-data.model';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

//usará um injetor raiz
@Injectable({
  providedIn: 'root'
})

export class HeaderService {

  //dados do cabeçalho
  private _headerData = new BehaviorSubject<HeaderData>({
    title: 'Início',
    icon: 'home',
    routeUrl:''
  })

  constructor() { }

  //criamos os dois métodos headerData -> detecta mudanças
  get headerData(): HeaderData {
    return this._headerData.value
  }

  set headerData(headerData: HeaderData){
    this._headerData.next(headerData)
  }
}
