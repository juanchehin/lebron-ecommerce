import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfiguracionesService } from 'src/app/services/configuraciones.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-configuraciones',
  templateUrl: './configuraciones.component.html',
  styles: []
})
export class ConfiguracionesComponent implements OnInit {


  constructor(
    public configuracionesService: ConfiguracionesService, 
    public activatedRoute: ActivatedRoute,
    public alertService: AlertService
    ) {
  }

  ngOnInit() {
  }



}
