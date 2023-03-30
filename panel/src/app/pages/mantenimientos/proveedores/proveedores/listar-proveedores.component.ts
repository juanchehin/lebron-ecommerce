import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { ProveedoresService } from 'src/app/services/proveedores.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-proveedores',
  templateUrl: './listar-proveedores.component.html',
  styles: []
})
export class ListarProveedoresComponent implements OnInit {

  desde = 0;
  proveedores!: any;
  totalProveedores = 0;

  @ViewChild('inputProveedorBuscado') inputProveedorBuscado!: ElementRef;

  constructor(
    public proveedoresService: ProveedoresService,
    private alertService: AlertService
  ) {
   }

  ngOnInit() {
    this.buscarProveedor();
  }

// ==================================================
// Carga
// ==================================================

buscarProveedor() {

  const inputElement: HTMLInputElement = document.getElementById('buscarProveedor') as HTMLInputElement;
  const proveedorBuscado: any = inputElement.value || '-';

  this.proveedoresService.buscarProveedoresPaginado( this.desde , proveedorBuscado  )
             .subscribe( {
              next: (resp: any) => {

                if(resp[0].length <= 0)
                { 
                  this.proveedores = [];
                  this.totalProveedores = 0;
                  
                  return;
                }

                if ( resp[2][0].mensaje == 'Ok') {
                  
                  this.totalProveedores = resp[1][0].cantProveedores;
                  this.proveedores = resp[0];
                } else {
                  this.alertService.alertFail('Ocurrio un error',false,2000);
                }
                return;
               },
              error: () => { 
                this.alertService.alertFail('Ocurrio un error',false,2000)
              }
            });

}

// ==================================================
//        Cambio de valor
// ==================================================

cambiarDesde( valor: number ) {

  const desde = this.desde + valor;

  if ( desde >= this.totalProveedores ) {
    return;
  }

  if ( desde < 0 ) {
    return;
  }

  this.desde += valor;
  this.buscarProveedor();

}


// ==================================================
// 
// ==================================================

bajaProveedor(IdProveedor: string) {

  Swal.fire({
    title: '¿Desea eliminar el proveedor?',
    text: "Eliminacion de proveedor",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si'
  }).then((result: any) => {
    if (result.isConfirmed) {
      this.proveedoresService.bajaProveedor( IdProveedor )
      .subscribe({
        next: (resp: any) => { 
  
          if(resp[0][0].mensaje == 'Ok') {
            this.alertService.alertSuccess('top-end','Proveedor dado de baja',false,900);
            this.buscarProveedor();
            
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
  this.inputProveedorBuscado.nativeElement.value = '';
  
  this.desde = 0;
  this.buscarProveedor();

}
}
