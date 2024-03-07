import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { ProductosService } from 'src/app/services/productos.service';
import { ProveedoresService } from 'src/app/services/proveedores.service';
import { UtilService } from 'src/app/services/util.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-transferencias',
  templateUrl: './transferencias.component.html',
  styles: []
})
export class TransferenciasComponent implements OnInit {

  desde = 0;
  fecha: any;

  transferencias!: any;
  lineas_transferencia: any;

  totalTransferencias = 0;
  cargando = true;

  @ViewChild('divCerrarModalDetalleTransferencia') divCerrarModalDetalleTransferencia!: ElementRef<HTMLElement>;

  constructor(
    public productosService: ProductosService,
    private alertService: AlertService,
    private utilService: UtilService
  ) {
   }

  ngOnInit() {
    this.fecha = this.utilService.formatDateNow(new Date(Date.now()));
    this.cargarTransferencias();
  }

// ==================================================
// Carga
// ==================================================

cargarTransferencias() { 

  const pFecha = this.utilService.formatDate(this.fecha);

    this.productosService.listarTransferenciasPaginado(this.desde, pFecha  )
    .subscribe({
      next: (resp: any) => {

        if(resp[0].length <= 0)
        {
          this.transferencias = [];
          return;
        }

        if(resp[2][0].mensaje == 'ok') {
          this.transferencias = resp[0];

          this.totalTransferencias = resp[1][0].cantTransferencias;
          
        } else {
          this.alertService.alertFail('Ocurrio un error',false,400);
          
        }
       },
      error: (err: any) => { 
        this.alertService.alertFail('Ocurrio un error. Contactese con el administrador',false,2000);
       }
    });

  }


// ==================================================
// Carga
// ==================================================

detalle_transferencia(id_transaccion: any) {

  this.productosService.detalle_transferencia( id_transaccion  )
             .subscribe( {
              next: (resp: any) => {
                console.log('resp::: ', resp);

                if ( resp[4][0].mensaje == 'ok') {
                  
                  this.lineas_transferencia = resp[1][0].cant_movimientos;

                } else {
                  this.alertService.alertFailWithText('Ocurrio un error','Contactese con el administrador',false,2000);
                }
                return;
               },
              error: () => { 
                this.alertService.alertFailWithText('Ocurrio un error','Contactese con el administrador',false,2000);
              }
            });

}
// ==================================================
//        Cambio de valor
// ==================================================

cambiarDesde( valor: number ) {

  const desde = this.desde + valor;

  if ( desde >= this.totalTransferencias ) {
    return;
  }

  if ( desde < 0 ) {
    return;
  }

  this.desde += valor;
  // this.cargarProductos();

}


// ==================================================
// 
// ==================================================

bajaTransferencia(IdTransferencia: string) {

  Swal.fire({
    title: '¿Desea eliminar la transferencia?',
    text: "Se restaurara el stock que se movio previamente",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si'
  }).then((result: any) => {
    if (result.isConfirmed) {
      this.productosService.bajaTransferencia( IdTransferencia )
      .subscribe({
        next: (resp: any) => { 
  
          if(resp[0][0].mensaje == 'Ok') {
            this.alertService.alertSuccess('top-end','Proveedor dado de baja',false,900);
            this.cargarTransferencias();
            
          } else {
            this.alertService.alertFail(resp[0][0].mensaje,false,1200);
            
          }
         },
        error: (resp: any) => {  this.alertService.alertFail(resp[0][0].mensaje,false,1200); }
      });
    }
  })

  
  }
// ==================================================
//    Funcion para recargar el listado
// ==================================================

refrescar() {
  // Reseteo 'desde' a cero
  this.desde = 0;
  this.cargarTransferencias();
}

}
