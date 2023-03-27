import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { CategoriasService } from 'src/app/services/categorias.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-subcategorias',
  templateUrl: './subcategorias.component.html',
  styles: []
})
export class SubCategoriasComponent implements OnInit {

  desde = 0;
  subcategorias!: any;
  totalSubCategorias = 0;
  categorias: any;
  
  constructor(
    public categoriasService: CategoriasService,
    private alertService: AlertService
  ) {
   }

  ngOnInit() {
    // this.cargarCategorias();
    this.buscarSubCategoriasPaginado();
  }

// ==================================================
// Carga
// ==================================================

buscarSubCategoriasPaginado() {

    const inputElement: HTMLInputElement = document.getElementById('subcategoriaBuscado') as HTMLInputElement;
    const subcategoriaBuscado: any = inputElement.value || '-';

    this.categoriasService.buscarSubCategoriasPaginado( this.desde, subcategoriaBuscado  )
               .subscribe( {
                next: (resp: any) => { 

                  if(resp[2] && resp[2][0].mensaje == 'Ok')
                  { 
                    this.totalSubCategorias = resp[1][0].totalSubCategorias;
    
                    this.subcategorias = resp[0];
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
// cargarCategorias
// ==================================================

cargarCategorias() {

  this.categoriasService.listarCategorias( )
             .subscribe( {
              next: (resp: any) => { 

                if(resp.mensaje == 'Ok')
                { 
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

bajaSubCategoria(IdSubCategoria: string) {

  Swal.fire({
    title: '¿Desea eliminar la SubCategoria?',
    text: "Eliminacion de Categoria",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si'
  }).then((result: any) => {
    if (result.isConfirmed) {
      this.categoriasService.bajaSubCategoria( IdSubCategoria )
      .subscribe({
        next: (resp: any) => {
  
          if(resp[0][0].mensaje == 'Ok') {
            this.alertService.alertSuccess('top-end','SubCategoria dada de baja',false,900);
            this.buscarSubCategoriasPaginado();
            
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

  if ( desde >= this.totalSubCategorias ) {
    return;
  }

  if ( desde < 0 ) {
    return;
  }

  this.desde += valor;
  this.buscarSubCategoriasPaginado();

}


}
