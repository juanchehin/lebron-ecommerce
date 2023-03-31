import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { SaboresService } from 'src/app/services/sabores.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sabores',
  templateUrl: './sabores.component.html',
  styles: []
})
export class SaboresComponent implements OnInit {

  desde = 0;
  totalAsistencias = true;
  ClasesDisponibles = 0;

  sabores!: any;

  totalSabores = 0;
  cargando = true;

  constructor(
    public saboresService: SaboresService,
    public alertService: AlertService
  ) {
   }

  ngOnInit() {
    this.buscarSaborPaginado();
  }

// ==================================================
// Carga
// ==================================================

buscarSaborPaginado() {

  const inputElement: HTMLInputElement = document.getElementById('saborBuscada') as HTMLInputElement;
  const saborBuscada: any = inputElement.value || '-';

  this.saboresService.buscarSaboresPaginado( this.desde , saborBuscada  )
             .subscribe( {
              next: (resp: any) => { 
                
                if(resp[0].length <= 0)
                { 
                  this.sabores = [];
                  this.totalSabores = 0;
                  return;
                }

                if ( resp[2][0].mensaje == 'Ok') {
                  
                  this.totalSabores = resp[1][0].totalSabores;
                  this.sabores = resp[0];
                  
                } else {
                  this.alertService.alertFail('Ocurrio un error',false,2000);
                }
                return;
               },
              error: () => { this.alertService.alertFail('Ocurrio un error',false,2000) }
            });

}

// ==================================================
//        Cambio de valor
// ==================================================

cambiarDesde( valor: number ) {

  const desde = this.desde + valor;

  if ( desde >= this.totalSabores ) {
    return;
  }

  if ( desde < 0 ) {
    return;
  }

  this.desde += valor;
  this.buscarSaborPaginado();

}
// ==================================================
// 
// ==================================================

bajaSabor(IdSabor: string) {

  Swal.fire({
    title: '¿Desea eliminar la sabor?',
    text: "Eliminacion de sabor",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si'
  }).then((result: any) => {
    if (result.isConfirmed) {
      this.saboresService.bajaSabor( IdSabor )
      .subscribe({
        next: (resp: any) => {
  
          if(resp[0][0].mensaje == 'Ok') {
            this.alertService.alertSuccess('top-end','Sabor dada de baja',false,900);
            this.desde = 0;
            this.buscarSaborPaginado();
            
          } else {
            this.alertService.alertFail(resp[0][0].mensaje,false,1200);
            
          }
         },
        error: (resp: any) => {  this.alertService.alertFail(resp[0][0].mensaje,false,1200); }
      });
    }
  })

  
  }
}
