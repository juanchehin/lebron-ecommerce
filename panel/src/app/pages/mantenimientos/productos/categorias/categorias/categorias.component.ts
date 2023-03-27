import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { CategoriasService } from 'src/app/services/categorias.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styles: []
})
export class CategoriasComponent implements OnInit {

  desde = 0;
  categorias!: any;
  totalCategorias = 0;
  
  constructor(
    public categoriasService: CategoriasService,
    private alertService: AlertService
  ) {
   }

  ngOnInit() {
    this.buscarCategoriasPaginado();
  }

// ==================================================
// Carga
// ==================================================

buscarCategoriasPaginado() {

    const inputElement: HTMLInputElement = document.getElementById('categoriaBuscado') as HTMLInputElement;
    const categoriaBuscado: any = inputElement.value || '-';

    this.categoriasService.buscarCategoriasPaginado( this.desde, categoriaBuscado  )
               .subscribe( {
                next: (resp: any) => { 

                  if(resp[2] && resp[2][0].mensaje == 'Ok')
                  { 
                    this.totalCategorias = resp[1][0].totalCategorias;
    
                    this.categorias = resp[0];
                    return;
                  } else {
                    this.alertService.alertFailWithText('Ocurrio un error',resp[2][0].mensaje,false,2000);
                  }
                  return;
                 },
                error: () => { this.alertService.alertFail('Ocurrio un error',false,2000) }
              });

  }



// ==================================================
// 
// ==================================================

bajaCategoria(IdCategoria: string) {

  Swal.fire({
    title: '¿Desea eliminar la Categoria?',
    text: "Eliminacion de Categoria",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si'
  }).then((result: any) => {
    if (result.isConfirmed) {
      this.categoriasService.bajaCategoria( IdCategoria )
      .subscribe({
        next: (resp: any) => {
  
          if(resp[0][0].mensaje == 'Ok') {
            this.alertService.alertSuccess('top-end','Categoria dada de baja',false,900);
            this.buscarCategoriasPaginado();
            
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

  if ( desde >= this.totalCategorias ) {
    return;
  }

  if ( desde < 0 ) {
    return;
  }

  this.desde += valor;
  this.buscarCategoriasPaginado();

}


}
