import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { ClientesService } from 'src/app/services/clientes.service';
import { DolaresService } from 'src/app/services/dolares.service';

@Component({
  selector: 'app-venta-dolar',
  templateUrl: './venta-dolar.component.html',
  styleUrls: []
})
export class VentaDolarComponent implements OnInit {

  keywordCliente = 'NombreCompleto';
  cargando = true;
  clienteBuscado = '';
  IdPersona = '';
  clientes = [];
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

altaVentaDolar() {
  
  this.IdPersona = this.authService.IdPersona;

    if(this.monto <= 0)
    {
      this.alertaService.alertInfoWithText('Atencion','Monto incorrecto',false,2000);
    }

    const datosVentaDolares: any = [
      this.IdCliente,
      this.monto,
      this.observaciones
    ];


    this.dolaresService.altaVentaDolares( datosVentaDolares )
      .subscribe({
        next: (resp: any) => {

          if ( resp[0][0].mensaje == 'Ok') {
            this.alertaService.alertSuccess('top-end','Venta cargada',false,2000);
            
            this.router.navigate(['/dashboard/dolares']);
          } else {
            this.alertaService.alertFail('Ocurrio un error',false,2000);
          }
          return;
         },
        error: () => { this.alertaService.alertFail('Ocurrio un error',false,2000) }
      });

}
// ==================================================
// Carga
// ==================================================

cargarClientes() {

  this.clientesService.cargarClientes( this.clienteBuscado )
             .subscribe( (resp: any) => {

              this.clientes = resp;

            });

}

 // ==============================
  // Para clientes
  // ================================
  selectEvent(item: any) {
    this.IdCliente = item.IdPersona;
    // this.agregarLineaVenta(item);
    // do something with selected item
  }

  onChangeSearch(val: any) {

    if(val == '' || val == null)
    {
      return;
    }

    this.clienteBuscado = val;
    this.cargarClientes();
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  onFocused(e: any){
    // console.log("pasa on onFocused",e)
    // do something when input is focused
  }
}

