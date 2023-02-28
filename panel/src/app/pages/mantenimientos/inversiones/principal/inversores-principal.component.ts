import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfiguracionesService } from 'src/app/services/configuraciones.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-inversores-principal',
  templateUrl: './inversores-principal.component.html',
  styles: []
})
export class InversoresPrincipalComponent implements OnInit {

    constructor(
    public configuracionesService: ConfiguracionesService, 
    public activatedRoute: ActivatedRoute,
    public alertService: AlertService
    ) {
  }

  ngOnInit() {
  }



}
