import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { MarcasService } from 'src/app/services/marcas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-marcas',
  templateUrl: './marcas.component.html',
  styles: []
})
export class MarcasComponent implements OnInit {

  desde = 0;
  totalAsistencias = true;
  ClasesDisponibles = 0;

  marcas!: any;

  totalMarcas = 0;
  cargando = true;

  constructor(
    public marcasService: MarcasService,
    public alertService: AlertService
  ) {
   }

  ngOnInit() {
    this.buscarMarcaPaginado();
  }

// ==================================================
// Carga
// ==================================================

buscarMarcaPaginado() {

  const inputElement: HTMLInputElement = document.getElementById('marcaBuscada') as HTMLInputElement;
  const marcaBuscada: any = inputElement.value || '-';

  this.marcasService.buscarMarcasPaginado( this.desde , marcaBuscada  )
             .subscribe( {
              next: (resp: any) => { 

                if(resp[0].length <= 0)
                { 
                  this.marcas = [];
                  this.totalMarcas = 0;
                  return;
                }

                if ( resp[2][0].mensaje == 'Ok') {
                  
                  this.totalMarcas = resp[1][0].totalMarcas;
                  this.marcas = resp[0];
                  
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

  if ( desde >= this.totalMarcas ) {
    return;
  }

  if ( desde < 0 ) {
    return;
  }

  this.desde += valor;
  this.buscarMarcaPaginado();

}
// ==================================================
// 
// ==================================================

bajaMarca(IdMarca: string) {

  Swal.fire({
    title: '¿Desea eliminar la marca?',
    text: "Eliminacion de marca",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si'
  }).then((result: any) => {
    if (result.isConfirmed) {
      this.marcasService.bajaMarca( IdMarca )
      .subscribe({
        next: (resp: any) => {
  
          if(resp[0].mensaje == 'Ok') {
            this.alertService.alertSuccess('top-end','Marca dada de baja',false,900);
            this.desde = 0;
            this.buscarMarcaPaginado();
            
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
