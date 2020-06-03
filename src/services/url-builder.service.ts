import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlBuilderService {

  constructor() { }

  static buildUrlQuery(object) {
    return Object.entries(object)
      .map(pair => pair.map(encodeURIComponent).join('='))
      .join('&');
  }
}
