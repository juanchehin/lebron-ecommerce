import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { QuimicosService } from 'src/app/services/quimicos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-quimicos',
  templateUrl: './quimicos.component.html',
  styles: []
})
export class QuimicosComponent implements OnInit {

  desde = 0;
  totalAsistencias = true;
  ClasesDisponibles = 0;
  IdSucursal = 1;
  quimicos!: any;
  totalQuimicos = 0;
  cargando = true;

  constructor(
    public quimicosService: QuimicosService,
    public alertaService: AlertService
  ) {
   }

  ngOnInit() {
    this.buscarQuimico();
  }

// ==================================================
// Carga
// ==================================================

buscarQuimico() {

    const inputElement: HTMLInputElement = document.getElementById('buscarQuimico') as HTMLInputElement;
    const quimicoBuscado: any = inputElement.value || '-';

    this.quimicosService.listarQuimicosPaginado( this.desde , quimicoBuscado  )
               .subscribe( {
                next: (resp: any) => {

                  if(resp[0].length <= 0)
                  { 
                    this.quimicos = [];
                    this.totalQuimicos = 0;

                    return;
                  }
  
                  if ( resp[2][0].mensaje == 'Ok') {
                    
                    this.totalQuimicos = resp[1][0].cantQuimicosBuscados;
                    this.quimicos = resp[0];
                  } else {
                    this.alertaService.alertFail('Ocurrio un error',false,2000);
                  }
                  return;
                 },
                error: () => { 
                  this.alertaService.alertFail('Ocurrio un error',false,2000)
                }
              });

  }


// ==================================================
//        Cambio de valor
// ==================================================

cambiarDesde( valor: number ) {

  const desde = this.desde + valor;

  if ( desde >= this.totalQuimicos ) {
    return;
  }

  if ( desde < 0 ) {
    return;
  }

  this.desde += valor;
  this.buscarQuimico();

}


// ==================================================
// 
// ==================================================

bajaQuimico(IdProductoSabor: string) {

  Swal.fire({
    title: '¿Desea eliminar el quimico?',
    text: "Eliminacion de quimico",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si'
  }).then((result: any) => {
    if (result.isConfirmed) {
      this.quimicosService.bajaQuimico( IdProductoSabor )
      .subscribe({
        next: (resp: any) => { 

  
          if(resp[0][0].mensaje == 'Ok') {
            this.alertaService.alertSuccess('top-end','Quimico dado de baja',false,900);
            this.buscarQuimico();
            
          } else {
            this.alertaService.alertFail(resp[0][0].mensaje,false,1200);
            
          }
         },
        error: (resp: any) => {  this.alertaService.alertFail(resp[0][0].mensaje,false,1200); }
      });
    }
  })
}

}
