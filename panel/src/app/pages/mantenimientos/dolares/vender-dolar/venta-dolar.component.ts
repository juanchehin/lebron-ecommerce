import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { ClientesService } from 'src/app/services/clientes.service';
import { DolaresService } from '../../../../services/dolares.service';

@Component({
  selector: 'app-venta-dolar',
  templateUrl: './venta-dolar.component.html',
  styleUrls: []
})
export class VentaDolarComponent implements OnInit {

  keywordCliente = 'NombreCompleto';
  cargando = true;
  activarModal = false;
  productos: any;
  clienteBuscado = '';
  IdPersona = '';
  itemPendiente: any = [];
  tiposPago: any;
  clientes = [];
  currentDate = new Date();
  
  IdTipoPagoSelect = 0;
  monto = 0;
  IdCliente = 0;
  totalTiposPago = 0;
  arrayVenta: any = [];
  itemCheckExists: any = 0;
  idSucursalVendedor: any;

  constructor(
    public dolaresService: DolaresService, 
    public authService: AuthService,
    public activatedRoute: ActivatedRoute,
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

    const datosVentaDolares = [
      
    ];

      this.dolaresService.altaVentaDolares(  this.arrayVenta )
      .subscribe({
        next: (resp: any) => {

          if ( resp[0][0].Mensaje == 'Ok') {
            this.alertaService.alertSuccess('top-end','Venta cargada',false,2000);

            this.activarModal = false;
            
            // this.router.navigate(['/dashboard/ventas']);
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

