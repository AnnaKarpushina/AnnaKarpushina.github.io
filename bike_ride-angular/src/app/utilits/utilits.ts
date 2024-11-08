import { Injectable } from '@angular/core';
import { IStation } from '../models/stations.interfaces';

@Injectable({
  providedIn: 'root',
})

export class StorageService {

  constructor() {}

  // получаем данные из локального хранилища
  getLocalStorage(key: string) {
    try {
      return JSON.parse(localStorage.getItem(key)!);
    } catch (error) {
      return localStorage.getItem(key);
    }
  }

  // сохраняем данные в локальном хранилище браузера
  setLocalStorage(key: string, value: IStation[]) {
    localStorage.setItem(key, JSON.stringify(value));
  }
}