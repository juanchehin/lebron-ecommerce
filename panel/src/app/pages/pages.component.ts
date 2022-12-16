import { Component, OnInit } from '@angular/core';

import { SidebarService } from '../services/sidebar.service';
import { ConfiguracionesService } from '../services/configuraciones.service';

// declare function customInitFunctions();

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {

  constructor( private configuracionesService: ConfiguracionesService,
               private sidebarService: SidebarService ) { }

  ngOnInit(): void {
    // customInitFunctions();
    this.sidebarService.cargarMenu();
  }

}
