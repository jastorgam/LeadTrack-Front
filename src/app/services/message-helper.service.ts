import { Injectable } from '@angular/core';
import { MessageService, ToastMessageOptions } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class MessageHelperService {
  msjs: ToastMessageOptions[] = [];

  constructor(private messageService: MessageService) {}

  add(msj: ToastMessageOptions) {
    this.msjs.push(msj);
  }

  get(): ToastMessageOptions[] {
    let aux = [...this.msjs];
    this.msjs = [];
    return aux;
  }
}
