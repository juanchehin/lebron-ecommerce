import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { ProveedoresService } from 'src/app/services/proveedores.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styles: []
})
export class ProveedoresComponent implements OnInit {

  desde = 0;
  totalAsistencias = true;
  ClasesDisponibles = 0;

  proveedores!: any;
  cantPlanes = 0;

  totalProveedores = 0;
  cargando = true;

  constructor(
    public proveedoresService: ProveedoresService,
    private alertService: AlertService
  ) {
   }

  ngOnInit() {
    this.cargarProveedores();
  }

// ==================================================
// Carga
// ==================================================

cargarProveedores() {

    this.proveedoresService.listarProveedoresPaginado( this.desde  )
               .subscribe( (resp: any) => {

                console.log("resp es : ",resp)

                this.totalProveedores = resp[1][0].cantProveedores;

                this.proveedores = resp[0];

                this.cargando = false;

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
  // this.cargarProductos();

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
  
          if(resp[0][0].Mensaje == 'Ok') {
            this.alertService.alertSuccess('top-end','Proveedor dado de baja',false,900);
            this.cargarProveedores();
            
          } else {
            this.alertService.alertFail(resp[0][0].Mensaje,false,1200);
            
          }
         },
        error: (resp: any) => {  this.alertService.alertFail(resp[0][0].Mensaje,false,1200); }
      });
    }
  })

  
  }


}
