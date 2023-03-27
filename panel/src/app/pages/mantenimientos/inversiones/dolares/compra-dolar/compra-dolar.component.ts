import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { ClientesService } from 'src/app/services/clientes.service';
import { DolaresService } from 'src/app/services/dolares.service';

@Component({
  selector: 'app-compra-dolar',
  templateUrl: './compra-dolar.component.html',
  styleUrls: []
})
export class CompraDolarComponent implements OnInit {

  cargando = true;
  IdPersona = '';
  currentDate = new Date();
  
  monto = 0;
  observaciones = '';
  IdCliente = 0;

  constructor(
    public dolaresService: DolaresService, 
    public authService: AuthService,
    public router: Router,
    public clientesService: ClientesService,
    public alertaService: AlertService
    ) {
    
  }

  ngOnInit() {   
    this.IdPersona = this.authService.IdPersona;
  }
  
// ==================================================
//        Crear 
// ==================================================

altaCompraDolar() {
  
  this.IdPersona = this.authService.IdPersona;

    if(this.monto <= 0)
    {
      this.alertaService.alertInfoWithText('Atencion','Monto incorrecto',false,2000);
    }

    const datosCompraDolares: any = [
      this.monto,
      this.observaciones
    ];


    this.dolaresService.altaCompraDolares( datosCompraDolares )
      .subscribe({
        next: (resp: any) => {

          if ( resp[0][0].mensaje == 'Ok') {
            this.alertaService.alertSuccess('top-end','Compra cargada',false,2000);
            
            this.router.navigate(['/dashboard/dolares']);
          } else {
            this.alertaService.alertFail('Ocurrio un error',false,2000);
          }
          return;
         },
        error: () => { this.alertaService.alertFail('Ocurrio un error',false,2000) }
      });

}

}

