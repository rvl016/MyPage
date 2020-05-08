import { Injectable } from '@angular/core';
import { Route } from '../share/route';
import { MAIN_ROUTES } from '../share/mainRoutes';

@Injectable({
  providedIn: 'root'
})
export class MainRoutesService {

  constructor() { }

  getRoutes() {
    return MAIN_ROUTES;
  }
}
