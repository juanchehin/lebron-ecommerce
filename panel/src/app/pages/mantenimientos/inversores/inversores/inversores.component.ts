import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { InversoresService } from 'src/app/services/inversores.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inversores',
  templateUrl: './inversores.component.html',
  styles: []
})

export class InversoresComponent implements OnInit {

  desde = 0;
  inversores!: any;
  cantPlanes = 0;

  totalInversores = 0;
  cargando = true;

  constructor(
    public inversoresService: InversoresService,
    private alertService: AlertService
  ) {
   }

  ngOnInit() {
    this.buscarInversores();
  }

// ==================================================
// Carga
// ==================================================

buscarInversores() {

    const inputElement: HTMLInputElement = document.getElementById('inversorBuscado') as HTMLInputElement;
    const inversorBuscado: any = inputElement.value || null;

    this.inversoresService.buscarInversorPaginado( this.desde, inversorBuscado  )
               .subscribe( {
                
                next: (resp: any) => { 
                  if(resp[2] && resp[2][0].Mensaje == 'Ok')
                  { 
                    this.totalInversores = resp[1][0].cantInversores;
    
                    this.inversores = resp[0];
                    return;
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

bajaInversor(IdPersona: string) {

  Swal.fire({
    title: '¿Desea eliminar el inversor?',
    text: "Eliminacion de inversor",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si'
  }).then((result: any) => {
    if (result.isConfirmed) {
      this.inversoresService.bajaInversor( IdPersona )
      .subscribe({
        next: (resp: any) => {
  
          if(resp[0].Mensaje == 'Ok') {
            this.alertService.alertSuccess('top-end','Inversor dado de baja',false,900);
            this.buscarInversores();
            
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
//        Cambio de valor
// ==================================================

cambiarDesde( valor: number ) {

  const desde = this.desde + valor;

  if ( desde >= this.totalInversores ) {
    return;
  }

  if ( desde < 0 ) {
    return;
  }

  this.desde += valor;
  this.buscarInversores();

}
// ==================================================
//        Cambio de valor
// ==================================================

agregarDinero(IdPersona: any){

}

// ==================================================
//        Cambio de valor
// ==================================================
quitarDinero(IdPersona: any){

}


}
