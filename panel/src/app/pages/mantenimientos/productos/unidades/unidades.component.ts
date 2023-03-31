import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { UnidadesService } from 'src/app/services/unidades.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-unidades',
  templateUrl: './unidades.component.html',
  styles: []
})
export class UnidadesComponent implements OnInit {

  desde = 0;
  totalAsistencias = true;
  ClasesDisponibles = 0;

  unidades!: any;
  cantPlanes = 0;

  totalUnidades = 0;

  constructor(
    public unidadesService: UnidadesService,
    public alertService: AlertService
  ) {
   }

  ngOnInit() {
    this.cargarUnidades();
  }

// ==================================================
// Carga
// ==================================================

cargarUnidades() {

    this.unidadesService.listarUnidadesPaginado( this.desde  )
    .subscribe( {
     next: (resp: any) => { 
      
       if(resp[0].length <= 0)
       { 
         this.unidades = [];
         this.totalUnidades = 0;
         return;
       }

       if ( resp[2][0].mensaje == 'Ok') {
         
         this.totalUnidades = resp[1][0].cantUnidades;
         this.unidades = resp[0];
         
       } else {
         this.alertService.alertFail('Ocurrio un error',false,2000);
       }
       return;
      },
     error: () => { this.alertService.alertFail('Ocurrio un error',false,2000) }
   });

  }

// ==================================================
// 
// ==================================================

bajaUnidad(IdUnidad: string) {

  Swal.fire({
    title: '¿Desea eliminar la unidad?',
    text: "Eliminacion de unidad",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si'
  }).then((result: any) => {
    if (result.isConfirmed) {
      this.unidadesService.bajaUnidad( IdUnidad )
      .subscribe({
        next: (resp: any) => {
  
          if(resp[0][0].mensaje == 'Ok') {
            this.alertService.alertSuccess('top-end','Unidad dada de baja',false,900);
            this.desde = 0;
            this.cargarUnidades();
            
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
//        Cambio de valor
// ==================================================

cambiarDesde( valor: number ) {

  const desde = this.desde + valor;

  if ( desde >= this.totalUnidades ) {
    return;
  }

  if ( desde < 0 ) {
    return;
  }

  this.desde += valor;
  this.cargarUnidades();

}
}
