import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { ProductosService } from 'src/app/services/productos.service';
import { ProveedoresService } from 'src/app/services/proveedores.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-transferencias',
  templateUrl: './transferencias.component.html',
  styles: []
})
export class TransferenciasComponent implements OnInit {

  desde = 0;
  fecha = new Date(Date.now());

  transferencias!: any;

  totalTransferencias = 0;
  cargando = true;

  constructor(
    public productosService: ProductosService,
    private alertService: AlertService
  ) {
   }

  ngOnInit() {
    this.cargarTransferencias();
  }

// ==================================================
// Carga
// ==================================================

cargarTransferencias() { 

  const pFecha = this.formatDate(this.fecha);

    this.productosService.listarTransferenciasPaginado(this.desde, pFecha  )
    .subscribe({
      next: (resp: any) => { 

        if(resp[0].length <= 0)
        {
          this.transferencias = [];
          return;
        }

        if(resp[2][0].Mensaje == 'Ok') {
          this.transferencias = resp[0];

          this.totalTransferencias = resp[1][0].cantTransferencias;
          
        } else {
          this.alertService.alertFail('Ocurrio un error',false,400);
          
        }
       },
      error: (err: any) => { 
        this.alertService.alertFail('Ocurrio un error. Contactese con el administrador',false,400);
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
  
          if(resp[0][0].Mensaje == 'Ok') {
            this.alertService.alertSuccess('top-end','Proveedor dado de baja',false,900);
            this.cargarTransferencias();
            
          } else {
            this.alertService.alertFail(resp[0][0].Mensaje,false,1200);
            
          }
         },
        error: (resp: any) => {  this.alertService.alertFail(resp[0][0].Mensaje,false,1200); }
      });
    }
  })

  
  }
// ==================================================
//    Formatea la fecha a yyyy-mm-dd
// ==================================================

formatDate(date: any) {

  // tslint:disable-next-line: one-variable-per-declaration
  let d = new Date(date),month = '' + (d.getMonth() + 1),day = '' + (d.getDate() + 1),
  // tslint:disable-next-line: prefer-const
  year = d.getFullYear();

  if (month.length < 2) { month = '0' + month; }
  if (day.length < 2) { day = '0' + day; }

  return [year, month, day].join('-');
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
